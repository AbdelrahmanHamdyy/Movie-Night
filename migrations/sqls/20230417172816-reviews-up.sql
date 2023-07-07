CREATE TABLE reviews (
    user_id INT NOT NULL REFERENCES users(id),
    movie_id INT NOT NULL REFERENCES movies(id),
    fav_actor_id INT NOT NULL REFERENCES film_makers(id),
    review TEXT NOT NULL,
    spoiler BOOLEAN DEFAULT FALSE,
    recommended BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT REVIEWS_PK PRIMARY KEY (user_id, movie_id)
);