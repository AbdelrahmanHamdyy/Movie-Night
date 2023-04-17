CREATE TABLE movie_actors (
    actor_id INT NOT NULL REFERENCES cast_member(id),
    movie_id INT NOT NULL REFERENCES movies(id),
    nickname VARCHAR(255) NOT NULL,
    star BOOLEAN NOT NULL DEFAULT FALSE,
    rank INT NOT NULL,
    CONSTRAINT PK PRIMARY KEY (actor_id, movie_id)
);