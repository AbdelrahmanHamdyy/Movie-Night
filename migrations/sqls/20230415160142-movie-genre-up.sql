CREATE TABLE movie_genre (
    movie_id INT NOT NULL REFERENCES movies(id),
    genre_id INT NOT NULL REFERENCES genres(id),
    CONSTRAINT PK PRIMARY KEY (movie_id, genre_id)
);