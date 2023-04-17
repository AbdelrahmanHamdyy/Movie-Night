CREATE TABLE movie_writers (
    writer_id INT NOT NULL REFERENCES film_makers(id),
    movie_id INT NOT NULL REFERENCES movies(id),
    CONSTRAINT MOVIE_WRITERS_PK PRIMARY KEY (movie_id, writer_id)
);