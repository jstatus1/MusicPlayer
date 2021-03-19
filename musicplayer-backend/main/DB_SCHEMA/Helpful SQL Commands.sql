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


--Update a column to make sure the column is unique
ALTER TABLE products
ADD UNIQUE(name);


