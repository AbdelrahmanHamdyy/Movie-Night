CREATE TABLE movie_genre (
    movie_id INT NOT NULL REFERENCES movies(id),
    genre_name INT NOT NULL REFERENCES genres(name),
    CONSTRAINT PK PRIMARY KEY (movie_id, genre_id)
);