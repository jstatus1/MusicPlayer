//how to update and insert stuff into your db: https://www.postgresqltutorial.com/postgresql-update/


//Delete Whole TABLE
DROP TABLE  IF EXISTS  users CASCADE;

//Delete Specific user_id
DELETE FROM USERS WHERE uid=1;

INSERT INTO 
	users(email)
VALUES
	('test@gmail.com');