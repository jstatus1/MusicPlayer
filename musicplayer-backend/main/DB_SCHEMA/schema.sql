//for copy and paste into own database

CREATE TABLE users(
    uid SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    email_verified BOOLEAN,
    googleid VARCHAR(90),
    password VARCHAR(255),
    profile_img_url VARCHAR(100),
    background_img_url VARCHAR(100),
    city VARCHAR(30),
    country VARCHAR(30),
    date_created DATE,
    last_login DATE,
    bio VARCHAR(100),
    links VARCHAR[] DEFAULT ARRAY[]::VARCHAR[],
    socialMedia VARCHAR[] DEFAULT ARRAY[]::VARCHAR[]
);

CREATE TABLE posts (
  pid SERIAL PRIMARY KEY,
  title VARCHAR(255),
  body VARCHAR,
  search_vector TSVECTOR,
  user_id INT REFERENCES users(uid),
  author VARCHAR REFERENCES users(username),
  date_created TIMESTAMP,
  like_user_id INT[] DEFAULT ARRAY[]::INT[],
  likes INT DEFAULT 0
);

CREATE TABLE comments(
    cid SERIAL PRIMARY KEY,
    comment VARCHAR(255),
    author VARCHAR REFERENCES users(username),
    user_id INT REFERENCES users(uid),
    post_id INT REFERENCES posts(pid),
    date_created TIMESTAMP
);