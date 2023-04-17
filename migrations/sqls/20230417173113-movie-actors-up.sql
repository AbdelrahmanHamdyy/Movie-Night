CREATE TABLE movie_actors (
    actor_id INT NOT NULL REFERENCES film_makers(id),
    movie_id INT NOT NULL REFERENCES movies(id),
    nickname VARCHAR(255) NOT NULL,
    star BOOLEAN NOT NULL DEFAULT FALSE,
    rank INT NOT NULL,
    CONSTRAINT MOVIE_ACTORS_PK PRIMARY KEY (actor_id, movie_id),
    CHECK (rank <= 10 AND rank >= 1) -- CHECK Constraint
);