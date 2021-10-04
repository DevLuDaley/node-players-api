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
  response.json({ info: 'NBA Stats Nodejs, Expressjs, and Postgres API' });
  // response.send('hello world!');
});

app.get('/v1/players', db.getPlayers);
// app.get('/players/:id', db.getPlayerById);
// app.post('/players', db.createPlayer);
// app.put('/players/:id', db.updatePlayer);
// app.delete('/players/:id', db.deletePlayer);

app.listen(port, () => {
  console.log(`App running on port ${port}.
Go to localhost:${port}`);
});