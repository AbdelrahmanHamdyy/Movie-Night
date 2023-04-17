CREATE TABLE awards (
    movie_id INT NOT NULL REFERENCES movies(id),
    award_type AWARD_TYPE NOT NULL DEFAULT 'bronze',
    award_description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT AWARDS_PK PRIMARY KEY (movie_id, award_type)
);