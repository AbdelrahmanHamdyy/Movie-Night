import client from "../database";

export type CompanyData = {
  id?: number;
  name: string;
  about: string;
  photo?: string;
  location: string;
  owner_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
};

export class Company {
  async getCompanyById(id: number): Promise<CompanyData> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM companies WHERE id=$1 AND deleted_at is NULL";

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to get company with id ${id}!`);
    }
  }
}
