import client from "../database.ts";

export type MovieData = {
  id?: number;
  title: string;
  about: string;
  language: string;
  country: string;
  duration: number;
  award?: string;
  cover_url?: string | null;
  trailer_url?: string | null;
  score?: number;
  rating?: number;
  budget?: number;
  release_date?: Date;
  director_id?: number;
  producer_id?: number;
  company_id?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
};

export class Movie {
  async create(movie: MovieData): Promise<number> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO movies(title, about, language, country, duration, budget, release_date, director_id, producer_id, company_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;";

      const result = await conn.query(sql, [
        movie.title,
        movie.about,
        movie.language,
        movie.country,
        movie.duration,
        movie.budget,
        movie.release_date,
        movie.director_id,
        movie.producer_id,
        movie.company_id,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create movie ${movie.title}!`);
    }
  }

  async index(skip: number, limit: number): Promise<MovieData> {
    try {
      const conn = await client.connect();
      let sql = `SELECT * FROM movies ORDER BY created_at DESC LIMIT $1 OFFSET $2`;

      const result = await conn.query(sql, [limit, skip]);
      conn.release();

      return result.rows;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to get all movies!`);
    }
  }

  async getMovieById(id: number): Promise<MovieData> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM movies WHERE id=$1 AND deleted_at is NULL;";

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to get movie with id ${id}!`);
    }
  }

  async update(movie: MovieData): Promise<MovieData> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE movies SET title=$1, about=$2, language=$3, trailer_url=$4, score=$5, rating=$6, budget=$7, release_date=$8, director_id=$9, producer_id=$10, company_id=$11, cover_url=$12, country=$13, duration=$14 WHERE id=$15 AND deleted_at is NULL;";

      const result = await conn.query(sql, [
        movie.title,
        movie.about,
        movie.language,
        movie.trailer_url,
        movie.score,
        movie.rating,
        movie.budget,
        movie.release_date,
        movie.director_id,
        movie.producer_id,
        movie.company_id,
        movie.cover_url,
        movie.country,
        movie.duration,
        movie.id,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to update movie ${movie.title}!`);
    }
  }

  async setAward(award: string, id: number): Promise<MovieData> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE movies SET award=$1 WHERE id=$2 AND deleted_at is NULL;";

      const result = await conn.query(sql, [award, id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to set movie ${id} award!`);
    }
  }

  async deleteAward(id: number): Promise<MovieData> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE movies SET award=NULL WHERE id=$1 AND deleted_at is NULL;";

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to remove movie ${id} award!`);
    }
  }

  async destroy(id: number): Promise<MovieData> {
    try {
      const conn = await client.connect();
      const sql = "UPDATE movies SET deleted_at=$1 WHERE id=$2;";

      const result = await conn.query(sql, [Date.now(), id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete movie with id ${id}!`);
    }
  }

  async find(
    searchQuery: string,
    skip: number,
    limit: number
  ): Promise<Array<MovieData>> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM movies WHERE movies.deleted_at is NULL AND (movies.title LIKE '%$1%' OR movies.about LIKE '%$1%') 
      ORDER BY movies.created_at DESC LIMIT $2 OFFSET $3;`;

      const result = await conn.query(sql, [searchQuery, limit, skip]);
      conn.release();

      return result.rows;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to get search results for the query "${searchQuery}"!`
      );
    }
  }
}
