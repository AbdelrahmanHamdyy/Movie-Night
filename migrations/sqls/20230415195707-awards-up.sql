CREATE TABLE awards (
    movie_id INT NOT NULL REFERENCES movies(id),
    award_type ENUM('bronze', 'silver', 'gold', 'platinum') NOT NULL DEFAULT 'bronze',
    award_description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);