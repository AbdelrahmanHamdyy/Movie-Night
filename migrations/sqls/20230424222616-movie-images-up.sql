CREATE TABLE movie_images (
    movie_id INT NOT NULL REFERENCES movies(id),
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT MOVIE_IMAGES_PK PRIMARY KEY (movie_id, image_url)
);