import client from "../database";

export type TokenData = {
  userId: number;
  token: string;
  expire_at?: Date;
  type: string;
};

export class Token {
  async create(verifyToken: TokenData): Promise<TokenData> {
    try {
      const conn = await client.connect();
      const sql = "INSERT INTO tokens(userId, token, type) VALUES($1, $2, $3);";

      const result = await client.query(sql, [
        verifyToken.userId,
        verifyToken.token,
        verifyToken.type,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create token for user ${verifyToken.userId}!`);
    }
  }

  async validate(userId: number, token: string): Promise<boolean> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM tokens WHERE token=$1;";

      const result = await conn.query(sql, [token]);
      conn.release();

      const verifyToken = result.rows[0];
      if (
        verifyToken?.userid === userId &&
        verifyToken?.expire_at > Date.now()
      ) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create token for user ${userId}!`);
    }
  }

  async destroy(userId: number, type: string): Promise<TokenData> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM tokens WHERE userId=$1 AND type=$2;";

      const result = await conn.query(sql, [userId, type]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete token`);
    }
  }
}
