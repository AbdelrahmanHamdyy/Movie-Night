import client from "../database.ts";

export type WatchlistData = {
  user_id: number;
  movie_id: number;
  created_at?: Date;
};

export class Watchlist {
  async add(watchlist: WatchlistData): Promise<WatchlistData> {
    try {
      const conn = await client.connect();
      const sql = "INSERT INTO watch_list(user_id, movie_id) VALUES($1, $2);";

      const result = await conn.query(sql, [
        watchlist.user_id,
        watchlist.movie_id,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to add movie ${watchlist.movie_id} to user ${watchlist.user_id} Watchlist!`
      );
    }
  }

  async exists(userId: number, movieId: number): Promise<boolean> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM watch_list WHERE user_id=$1 AND movie_id=$2;";

      const result = await conn.query(sql, [userId, movieId]);
      conn.release();

      if (result.rows.length) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to index all movies in watchlist of user ${userId}!`
      );
    }
  }

  async index(userId: number): Promise<WatchlistData[]> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM watch_list WHERE user_id=$1 ORDER BY created_at DESC;";

      const movies = await conn.query(sql, [userId]);
      conn.release();

      return movies.rows;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to index all movies in watchlist of user ${userId}!`
      );
    }
  }

  async remove(userId: number, movieId: number): Promise<WatchlistData> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM watch_list WHERE user_id=$1 AND movie_id=$2;";

      const result = await conn.query(sql, [userId, movieId]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to remove movie ${movieId} from User ${userId} Watchlist!`
      );
    }
  }
}
