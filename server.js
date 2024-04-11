const express = require('express');
const { username, password } = require('./UP.js');
const { Pool } = require('pg');
const moviesRouter = require('./routes/movies.js');
const PORT = process.env.PORT || 3001;
const app = express();
const reviewsRouter = require('./routes/reviews.js');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/movies', moviesRouter);
app.use('/api/reviews', reviewsRouter);


// Connect to database
const pool = new Pool(
  {
    // TODO: Enter PostgreSQL username
    user: username,
    // TODO: Enter PostgreSQL password
    password: password,
    host: 'localhost',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
)

pool.connect();


app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});