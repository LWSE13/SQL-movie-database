const express = require('express');
const moviesRouter = express.Router();
const database = require('../db/db.js');

moviesRouter.get('/', async (req, res) => {
    try {
        //.any is used when you expect the query to return anything
        const movieData = await database.any('SELECT * FROM movies');
        res.json(movieData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})


moviesRouter.post('/', async (req, res) => {
    try {
        const { title, genre, overall_rating } = req.body;
        console.info(`${req.method} request received to add a movie`);
        console.info(`Adding movie with title ${title}, genre ${genre}, and overall rating ${overall_rating}`);
        // .one is used when you expect the query to return one thing or one row of data in this case
        // RETURNING id returns the id of the newly added row
        //id: result.id is taking the returned id and adding it to the response sent back to the client
        const result = await database.one('INSERT INTO movies (title, genre, overall_rating) VALUES ($1, $2, $3) RETURNING id', [title, genre, overall_rating]);
        res.status(201).json({ id: result.id, title, genre, overall_rating });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

moviesRouter.delete('/:id', async (req, res) => {
    try {
        const movieID = req.params.id;
        // .none is used when you expect the query to return nothing
        await database.none('DELETE FROM reviews WHERE movie_id = $1', [movieID]);
        await database.none('DELETE FROM movies WHERE id = $1', [movieID]);
        res.json({ message: 'Movie deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})

module.exports = moviesRouter;