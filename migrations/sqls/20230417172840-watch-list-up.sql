CREATE TABLE watch_list (
    user_id INT NOT NULL REFERENCES users(id),
    movie_id INT NOT NULL REFERENCES movies(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK PRIMARY KEY (user_id, movie_id)
);