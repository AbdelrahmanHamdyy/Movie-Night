import client from "../database";

export type MovieData = {
  id?: number;
  title: string;
  about: string;
  language: string;
  country: string;
  duration: number;
  trailer?: string;
  score?: number;
  rating?: number;
  budget?: number;
  release_date?: Date;
  director_id?: Date;
  producer_id?: Date;
  company_id?: Date | null;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
};

export class Movie {
  async create(movie: MovieData): Promise<number> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO movies(title, about, language, trailer, score, rating, budget, release_date, director_id, producer_id, company_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);";

      const result = await conn.query(sql, [
        movie.title,
        movie.about,
        movie.language,
        movie.trailer,
        movie.score,
        movie.rating,
        movie.budget,
        movie.release_date,
        movie.director_id,
        movie.producer_id,
        movie.company_id,
      ]);
      conn.release();

      return result.rows[0].id;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create movie ${movie.title}!`);
    }
  }

  async index(): Promise<MovieData[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM movies WHERE deleted_at is NULL;";

      const movies = await conn.query(sql);
      conn.release();

      return movies.rows;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to index all movies!`);
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
        "UPDATE movies SET title=$1, about=$2, language=$3, trailer=$4, score=$5, rating=$6, budget=$7, release_date=$8, director_id=$9, producer_id=$10, company_id=$11 WHERE id=$12;";

      const result = await conn.query(sql, [
        movie.title,
        movie.about,
        movie.language,
        movie.trailer,
        movie.score,
        movie.rating,
        movie.budget,
        movie.release_date,
        movie.director_id,
        movie.producer_id,
        movie.company_id,
        movie.id,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to update movie ${movie.title}!`);
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
}
