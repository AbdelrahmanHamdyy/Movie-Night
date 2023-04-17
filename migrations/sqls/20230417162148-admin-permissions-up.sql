CREATE TABLE admin_permissions (
    admin_id INT NOT NULL REFERENCES users(id),
    permission PERMISSION NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT PK PRIMARY KEY (admin_id, permission)
);