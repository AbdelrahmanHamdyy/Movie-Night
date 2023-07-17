import client from "../database.ts";

export type ReviewData = {
  user_id: number;
  movie_id: number;
  description: string;
  spoiler: boolean;
  recommended: boolean;
  likes?: number;
  dislikes?: number;
  fav_actor_id?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
};

export class Review {
  async create(review: ReviewData): Promise<ReviewData> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO reviews(user_id, movie_id, description, spoiler, recommended, fav_actor_id) VALUES($1, $2, $3, $4, $5, $6);";

      const result = await conn.query(sql, [
        review.user_id,
        review.movie_id,
        review.description,
        review.spoiler,
        review.recommended,
        review.fav_actor_id,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to add review for movie ${review.movie_id} from user ${review.user_id}!`
      );
    }
  }

  async update(review: ReviewData): Promise<ReviewData> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE reviews SET description=$1 AND spoiler=$2 AND recommended=$3 AND fav_actor_id=$4 WHERE user_id=$5 AND movie_id=$6 AND deleted_at is NULL;";

      const result = await conn.query(sql, [
        review.description,
        review.spoiler,
        review.recommended,
        review.fav_actor_id,
        review.user_id,
        review.movie_id,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to update review for movie ${review.movie_id} for user ${review.user_id}!`
      );
    }
  }

  async get(userId: number, movieId: number): Promise<ReviewData> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM reviews WHERE user_id=$1 AND movie_id=$2 AND deleted_at is NULL;";

      const result = await conn.query(sql, [userId, movieId]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to get user ${userId} review for movie ${movieId}!`
      );
    }
  }

  async exists(userId: number, movieId: number): Promise<boolean> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT EXISTS (SELECT * FROM reviews WHERE user_id=$1 AND movie_id=$2 AND deleted_at is NULL);";

      const result = await conn.query(sql, [userId, movieId]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to check if user ${userId} review exists for movie ${movieId}!`
      );
    }
  }

  async getNumberOfReviews(movieId: number): Promise<number> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT COUNT(*) FROM reviews WHERE movie_id=$1 AND deleted_at is NULL;";

      const result = await conn.query(sql, [movieId]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to retrieve the number of people who reviewed movie ${movieId}!`
      );
    }
  }

  async index(userId: number): Promise<ReviewData[]> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM reviews WHERE user_id=$1 AND deleted_at is NULL ORDER BY created_at DESC;";

      const movies = await conn.query(sql, [userId]);
      conn.release();

      return movies.rows;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to index all movies reviewed by user ${userId}!`);
    }
  }

  async getMovieReviews(movieId: number): Promise<ReviewData[]> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM reviews WHERE movie_id=$1 AND deleted_at is NULL ORDER BY created_at DESC;";

      const movies = await conn.query(sql, [movieId]);
      conn.release();

      return movies.rows;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to index all reviews of movie ${movieId}!`);
    }
  }

  async remove(userId: number, movieId: number): Promise<ReviewData> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM reviews WHERE user_id=$1 AND movie_id=$2;";

      const result = await conn.query(sql, [userId, movieId]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to delete review of user ${userId} of movie ${movieId}!`
      );
    }
  }

  async likedReview(
    id: number,
    userId: number,
    movieId: number
  ): Promise<boolean> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM review_reactions WHERE id=$1 AND user_id=$2 AND movie_id=$3 AND like;";

      const result = await conn.query(sql, [id, userId, movieId]);
      conn.release();

      return result.rows[0] ? true : false;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to check if this review of user ${userId} on movie ${movieId} is liked by user ${id}!`
      );
    }
  }

  async dislikedReview(
    id: number,
    userId: number,
    movieId: number
  ): Promise<boolean> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM review_reactions WHERE id=$1 AND user_id=$2 AND movie_id=$3 AND NOT like;";

      const result = await conn.query(sql, [id, userId, movieId]);
      conn.release();

      return result.rows[0] ? true : false;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to check if this review of user ${userId} on movie ${movieId} is disliked by user ${id}!`
      );
    }
  }

  async addToReactions(
    id: number,
    userId: number,
    movieId: number,
    like: boolean
  ): Promise<ReviewData> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO review_reactions(id, user_id, movie_id, like) VALUES($1, $2, $3, $4);";

      const result = await conn.query(sql, [id, userId, movieId, like]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to add this record to review reactions!`);
    }
  }

  async removeFromReactions(
    id: number,
    userId: number,
    movieId: number
  ): Promise<ReviewData> {
    try {
      const conn = await client.connect();
      const sql =
        "DELETE FROM review_reactions WHERE id=$1 AND user_id=$2 AND movie_id=$3;";

      const result = await conn.query(sql, [id, userId, movieId]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete review reaction!`);
    }
  }

  async updateReaction(
    id: number,
    userId: number,
    movieId: number,
    like: boolean
  ): Promise<ReviewData> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE review_reactions SET like=$1 WHERE id=$2 AND user_id=$3 AND movie_id=$4;";

      const result = await conn.query(sql, [like, id, userId, movieId]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to update review reaction!`);
    }
  }
}
