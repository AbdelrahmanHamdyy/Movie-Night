import client from "../database.ts";

export type CompanyData = {
  id?: number;
  name: string;
  about: string;
  photo_url?: string;
  location: string;
  owner_id: number;
  followed?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
};

type followedCompanyData = {
  user_id: number;
  company_id: number;
};

export class Company {
  async getCompanyById(
    id: number,
    userId: number | undefined
  ): Promise<CompanyData> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT *, EXISTS(SELECT * FROM followed_companies WHERE followed_companies.user_id=$1 AND followed_companies.company_id=companies.id) AS followed FROM companies WHERE id=$2 AND deleted_at is NULL";

      const result = await conn.query(sql, [userId, id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to get company with id ${id}!`);
    }
  }

  async index(
    skip: number,
    limit: number,
    userId: number
  ): Promise<CompanyData> {
    try {
      const conn = await client.connect();
      let sql = `SELECT *, EXISTS(SELECT * FROM followed_companies WHERE followed_companies.user_id=$1 AND followed_companies.company_id=companies.id) AS followed FROM companies ORDER BY created_at DESC LIMIT $2 OFFSET $3`;

      const result = await conn.query(sql, [userId, limit, skip]);
      conn.release();

      return result.rows;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to get all companies!`);
    }
  }

  async create(company: CompanyData): Promise<CompanyData> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO companies(name, about, photo_url, location, owner_id) VALUES($1, $2, $3, $4, $5) RETURNING id;";

      const result = await conn.query(sql, [
        company.name,
        company.about,
        company.photo_url,
        company.location,
        company.owner_id,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create company ${company.name}!`);
    }
  }

  async update(company: CompanyData): Promise<CompanyData> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE companies SET name=$1, about=$2, photo_url=$3, location=$4, owner_id=$5 WHERE id=$6;";

      const result = await conn.query(sql, [
        company.name,
        company.about,
        company.photo_url,
        company.location,
        company.owner_id,
        company.id,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to update company ${company.name}!`);
    }
  }

  async destroy(id: number): Promise<CompanyData> {
    try {
      const conn = await client.connect();
      const sql = "UPDATE companies SET deleted_at=$1 WHERE id=$2;";

      const result = await conn.query(sql, [Date.now(), id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete company with id ${id}!`);
    }
  }

  async getFollowedCompanies(
    userId: number,
    skip: number,
    limit: number
  ): Promise<CompanyData> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM followed_companies JOIN companies ON followed_companies.company_id=companies.id WHERE user_id=$1 AND companies.deleted_at is NULL ORDER BY companies.created_at DESC LIMIT $2 OFFSET $3;`;

      const result = await conn.query(sql, [userId, limit, skip]);
      conn.release();

      return result.rows;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to get followed companies of user ${userId}!`);
    }
  }

  async checkFollowedCompany(
    userId: number,
    companyId: number
  ): Promise<boolean> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM followed_companies WHERE user_id=$1 AND company_id=$2;`;

      const result = await conn.query(sql, [userId, companyId]);
      conn.release();

      return result.rows.length > 0 ? true : false;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to check if user ${userId} follows company ${companyId}!`
      );
    }
  }

  async checkUniqueName(name: string): Promise<boolean> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM companies WHERE name=$1 AND deleted_at is NULL;`;

      const result = await conn.query(sql, [name]);
      conn.release();

      return result.rows.length > 0 ? false : true;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to verify company name: ${name}!`);
    }
  }

  async follow(
    userId: number,
    companyId: number
  ): Promise<followedCompanyData> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO followed_companies (user_id, company_id) VALUES ($1, $2);`;

      const result = await conn.query(sql, [userId, companyId]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to follow company ${companyId} by user ${userId}!`
      );
    }
  }

  async unfollow(
    userId: number,
    companyId: number
  ): Promise<followedCompanyData> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM followed_companies WHERE user_id=$1 AND company_id=$2;`;

      const result = await conn.query(sql, [userId, companyId]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to unfollow company ${companyId} by user ${userId}!`
      );
    }
  }
}
