//for copy and paste into own database

CREATE TABLE users(
    uid SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE,
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


CREATE TABLE musicians(
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    avatar VARCHAR(100),
    num_listeners INT DEFAULT 0,
    awards VARCHAR[],
    sex VARCHAR(2),
    age INT(100),
    register_date DATE,
    socialMedia_fb VARCHAR(200),
    socialMedia_tw VARCHAR(200),
    socialMedia_in VARCHAR(200),
    record_label VARCHAR[] ARRAY,
    followers INT DEFAULT 0,
    username VARCHAR(30) UNIQUE,
    genre VARCHAR(20),
    password VARCHAR(255),
    albums VARCHAR(100),
    singles VARCHAR(50)
);

CREATE TABLE admin(
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  title VARCHAR(20),
  username VARCHAR(30),
  register_date DATE,
  password VARCHAR(50),
  avatar VARCHAR(200),
)


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

CREATE TABLE listener(
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  user_name VARCHAR(30) UNIQUE,
  register_date DATE,
  instagram VARCHAR(200),
  twitter VARCHAR(200),
  facebook VARCHAR(200),
  about_me VARCHAR(350),
  avatar VARCHAR(100),
  password VARCHAR(255)
);