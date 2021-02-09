var express = require('express');
var mysql = require('./dbcon.js');
var CORS = require('cors');

var app = express();
app.set('port', 19191);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(CORS());

const getMoviesQuery =  `SELECT 
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
                        ORDER BY title;`;

const getDirectorsQuery =   `SELECT director_id, 
                            first_name, 
                            last_name 
                            FROM directors 
                            ORDER BY last_name;`;
const getComposersQuery =   `SELECT composer_id, 
                            first_name, 
                            last_name 
                            FROM composers 
                            ORDER BY last_name;`;
const getActorsQuery = 'SELECT actor_id, first_name, last_name FROM actors ORDER BY last_name;';
const getGenresQuery = `SELECT genre_id, name FROM genres ORDER BY genre_id;`;
const getPerformancesQuery =    `SELECT 
                                CONCAT(actors.first_name, ' ', actors.last_name) AS actor,
                                movies.title AS title,
                                performances.actor_id AS actor_id,
                                performances.movie_id AS movie_id
                                FROM performances
                                INNER JOIN actors ON performances.actor_id=actors.actor_id
                                INNER JOIN movies ON performances.movie_id=movies.movie_id
                                ORDER BY title;`;
const getGenreInstancesQuery =  `SELECT 
                                title, 
                                name, 
                                genre_instances.movie_id, 
                                genre_instances.genre_id 
                                FROM genre_instances
                                INNER JOIN genres on genre_instances.genre_id = genres.genre_id
                                INNER JOIN movies on genre_instances.movie_id = movies.movie_id`;

const insertMovieQuery =        `INSERT INTO movies 
                                (title, release_year, director_id, composer_id) 
                                VALUES (?, ?, ?, ?)`;
const insertDirectorQuery =     `INSERT INTO directors
                                (first_name, last_name)
                                VALUES (?, ?)`;
const insertComposerQuery =     `INSERT INTO composers
                                (first_name, last_name)
                                VALUES (?, ?)`;
const insertActorQuery =        `INSERT INTO actors (first_name, last_name) VALUES (?, ?)`;
const insertGenreQuery =        `INSERT INTO genres (name) VALUES (?);`;
const insertPerformanceQuery =  `INSERT INTO performances
                                (actor_id, movie_id)
                                VALUE (?, ?);`;
const insertGenreInstanceQuery =    `INSERT INTO genre_instances
                                    (movie_id, genre_id)
                                    VALUES (?, ?);`;

const updateMoviesQuery =       `UPDATE movies 
                                SET title=?, 
                                release_year=?, 
                                director_id=?, 
                                composer_id=? 
                                WHERE movie_id=?;`;
const updateDirectorsQuery = 'UPDATE directors SET first_name=?, last_name=? WHERE director_id=?;';
const updateComposersQuery = 'UPDATE composers SET first_name=?, last_name=? WHERE composer_id=?;'
const updateActorsQuery = 'UPDATE actors SET first_name=?, last_name=? WHERE actor_id=?;';
const updateGenresQuery = `UPDATE genres SET name=? WHERE genre_id=?;`;

const deleteMovieQuery = `DELETE FROM movies WHERE movie_id=?;`;
const deleteDirectorQuery = `DELETE FROM directors WHERE director_id=?;`;
const deleteComposerQuery = `DELETE FROM composers WHERE composer_id=?;`;
const deleteActorQuery = `DELETE FROM actors WHERE actor_id=?;`;
const deleteGenreQuery = `DELETE FROM genres WHERE genre_id=?;`;
const deletePerformanceQuery = `DELETE FROM performances WHERE actor_id=? AND movie_id=?`
const deleteGenreInstanceQuery = `DELETE FROM genre_instances WHERE genre_id=? AND movie_id=?;`;

const getAllData = (current_query, res) => {
    mysql.pool.query(current_query, (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ rows: rows });
    });
};

// read all data
app.get('/', function (req, res, next) {
    var currentQuery;
    // movies in get req header
    if (req.headers.table_name == 'movies') {
        currentQuery = getMoviesQuery;
    }

    // directors in req header
    if (req.headers.table_name == 'directors') {
        currentQuery = getDirectorsQuery;
    }

    // composers in req header
    if (req.headers.table_name == 'composers') {
        currentQuery = getComposersQuery;
    }

    // actors in get req header
    if (req.headers.table_name == 'actors') {
        currentQuery = getActorsQuery;
    }

    // genres in request header
    if (req.headers.table_name == 'genres') {
        currentQuery = getGenresQuery;
    }

    // performances in get req header
    if (req.headers.table_name == 'performances') {
        currentQuery = getPerformancesQuery;
    }

    // genreInstances in get req header
    if (req.headers.table_name == 'genre_instances') {
        currentQuery = getGenreInstancesQuery;
    }

    mysql.pool.query(currentQuery, (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
        getAllData(currentQuery, res);
    });
});

// insert
app.post('/', function (req, res, next) {
    //insert movie
    if (req.body.table_name == 'movies') {
        mysql.pool.query(insertMovieQuery,
            [
                req.body.title,
                req.body.release_year,
                req.body.director_id,
                req.body.composer_id
            ],
            (err, result) => {
                if (err) {
                    next(err);
                    return;
                }
                // send all data
                getAllData(getMoviesQuery, res);
            });
    }

    // insert director
    if (req.body.table_name == 'directors') {
        mysql.pool.query(insertDirectorQuery,
            [
                req.body.first_name,
                req.body.last_name,
            ],
            (err, result) => {
                if (err) {
                    next(err);
                    return;
                }
                // send all data
                getAllData(getDirectorsQuery, res);
            });
    }

    // insert composer
    if (req.body.table_name == 'composers') {
        mysql.pool.query(insertComposerQuery,
            [
                req.body.first_name,
                req.body.last_name,
            ],
            (err, result) => {
                if (err) {
                    next(err);
                    return;
                }
                // send all data
                getAllData(getComposersQuery, res);
            });
    }

    // insert actor
    if (req.body.table_name == 'actors') {
        mysql.pool.query(insertActorQuery,
            [
                req.body.first_name,
                req.body.last_name,
            ],
            (err, result) => {
                if (err) {
                    next(err);
                    return;
                }
                // send all data
                getAllData(getActorsQuery, res);
            });
    }

    // insert genre
    if (req.body.table_name == 'genres') {
        mysql.pool.query(insertGenreQuery,
            [
                req.body.name
            ],
            (err, result) => {
                if (err) {
                    next(err);
                    return;
                }
                // send all data
                getAllData(getGenresQuery, res);
            });
    }

    // insert performance
    if (req.body.table_name == 'performances') {
        mysql.pool.query(insertPerformanceQuery,
            [
                req.body.actor_id,
                req.body.movie_id
            ],
            (err, result) => {
                if (err) {
                    next(err);
                    return;
                }
                // send all data
                getAllData(getPerformancesQuery, res);
            });
    }

    // insert genre instance
    if (req.body.table_name == 'genre_instances') {
        mysql.pool.query(insertGenreInstanceQuery,
            [
                req.body.movie_id,
                req.body.genre_id
            ],
            (err, result) => {
                if (err) {
                    next(err);
                    return;
                }
                // send all data
                getAllData(getGenreInstancesQuery, res);
            });
    }
});

// update
app.put('/', function (req, res, next) {
    // update movie
    if (req.body.table_name == 'movies') {
        mysql.pool.query(
            updateMoviesQuery,
            [
                req.body.title,
                req.body.release_year,
                req.body.director_id,
                req.body.composer_id,
                req.body.movie_id
            ],
            (err, result) => {
                if (err) {
                    next(err);
                    return;
                }
                // send all data
                getAllData(getMoviesQuery, res);
            });
    }

    // update director
    if (req.body.table_name == 'directors') {
        mysql.pool.query(
            updateDirectorsQuery,
            [req.body.first_name, req.body.last_name, req.body.director_id],
            (err, result) => {
                if (err) {
                    next(err);
                    return;
                }
                // send all data
                getAllData(getDirectorsQuery, res);
            });
    }

    // update composers
    if (req.body.table_name == 'composers') {
        mysql.pool.query(
            updateComposersQuery,
            [req.body.first_name, req.body.last_name, req.body.composer_id],
            (err, result) => {
                if (err) {
                    next(err);
                    return;
                }
                // send all data
                getAllData(getComposersQuery, res);
            });
    }

    // update actor
    if (req.body.table_name == 'actors') {;
        mysql.pool.query(
            updateActorsQuery,
            [req.body.first_name, req.body.last_name, req.body.actor_id],
            (err, result) => {
                if (err) {
                    next(err);
                    return;
                }
                // send all data
                getAllData(getActorsQuery, res);
            });
    }

    // update genre
    if (req.body.table_name == 'genres') {
        mysql.pool.query(
            updateGenresQuery,
            [req.body.name, req.body.genre_id],
            (err, result) => {
                if (err) {
                    next(err);
                    return;
                }
                // send all data
                getAllData(getGenresQuery, res);
            });
    }
});

// delete
app.delete('/', function (req, res, next) {
    // console.log(req.body);
    // delete movie
    // we can freely delete movies
    if (req.body.table_name == "movies") {
        mysql.pool.query(deleteMovieQuery, [req.body.movie_id], (err, rows, fields) => {
            if (err) {
                next(err);
                return;
            }
            getAllData(getMoviesQuery, res)
        });
    }

    // delete director
    if (req.body.table_name == "directors") {
        mysql.pool.query(deleteDirectorQuery, [req.body.director_id], (err, rows, fields) => {
            if (err) {
                next(err);
                return;
            }
            getAllData(getDirectorsQuery, res)
        });
    }

    // delete composer
    if (req.body.table_name == "composers") {
        mysql.pool.query(deleteComposerQuery, [req.body.composer_id], (err, rows, fields) => {
            if (err) {
                next(err);
                return;
            }
            getAllData(getComposersQuery, res)
        });
    }

    // delete actor
    if (req.body.table_name == "actors") {
        mysql.pool.query(deleteActorQuery, [req.body.actor_id], (err, rows, fields) => {
            if (err) {
                next(err);
                return;
            }
            getAllData(getActorsQuery, res)
        });
    }

    // delete genre
    if (req.body.table_name == "genres") {
        mysql.pool.query(deleteGenreQuery, [req.body.genre_id], (err, rows, fields) => {
            if (err) {
                next(err);
                return;
            }
            getAllData(getGenresQuery, res)
        });
    }

    // delete performance
    if (req.body.table_name == "performances") {
        mysql.pool.query(deletePerformanceQuery, [req.body.actor_id, req.body.movie_id], 
            (err, rows, fields) => {
            if (err) {
                next(err);
                return;
            }
            getAllData(getPerformancesQuery, res)
        });
    }

    // delete performance
    if (req.body.table_name == "genre_instances") {
        mysql.pool.query(deleteGenreInstanceQuery, [req.body.genre_id, req.body.movie_id],
            (err, rows, fields) => {
                if (err) {
                    next(err);
                    return;
                }
                getAllData(getGenreInstancesQuery, res)
            });
    }

});

app.use(function (req, res) {
    res.status(404);
    res.send('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.send('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
