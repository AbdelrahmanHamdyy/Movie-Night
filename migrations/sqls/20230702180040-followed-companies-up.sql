CREATE TABLE followed_companies (
    user_id INT NOT NULL REFERENCES users(id),
    company_id INT NOT NULL REFERENCES companies(id),
    CONSTRAINT FOLLOWED_COMPANY_PK PRIMARY KEY (user_id, company_id)
);