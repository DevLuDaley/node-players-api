const { Pool } = require('pg');

const pool = new Pool({
  user: 'nba_admin',
  host: 'localhost',
  database: 'sports_api',
  password: 'password',
  port: 5432,
});

const getPlayers = (request, response) => {
  pool.query('SELECT * FROM players ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// const getPlayerById = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query('SELECT * FROM players WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };

const createPlayer = (request, response) => {
  const { name, email } = request.body;

  pool.query('INSERT INTO players (firstName, lastName, playerId, age) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Player added with ID: ${results.insertId}`);
  });
};

module.exports = {
  getPlayers,
  // getPlayerById,
  createPlayer,
  // updatePlayer,
  // deletePlayer,
};
