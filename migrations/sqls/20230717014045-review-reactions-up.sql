CREATE TABLE review_reactions (
    id INT NOT NULL REFERENCES users(id),
    user_id INT NOT NULL REFERENCES users(id),
    movie_id INT NOT NULL REFERENCES movies(id),
    liked BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT REVIEW_REACTIONS_PK PRIMARY KEY (id, user_id, movie_id)
);