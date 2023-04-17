import client from "../database";
import bcrypt from "bcrypt";

const PEPPER = process.env.BCRYPT_PASSWORD;
const SALT_ROUNDS = process.env.SALT_ROUNDS;

export type UserData = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  gender?: string;
  country?: string;
  avatar?: string;
  verified_email?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
};

export class User {
  async create(user: UserData): Promise<UserData> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users(first_name, last_name, email, username, password) VALUES($1, $2, $3, $4, $5);";

      const hash = bcrypt.hashSync(
        user.password + PEPPER,
        parseInt(SALT_ROUNDS as string)
      );

      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.email,
        user.username,
        hash,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create user ${user.first_name}!`);
    }
  }

  async index(): Promise<UserData[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE deleted_at is NULL;";

      const users = await conn.query(sql);
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
      const sql = "SELECT * FROM users WHERE id=$1 AND deleted_at is NULL;";

      const result = await conn.query(sql, [id]);
      conn.release();

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
        "SELECT * FROM users WHERE username=$1 AND deleted_at is NULL;";

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
      const sql = "SELECT * FROM users WHERE email=$1 AND deleted_at is NULL;";

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
        "UPDATE users SET first_name=$1, last_name=$2, email=$3, username=$4, password=$5, gender=$6, country=$7, avatar=$8, verified_email=$9 WHERE id=$10;";

      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.email,
        user.username,
        user.password,
        user.gender,
        user.country,
        user.avatar,
        user.verified_email,
        user.id,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to update user ${user.first_name}!`);
    }
  }

  async destroy(id: number): Promise<UserData> {
    try {
      const conn = await client.connect();
      const sql = "UPDATE users SET deleted_at=$1 WHERE id=$2;";

      const result = await conn.query(sql, [Date.now(), id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete user with id ${id}!`);
    }
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<UserData | null> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM users WHERE username=$1 AND deleted_at is NULL";

      const result = await conn.query(sql, [username]);
      if (result.rows.length) {
        const authUser = result.rows[0];
        if (bcrypt.compareSync(password + PEPPER, authUser.password)) {
          return authUser;
        }
      }
      conn.release();

      return null;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to authenticate user ${username}`);
    }
  }
}
