import client from "../database";
import bcrypt from "bcrypt";

const PEPPER = process.env.BCRYPT_PASSWORD;
const SALT_ROUNDS = process.env.SALT_ROUNDS;

export type MovieData = {
  id?: number;
  title: string;
  about: string;
  photo: string;
  language: string;
  trailer?: string;
  score?: number;
  rating?: number;
  budget?: number;
  release_date?: Date;
  director_id?: Date;
  producer_id?: Date;
  company_id?: Date | null;
};

export class Movie {
  async create(movie: MovieData): Promise<MovieData> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO movies(title, about, photo, language, trailer, score, rating, budget, release_date, director_id, producer_id, company_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);";

      const result = await conn.query(sql, [
        movie.title,
        movie.about,
        movie.photo,
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

      return result.rows[0];
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
        "UPDATE movies SET title=$1, about=$2, photo=$3, language=$4, trailer=$5, score=$6, rating=$7, budget=$8, release_date=$9, director_id=$10, producer_id=$11, company_id=$12 WHERE id=$13;";

      const result = await conn.query(sql, [
        movie.title,
        movie.about,
        movie.photo,
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
