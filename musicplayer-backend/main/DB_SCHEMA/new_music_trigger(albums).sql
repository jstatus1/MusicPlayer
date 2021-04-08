/* https://www.postgresqltutorial.com/creating-first-trigger-postgresql/ */
CREATE OR REPLACE FUNCTION new_music_function()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$ 
BEGIN
	INSERT INTO notifications
	(user_id,
	 notif_type,
	 musician_name,
	 notif_text)
	 
	 VALUES( 
		 (SELECT i.user_id from inserted i ), 
		 'NEWMUSIC', 
		 (SELECT i.artists from inserted i),
		 'A musician you follow has released a new album!');
END;
$$

---
CREATE TRIGGER new_music
AFTER INSERT ON albums
FOR EACH ROW
EXECUTE PROCEDURE new_music_function()


