INSERT INTO roles (name) VALUES ('ADMIN');
INSERT INTO roles (name) VALUES ('USER');

INSERT INTO users (first_name, last_name, email, password_hash)
VALUES ('Admin', 'Adminovich', 'admin@gmail.com', 'Admin_777');

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.email = 'admin@gmail.com' AND r.name = 'ADMIN';

COMMIT;