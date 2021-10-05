const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const db = require('./queries');

const port = 3000;
const pool = new Pool({
  user: 'nba_admin',
  host: 'localhost',
  database: 'sports_api',
  password: 'password',
  port: 5432,
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.get('/', (request, response) => {
  response.json({ info: 'NBA Players Stats Nodejs, Expressjs, and Postgres API' });
  // response.send('hello world!');
});

app.get('/api/v1/nba_players', db.getPlayers);

app.post('/api/v1/nba_players', async (req, res) => {
  try {
    const {
      firstName, lastName, playerId, age, jersey, photo, avgPosAge, avgLeagueAge, position, team,
    } = req.body;

    const newPlayer = await pool.query('INSERT INTO players (firstName, lastName, playerId, age, jersey, photo, avgPosAge, avgLeagueAge, position, team) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [firstName, lastName, playerId, age, jersey, photo, avgPosAge, avgLeagueAge, position, team], (error, results) => {
      // if (error) {
      //   throw error;
      // }
      // else if (!Array.isArray(results.rows) || results.rows.length < 1) {
      // throw error;
      // }
    });
    // results.json(newPlayer);
    // res.json(newPlayer);
    .then(res => res.text()).then(console.log)
  } catch (err) {
    console.log(err.message);
  }
});

// app.get('/players/:id', db.getPlayerById);
// app.post('/players', db.createPlayer);
// app.put('/players/:id', db.updatePlayer);
// app.delete('/players/:id', db.deletePlayer);

app.listen(port, () => {
  console.log(`App running on port ${port}.
Go to localhost:${port}`);
});
// const postPlayer = () => {
// app.post('/players', db.createPlayer);
// app.post('/api/v1/nba_players', db.createPlayer);
// app.post('/api/v1/nba_players', db.createPlayer);
// };
// postPlayer();
// accessGroup;
