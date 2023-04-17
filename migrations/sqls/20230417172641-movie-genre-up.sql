CREATE TABLE movie_genre (
    movie_id INT NOT NULL REFERENCES movies(id),
    genre_name VARCHAR(255) NOT NULL REFERENCES genres(name),
    CONSTRAINT MOVIE_GENRE_PK PRIMARY KEY (movie_id, genre_name)
);