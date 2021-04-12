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
    username VARCHAR(30) NOT NULL UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    email_verified BOOLEAN DEFAULT false,
    googleid VARCHAR(90),
    password VARCHAR(255),
    avatar VARCHAR(300),
    profile_img_url VARCHAR(100),
    city VARCHAR(30),
    country VARCHAR(30),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    about_me VARCHAR(400),
    links VARCHAR[] DEFAULT ARRAY[]::VARCHAR[],
    socialMedia_fb VARCHAR(200),
    socialMedia_tw VARCHAR(200),
    socialMedia_in VARCHAR(200),
    musician BOOLEAN,
    record_label VARCHAR(200),
    num_listeners INT DEFAULT 0
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
  title VARCHAR(40) NOT NULL,
  genre VARCHAR(50),
  additional_tag VARCHAR[] DEFAULT ARRAY[]::VARCHAR[],
  song_link VARCHAR(300) NOT NULL,
  description VARCHAR(400),
  caption VARCHAR(400),
  ft_musicians VARCHAR[] DEFAULT ARRAY[]::VARCHAR[],
  user_id INTisci REFERENCES users(uid) ON DELETE CASCADE,
  album_id INT REFERENCES albums(album_id) ON DELETE SET NULL,
  duration TIME,
  release_date DATE,
  song_image VARCHAR(200),
  num_played BIGINT DEFAULT 0,
  publisher VARCHAR(30),
  ISRC VARCHAR(30),
  composer VARCHAR(50),
  release_title VARCHAR(40),
  buy_link VARCHAR(40),
  album_title VARCHAR(30),
  record_label VARCHAR(30),
  barcode VARCHAR(30),
  ISWC VARCHAR(30),
  P_Line VARCHAR(30),
  explicit_content BOOLEAN
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

CREATE TABLE playlists(
  playlist_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(uid) ON DELETE CASCADE,
	playlist_name varchar(100),
  public_status BOOLEAN,
  description VARCHAR(300),
  playlist_art VARCHAR(200) DEFAULT '<insert image link here>'
);

CREATE TABLE playlist_songs(
  id SERIAL PRIMARY KEY,
  playlist_id INT REFERENCES playlists(playlist_id) ON DELETE CASCADE,
  song_id INT REFERENCES songs(song_id) ON DELETE CASCADE
);

CREATE TABLE comments(
    cid SERIAL PRIMARY KEY,
    comment VARCHAR(255),
    author VARCHAR REFERENCES users(username),
    user_id INT REFERENCES users(uid) ON DELETE CASCADE,
    song_id INT REFERENCES posts(song_id) ON DELETE CASCADE,
    date_created TIMESTAMP
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
  likes INT DEFAULT 0,
<<<<<<< HEAD:musicplayer-backend/main/DB_SCHEMA/schema.sql
  song_id INT UNIQUE 
=======
  song_id INT UNIQUE
);

CREATE TABLE notifications (
  nid SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(uid),
  notif_type VARCHAR(10),
  musician_name VARCHAR REFERENCES users(username),
  notif_text VARCHAR(200),
  CONSTRAINT notif_type CHECK (notif_type IN ('NEWMUSIC', 'ADMINDELETE', 'ADMINUPDATE'))
>>>>>>> FrontEnd_Edward:musicplayer-backend/main/DB_SCHEMA/group13_schema.sql
);




