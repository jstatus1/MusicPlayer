/* https://www.postgresqltutorial.com/creating-first-trigger-postgresql/ */
/*https://stackoverflow.com/questions/33829423/insert-execute-format-postgresql-string*/
/* https://stackoverflow.com/questions/38216533/postgres-sql-trigger-with-dynamic-column-name */


/*
   Summary: This is a trigger that fills up the notification
   table based on if the musician releaes a new track
*/
CREATE OR REPLACE FUNCTION new_album_notification()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$ 
DECLARE
	followers_table CURSOR FOR
			SELECT * FROM follows 
			WHERE user_id=NEW.user_id
			AND new_album_notification = true;
BEGIN
	-- create a table to grab the senders follwers where new album notification is true
	-- loop through each row of the table and grab the user_id from the followers table 
			-- this should be the reciever _id
	FOR current_row IN followers_table LOOP
		EXECUTE format('INSERT INTO notifications
		(
			receiver_id,
			sender_id,
			album_id,
			notif_type,
			notif_text,
		)
		VALUES( $1,$2,$3,$4,$5)') 
			using 
				current_row.follower_id, 
				NEW.user_id, 
				NEW.album_id, 
			    'NEWALBUM', 
				'A musician you follow has released a new album!';
	END LOOP;
RETURN NULL;
END;
$$

-------------------------------------------------------------------------

CREATE TRIGGER new_album_trigger
AFTER INSERT ON albums
FOR EACH ROW
EXECUTE PROCEDURE new_album_notification()

-------------------------------------------------------------------------



/*
   Summary: This is a trigger that fills up the notification
   table based on if a new follower follows a user
*/
CREATE OR REPLACE FUNCTION new_follower_notification()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
DECLARE
	Settings_table CURSOR FOR
			SELECT * FROM Settings 
			WHERE user_id=NEW.user_id
			AND new_album_notification = true;
BEGIN
	-- find a way to seperate settings from followers,
	--update previous query and this trigger query
	FOR current_row IN followers_table LOOP
		EXECUTE format('INSERT INTO notifications
		(
			receiver_id,
			sender_id,
			album_id,
			notif_type,
			notif_text,
		)
		VALUES( $1,$2,$3,$4,$5)') 
			using 
				current_row.follower_id, 
				NEW.user_id, 
				NEW.album_id, 
			    'NEWALBUM', 
				'A musician you follow has released a new album!';
	END LOOP;
RETURN NULL;
END;
$$

-------------------------------------------------------------------------

CREATE TRIGGER new_follower_trigger
AFTER INSERT ON follows
FOR EACH ROW
EXECUTE PROCEDURE new_follower_notification()

-------------------------------------------------------------------------