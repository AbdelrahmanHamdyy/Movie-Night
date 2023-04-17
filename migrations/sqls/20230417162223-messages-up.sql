CREATE TABLE messages (
    id SERIAL PRIMARY KEY NOT NULL,
    sender_username VARCHAR(255) NOT NULL REFERENCES users(username),
    receiver_username VARCHAR(255) NOT NULL REFERENCES users(username),
    subject VARCHAR(255) NOT NULL,
    content TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    is_reply BOOLEAN DEFAULT FALSE,
    replied_msg_id INT REFERENCES messages(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
);