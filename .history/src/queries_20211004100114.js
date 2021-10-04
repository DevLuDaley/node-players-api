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
  const {
    firstName, lastName, playerId, age, jersey, photo,
  } = request.body;

  pool.query('INSERT INTO players (firstName, lastName, playerId, age, jersey, photo) VALUES ($1, $2, $3, $4, $5, $6)', [firstName, lastName, playerId, age, jersey, photo], (error, results) => {
    if (error) {
      throw error;
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error;
    }
    // response.status(201).send(`Player added with ID: ${results.insertId}`);

    response.status(201).send(`Player added with ID: ${results.rows[0].id}`);
  });
};

module.exports = {
  getPlayers,
  // getPlayerById,
  createPlayer,
  // updatePlayer,
  // deletePlayer,
};
