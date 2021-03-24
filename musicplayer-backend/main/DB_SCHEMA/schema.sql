//for copy and paste into own database
CREATE TABLE admin(
  admin_id char(15) NOT NULL PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  title VARCHAR(20),
  username VARCHAR(30),
  password VARCHAR(30),
  register_date DATE,
  avatar VARCHAR(200) DEFAULT '<insert image link here>',
  created_playlists VARCHAR[] DEFAULT ARRAY[]::VARCHAR[] /* max 50 playlists */
);

CREATE TABLE users(
    uid SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    email_verified BOOLEAN DEFAULT false,
    googleid VARCHAR(90),
    password VARCHAR(255),
    avatar VARCHAR(100),
    background_img_url VARCHAR(100),
    city VARCHAR(30),
    country VARCHAR(30),
    date_created DATE,
    last_login DATE,
    about_me VARCHAR(100),
    links VARCHAR[] DEFAULT ARRAY[]::VARCHAR[],
    socialMedia_fb VARCHAR(200),
    socialMedia_tw VARCHAR(200),
    socialMedia_in VARCHAR(200),
    musician BOOLEAN,
    record_label VARCHAR(200),
    num_listeners INT DEFAULT 0,
);

CREATE TABLE reaction(
  likes_id SERIAL PRIMARY KEY,
  created_at TIMESTAMP,
  user_id INT REFERENCES users(uid) ON DELETE CASCADE,
  song_id INT REFERENCES songs(song_id) ON DELETE CASCADE,
  reaction_type VARCHAR(10)
); 

CREATE TABLE songs(
  song_id SERIAL PRIMARY KEY,
  song_title VARCHAR(40) NOT NULL,
  ft_musicians VARCHAR[] DEFAULT ARRAY[]::VARCHAR[],
  user_id INT REFERENCES users(uid) ON DELETE CASCADE,
  album_id INT REFERENCES albums(album_id) ON DELETE CASCADE,
  duration TIME,
  date_created DATE,
  song_art VARCHAR(200),
  num_played BIGINT
);

CREATE TABLE albums(
  album_id  SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(uid) ON DELETE CASCADE,
	album_Duration TIME,
	date_Published DATE,
	artists varchar(100),	
	album_name varchar(60) NOT NULL,
  album_art VARCHAR(200) DEFAULT '<insert image link here>'
);

CREATE TABLE playlist(
  playlist_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(uid) ON DELETE CASCADE,
	playlist_name varchar(100),
  public_status BOOLEAN,
  description VARCHAR(300),
  playlist_art VARCHAR(200) DEFAULT '<insert image link here>'
);

CREATE TABLE playlist_songs(
  id SERIAL PRIMARY KEY,
  playlist_id INT REFERENCES playlist(playlist_id) ON DELETE CASCADE,
  song_id INT REFERENCES songs(song_id) ON DELETE CASCADE
)

CREATE TABLE comments(
    cid SERIAL PRIMARY KEY,
    comment VARCHAR(255),
    author VARCHAR REFERENCES users(username),
    user_id INT REFERENCES users(uid) ON DELETE CASCADE,
    song_id INT REFERENCES posts(song_id) ON DELETE CASCADE,
    date_created TIMESTAMP,
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




