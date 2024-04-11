const express = require('express');
const reviewsRouter = express.Router();
const database = require('../db/db.js');

reviewsRouter.get('/', async (req, res) => {
    try {
        // select the movie title, genre and overall rating from the movies table
        // select the reviewer name and review from the reviews table
        // join the two sets of data together dependant on whether the movie_id foreign key in the reviews table matches the id in the movies table
        const reviewData = await database.any('SELECT movies.title, movies.genre, movies.overall_rating, reviews.reviewer_name, reviews.review FROM reviews JOIN movies ON reviews.movie_id = movies.id');
        res.json(reviewData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})










module.exports = reviewsRouter;