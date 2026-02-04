CREATE TABLE sessions (
  token       VARCHAR2(64) PRIMARY KEY,
  user_id     NUMBER NOT NULL,
  created_at  DATE DEFAULT SYSDATE,
  expires_at  DATE NOT NULL,
  CONSTRAINT fk_sessions_user
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_sessions_user ON sessions(user_id);
