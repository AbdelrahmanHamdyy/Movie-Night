CREATE TABLE tokens (
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL PRIMARY KEY,
    expire_at TIMESTAMP DEFAULT (NOW() + '1 day'::interval),
    type VARCHAR(255) NOT NULL,
    CONSTRAINT FK FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);