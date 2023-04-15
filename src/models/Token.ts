import client from "../database";

export type TokenData = {
  user_id: number;
  token: string;
  expire_at?: Date;
  type: string;
};

export class Token {
  async create(verifyToken: TokenData): Promise<TokenData> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO tokens(user_id, token, type) VALUES($1, $2, $3);";

      const result = await client.query(sql, [
        verifyToken.user_id,
        verifyToken.token,
        verifyToken.type,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to create token for user ${verifyToken.user_id}!`
      );
    }
  }

  async validate(user_id: number, token: string): Promise<boolean> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM tokens WHERE token=$1;";

      const result = await conn.query(sql, [token]);
      conn.release();

      const verifyToken = result.rows[0];
      if (
        verifyToken?.user_id === user_id &&
        verifyToken?.expire_at > Date.now()
      ) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create token for user ${user_id}!`);
    }
  }

  async destroy(user_id: number, type: string): Promise<TokenData> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM tokens WHERE user_id=$1 AND type=$2;";

      const result = await conn.query(sql, [user_id, type]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete token`);
    }
  }
}
