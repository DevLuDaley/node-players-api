const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const db = require('./queries');

const port = 3000;

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
    try{
      const { firstName, lastName, playerId, age, jersey, photo,} = request.body;

      const newPlayer = await pool.query('INSERT INTO players (firstName, lastName, playerId, age, jersey, photo) VALUES ($1, $2, $3, $4, $5, $6)', [firstName, lastName, playerId, age, jersey, photo], (error, results) => {
        if (error) {
          throw error;
       }  
    // else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    // 	throw error;
    // }

      }
      )
    } catch (err) {
      console.log(err.message);
    }
);

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
