CREATE TABLE companies (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    about TEXT NOT NULL,
    photo VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    owner_id INT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);