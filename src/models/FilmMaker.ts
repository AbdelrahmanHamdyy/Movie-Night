import client from "../database.ts";

export type FilmMakerData = {
  id?: number;
  first_name: string;
  last_name: string;
  about: string;
  country: string;
  gender: string;
  avatar?: string;
  birthday?: Date;
  is_writer?: string;
  is_producer?: boolean;
  is_actor?: boolean;
  is_director?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
};

export class FilmMaker {
  async getDirectorById(id: number): Promise<FilmMakerData> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM film_makers WHERE id=$1 AND deleted_at is NULL AND is_director;";

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to get director with id ${id}!`);
    }
  }

  async getProducerById(id: number): Promise<FilmMakerData> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM film_makers WHERE id=$1 AND deleted_at is NULL AND is_producer;";

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to get producer with id ${id}!`);
    }
  }
}
