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

app.post('/api/v1/nba_players', db.createPlayer);

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
