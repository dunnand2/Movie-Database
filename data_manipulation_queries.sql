--authors: Andrew Dunn and Jake Schlaerth
-- data manipulation queries for movies database

--SELECT
-- query to get all movie data
SELECT 
    movie_id,
    title, 
    release_year, 
    CONCAT(directors.first_name, ' ', directors.last_name) AS director, 
    CONCAT(composers.first_name, ' ', composers.last_name) AS composer, 
    movies.director_id,
    movies.composer_id
    FROM movies
    INNER JOIN directors ON movies.director_id = directors.director_id
    INNER JOIN composers ON movies.composer_id = composers.composer_id
    ORDER BY title;

-- get all directors
 SELECT director_id, 
    first_name, 
    last_name 
    FROM directors 
    ORDER BY last_name;

-- get all composers
 SELECT composer_id, 
    first_name, 
    last_name 
    FROM composers 
    ORDER BY last_name;

-- get all actors
SELECT actor_id, first_name, last_name FROM actors ORDER BY last_name;

-- get all genres
SELECT genre_id, name FROM genres ORDER BY genre_id;

-- get all performances
SELECT 
    CONCAT(actors.first_name, ' ', actors.last_name) AS actor,
    movies.title AS title,
    performances.actor_id AS actor_id,
    performances.movie_id AS movie_id
    FROM performances
    INNER JOIN actors ON performances.actor_id=actors.actor_id
    INNER JOIN movies ON performances.movie_id=movies.movie_id
    ORDER BY title;

-- get all genre_instances
SELECT 
    title, 
    name, 
    genre_instances.movie_id, 
    genre_instances.genre_id 
    FROM genre_instances
    INNER JOIN genres on genre_instances.genre_id = genres.genre_id
    INNER JOIN movies on genre_instances.movie_id = movies.movie_id;


--INSERT
-- insert into movies
INSERT INTO movies 
    (title, release_year, director_id, composer_id) 
    VALUES (?title_input, ?release_year_input, ?director_id_input, ?composer_id_input);

-- insert into directors
INSERT INTO directors
    (first_name, last_name)
    VALUES (?first_name, ?last_name);

-- insert into composers
INSERT INTO composers
    (first_name, last_name)
    VALUES (?first_name, ?last_name);

-- insert into actors
INSERT INTO actors (first_name, last_name) VALUES (?first_name, ?last_name);

-- insert intro genres
INSERT INTO genres (name) VALUES (?name_input);

-- insert into performances
INSERT INTO performances
    (actor_id, movie_id)
    VALUE (?actor_id_input, ?movie_id_input);

-- insert into genre_instance
INSERT INTO genre_instances
    (movie_id, genre_id)
    VALUES (?movie_id_input, ?genre_id_input);


--UPDATE
-- update movies
UPDATE movies 
    SET title=?title_input, 
    release_year=?release_year_input, 
    director_id=?director_id_input, 
    composer_id=?composer_id_input 
    WHERE movie_id=?movie_id_selected;

-- update directors
UPDATE directors SET first_name=?first_name_input, last_name=?last_name_input WHERE director_id=?director_selected;

-- update composers
UPDATE composers SET first_name=?first_name, last_name=?last_name WHERE composer_id=?composer_selected;

--update actors
UPDATE actors SET first_name=?first_name, last_name=?last_name WHERE actor_id=?actor_selected;

-- update genres
UPDATE genres SET name=?name_input WHERE genre_id=?genre_selected;


--DELETE
-- delete movies
DELETE FROM movies WHERE movie_id=?movie_selected;

-- delete directors
DELETE FROM directors WHERE director_id=?director_selected;

-- delete composers
DELETE FROM composers WHERE composer_id=?composer_selected;

-- delete actors
DELETE FROM actors WHERE actor_id=?sctor_selected;

-- delete genres
DELETE FROM genres WHERE genre_id=?genre_selected;

-- delete performances
DELETE FROM performances WHERE actor_id=?actor_id_input AND movie_id=?movie_id_input;

-- deletegenre_instances
DELETE FROM genre_instances WHERE genre_id=?genre_id_input AND movie_id=?movie_id_input;