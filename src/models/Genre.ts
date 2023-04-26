import client from "../database";

export type GenreData = {
  id?: number;
  name: string;
  popularity: number;
};

export type MovieGenreData = {
  movie_id: number;
  genre_name: string;
};

export class Genre {
  async incrementPopularity(genreName: string): Promise<void> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE genres SET popularity = popularity + 1 WHERE name=$1;";

      const result = await conn.query(sql, [genreName]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to update ${genreName} popularity!`);
    }
  }

  async index(): Promise<GenreData[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM genres;";

      const genres = await conn.query(sql);
      conn.release();

      return genres.rows;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to index all genres!`);
    }
  }

  async getGenreByName(genreName: string): Promise<GenreData> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM genres WHERE name=$1;";

      const result = await conn.query(sql, [genreName]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to get genre with name ${genreName}!`);
    }
  }

  async addMovieGenre(
    movieId: number,
    genreName: string
  ): Promise<MovieGenreData> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO movie_genres(movie_id, genre_name) VALUES($1, $2);";

      const result = await conn.query(sql, [movieId, genreName]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to add genre ${genreName} for movie ${movieId}`);
    }
  }

  async getMovieGenre(
    movieId: number,
    genreName: string
  ): Promise<MovieGenreData> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT FROM movie_genres WHERE movie_id=$1 AND genre_name=$2";

      const result = await conn.query(sql, [movieId, genreName]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to get genre ${genreName} for movie ${movieId}`);
    }
  }
}
