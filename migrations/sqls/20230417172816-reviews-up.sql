CREATE TABLE reviews (
    user_id INT NOT NULL REFERENCES users(id),
    movie_id INT NOT NULL REFERENCES movies(id),
    fav_actor_id INT NOT NULL REFERENCES film_makers(id),
    description TEXT NOT NULL,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    spoiler BOOLEAN DEFAULT FALSE,
    recommended BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT REVIEWS_PK PRIMARY KEY (user_id, movie_id)
);