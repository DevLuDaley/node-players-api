const { Pool } = require('pg');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

const getPlayers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getPlayerById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createPlayer = (request, response) => {
  const { name, email } = request.body;

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Player added with ID: ${results.insertId}`);
  });
};

const updatePlayer = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Player modified with ID: ${id}`);
    },
  );
};

// const deletePlayer = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).send(`Player deleted with ID: ${id}`);
//   });
// };

module.exports = {
  getPlayers,
  getPlayerById,
  // createPlayer,
  // updatePlayer,
  // deletePlayer,
};
