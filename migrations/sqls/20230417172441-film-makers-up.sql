CREATE TABLE film_makers (
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    about VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    gender ENUM('Male', 'Female') DEFAULT 'Male',
    avatar TEXT,
    birthday DATE NOT NULL,
    is_writer BOOLEAN DEFAULT FALSE,
    is_producer BOOLEAN DEFAULT FALSE,
    is_actor BOOLEAN DEFAULT FALSE,
    is_director BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);