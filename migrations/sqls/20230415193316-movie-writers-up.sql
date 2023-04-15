CREATE TABLE movie_writers (
    writer_id INT NOT NULL REFERENCES cast_member(id),
    movie_id INT NOT NULL REFERENCES movies(id),
    CONSTRAINT PK PRIMARY KEY (user_id, writer_id)
);