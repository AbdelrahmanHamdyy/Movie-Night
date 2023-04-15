CREATE TABLE stars (
    actor_id INT NOT NULL REFERENCES cast_member(id),
    movie_id INT NOT NULL REFERENCES movies(id),
    CONSTRAINT PK PRIMARY KEY (actor_id, movie_id)
);