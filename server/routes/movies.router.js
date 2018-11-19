const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const sqlText = 'SELECT * FROM "movies" WHERE tag=$1'
    pool.query(sqlText, [req])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    let movie = req.body;
    const sqlText = 'INSERT INTO movie (title, tmdb_id, poster_path) VALUES ($1, $2, $3)'
    pool.query(sqlText, [movie.title, movie.id, movie.poster_path])
        .then(res.sendStatus(200))
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
    });
})

module.exports = router;