CREATE TABLE game (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  finish BOOL default false
);