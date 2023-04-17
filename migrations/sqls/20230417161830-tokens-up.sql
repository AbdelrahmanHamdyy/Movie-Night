CREATE TABLE tokens (
    user_id INT NOT NULL REFERENCES users(id),
    token VARCHAR(255) NOT NULL PRIMARY KEY,
    expire_at TIMESTAMP DEFAULT (NOW() + '1 day'::interval),
    type ENUM('verifyEmail', 'resetPassword') NOT NULL,
);