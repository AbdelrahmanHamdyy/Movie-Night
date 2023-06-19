import client from "../database.ts";

export type UserRatingData = {
  user_id: number;
  movie_id: number;
  rate: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
};

export class UserRating {
  async add(userRating: UserRatingData): Promise<UserRatingData> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO user_ratings(user_id, movie_id, rate) VALUES($1, $2, $3);";

      const result = await conn.query(sql, [
        userRating.user_id,
        userRating.movie_id,
        userRating.rate,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to add movie ${userRating.movie_id} to user ${userRating.user_id} Ratings!`
      );
    }
  }

  async getRating(userId: number, movieId: number): Promise<number> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT rate FROM user_ratings WHERE user_id=$1 AND movie_id=$2;";

      const result = await conn.query(sql, [userId, movieId]);
      conn.release();

      if (result.rows.length) {
        return result.rows[0];
      }
      return -1;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to get user ${userId} rating for movie ${movieId}!`
      );
    }
  }

  async index(userId: number): Promise<UserRating[]> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM user_ratings WHERE user_id=$1 ORDER BY created_at DESC;";

      const movies = await conn.query(sql, [userId]);
      conn.release();

      return movies.rows;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to index all movies rated by user ${userId}!`);
    }
  }
}
