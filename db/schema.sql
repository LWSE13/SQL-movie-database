DROP DATABASE IF EXISTS movies_db;
CREATE DATABASE movies_db;

\c movies_db;

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  genre VARCHAR(30) NOT NULL,
  overall_rating INTEGER NOT NULL
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  reviewer_name VARCHAR(30) NOT NULL,
  review VARCHAR(100) NOT NULL,
  movie_id INTEGER NOT NULL,
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);