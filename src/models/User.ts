import client from "../database";
import bcrypt from "bcrypt";

const PEPPER = process.env.BCRYPT_PASSWORD;
const SALT_ROUNDS = process.env.SALT_ROUNDS;

export type newUser = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export type UserData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  gender?: string;
  country?: string;
  avatar?: string;
  verifiedEmail?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export class User {
  async create(user: newUser): Promise<UserData> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users(firstName, lastName, email, username, password) VALUES($1, $2, $3, $4, $5);";

      const hash = bcrypt.hashSync(
        user.password + PEPPER,
        parseInt(SALT_ROUNDS as string)
      );

      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        hash,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create user ${user.firstName}!`);
    }
  }

  async index(): Promise<UserData[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE deletedAt=$1;";

      const users = await conn.query(sql, [null]);
      conn.release();

      return users.rows;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to index all users!`);
    }
  }

  async getUserById(id: number): Promise<UserData> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id=$1 AND deletedAt=$2;";

      const result = await conn.query(sql, [id, null]);
      client.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to get user with id ${id}!`);
    }
  }

  async getUserByUsername(username: string): Promise<UserData> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM users WHERE username=$1 AND deletedAt is NULL;";

      const result = await conn.query(sql, [username]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to get user with username ${username}!`);
    }
  }

  async getUserByEmail(email: string): Promise<UserData> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE email=$1 AND deletedAt is NULL;";

      const result = await conn.query(sql, [email]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to get user with email ${email}!`);
    }
  }

  async update(user: UserData): Promise<UserData> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE users SET firstName=$1, lastName=$2, email=$3, username=$4, password=$5, gender=$6, country=$7, avatar=$8 WHERE id=$9;";

      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.password,
        user.gender,
        user.country,
        user.avatar,
        user.id,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to update user ${user.firstName}!`);
    }
  }

  async destroy(id: number): Promise<UserData> {
    try {
      const conn = await client.connect();
      const sql = "UPDATE users SET deletedAt=$1 WHERE id=$2;";

      const result = await client.query(sql, [Date.now(), id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete user with id ${id}!`);
    }
  }

  async authenticate(user: UserData): Promise<UserData | null> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id=$1";

      const result = await client.query(sql, [user.id]);
      if (result.rows.length) {
        const authUser = result.rows[0];
        if (bcrypt.compareSync(user.password + PEPPER, authUser.password)) {
          return authUser;
        }
      }
      conn.release();

      return null;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to authenticate user ${user.firstName}`);
    }
  }
}
