CREATE TABLE reviews (
    user_id INT NOT NULL REFERENCES users(id),
    movie_id INT NOT NULL REFERENCES movies(id),
    fav_actor_id INT NOT NULL REFERENCES cast_member(id),
    review TEXT NOT NULL,
    recommended BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
    CONSTRAINT PK PRIMARY KEY (user_id, movie_id)
);