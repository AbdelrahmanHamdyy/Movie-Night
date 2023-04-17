CREATE TABLE movies (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    about TEXT NOT NULL,
    photo VARCHAR(255) NOT NULL,
    trailer VARCHAR(255),
    score INT DEFAULT 0,
    rating INT DEFAULT 0,
    budget INT,
    release_date TIMESTAMP,
    director_id INT NOT NULL REFERENCES film_makers(id),
    producer_id INT NOT NULL REFERENCES film_makers(id),
    company_id INT NOT NULL REFERENCES companies(id),
    language VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    CHECK (rating <= 10 AND rating >= 0) -- CHECK Constraint
);