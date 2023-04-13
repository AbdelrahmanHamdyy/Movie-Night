import client from "../database";
import bcrypt from "bcrypt";

const PEPPER = process.env.BCRYPT_PASSWORD;
const SALT_ROUNDS = process.env.SALT_ROUNDS;

export type UserData = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  gender: string;
  country: string;
  avatar: string;
};

export class User {
  create(user: UserData): UserData {
    try {
      const sql =
        "INSERT INTO users(firstName, lastName, email, username, password, gender, country, avatar) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;";

      const hash = bcrypt.hashSync(
        user.password + PEPPER,
        parseInt(SALT_ROUNDS as string)
      );

      let createdUser: any;
      client.query(
        sql,
        [
          user.firstName,
          user.lastName,
          user.email,
          user.username,
          user.password,
          user.gender,
          user.country,
          user.avatar,
          hash,
        ],
        (error, result, fields) => {
          if (error) throw error;
          createdUser = result.rows[0];
        }
      );
      client.end();

      return createdUser;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create user ${user.firstName}!`);
    }
  }

  index(): UserData[] {
    try {
      const sql = "SELECT * FROM users;";

      let users: any;
      client.query(sql, (error, result, fields) => {
        if (error) throw error;
        users = result.rows;
      });
      client.end();

      return users;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to index all users!`);
    }
  }

  get(id: number): UserData {
    try {
      const sql = "SELECT * FROM users WHERE id=$1;";

      let user: any;
      client.query(sql, [id], (error, result, fields) => {
        if (error) throw error;
        user = result.rows[0];
      });
      client.end();

      return user;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to get user with id ${id}!`);
    }
  }

  update(user: UserData): UserData {
    try {
      const sql =
        "UPDATE users SET firstName=$1, lastName=$2, email=$3, username=$4, password=$5, gender=$6, country=$7, avatar=$8 WHERE id=$9 RETURNING *;";

      let updatedUser: any;
      client.query(
        sql,
        [
          user.firstName,
          user.lastName,
          user.email,
          user.username,
          user.password,
          user.gender,
          user.country,
          user.avatar,
          user.id,
        ],
        (error, result) => {
          if (error) throw error;
          updatedUser = result.rows[0];
        }
      );
      client.end();

      return updatedUser;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to update user ${user.firstName}!`);
    }
  }

  destroy(id: number): Promise<User> {
    try {
      const sql = "UPDATE users SET deletedAt=$1 WHERE id=$2 RETURNING *;";

      let deletedUser: any;
      client.query(sql, [id], (error, result) => {
        if (error) throw error;
        deletedUser = result.rows[0];
      });
      client.end();

      return deletedUser;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete user with id ${id}!`);
    }
  }

  authenticate(user: UserData): UserData | null {
    try {
      const sql = "SELECT * FROM users WHERE username=$1";

      let authUser: any;
      client.query(sql, [user.id], (error, result) => {
        if (error) throw error;
        else if (result.rows.length) {
          authUser = result.rows[0];
          if (!bcrypt.compareSync(user.password + PEPPER, authUser.password)) {
            authUser = null;
          }
        }
      });
      client.end();

      return authUser;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to authenticate user ${user.firstName}`);
    }
  }
}
