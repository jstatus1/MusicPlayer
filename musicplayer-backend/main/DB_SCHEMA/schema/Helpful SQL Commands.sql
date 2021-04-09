//how to update and insert stuff into your db: https://www.postgresqltutorial.com/postgresql-update/


//Delete Whole TABLE
DROP TABLE  IF EXISTS  users CASCADE;

//Delete Specific user_id
DELETE FROM USERS WHERE uid=1;

INSERT INTO 
	users(email)
VALUES
	('test@gmail.com');


--If you want to update a table by adding a column:
--Make sure you delete all null rows!!! bc rule could be violated
UPDATE products
SET price = 9999
WHERE price IS NULL:

ALTER TABLE products
ALTER COLUMN price
SET NOT NULL;

--update attribute size
alter table songs 
alter COLUMN title type character varying(120),
alter COLUMN col SET NOT NULL;

--adding a column to an exisiting table
--https://www.postgresqltutorial.com/postgresql-add-column/
ALTER TABLE songs
ADD COLUMN song_link VARCHAR(300)
NOT NULL;

--Update a column to make sure the column is unique
ALTER TABLE products
ADD UNIQUE(name);


--Insert for album
INSERT INTO 
	albums(user_id, album_name)
VALUES
	(4, 'Evil Lighters');


--Grabbing My Followers based of of if they want a notification
--whenever I drop a track
SELECT * FROM 
Follows WHERE
user_id = 4 and
new_album_notification = true;


--Joining Followers_id With Their Setting
SELECT * FROM follows
LEFT JOIN settings 
ON follows.follower_id = settings.user_id
WHERE follows.user_id=4 and 
settings.new_album_notification = true ;

--Updating Constraints
ALTER TABLE notifications
  DROP CONSTRAINT notif_type
, ADD  CONSTRAINT zinotif_typepchk CHECK (notif_type IN ('NEWMUSIC', 'NEWALBUM', 'NEWFOLLOWER','UNFOLLOWED', 'ADMINDELETE', 'ADMINUPDATE', 'NEWS'));

DELETE FROM follows WHERE user_id = 4 and follower_id = 61;
DELETE FROM notifications WHERE notif_type = 'NEWFOLLOWER';

