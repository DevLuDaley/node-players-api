const { Pool } = require('pg');
const fetch = require('node-fetch');

const db = require('./queries');
// const Player = require('./models/player');
// const createPlayer = require('./index');

const pool = new Pool({
  user: 'nba_admin',
  host: 'localhost',
  database: 'sports_api',
  password: 'password',
  port: 5432,
});

// let resultData;
const saveCounter = 0;

// const nba_url = ['https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=basketball&response_format=JSON
const nbaUrl = 'https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=basketball&response_format=JSON';

const getApiData = async () => {
  const response = await fetch(nbaUrl);
  const json = await response.json();
  const allPlayers = json.body.players;
  //   console.log(json.body.players[0]); // ! first player in list
  //   console.log(json.body.players[0].age);
  //   console.log(json.body.players[0].firstname);
  //   console.log(json.body.players[0].lastname);
  //   console.log(json.body.players[0].position);
  //   console.log(json.body.players[0].id);
  //   console.log(json.body.players[0].photo);
  //   console.log(json.body.players[0].pro_team);

  for (let i = 0; i < allPlayers.length; i++) {
    // const player = new Player({
    // const player = // createPlayer(// )
    // new Player(
    const player = {
      firstName: allPlayers[i].firstname,
      lastName: allPlayers[i].lastname,
      playerId: allPlayers[i].id,
      age: allPlayers[i].age,
      jersey: parseInt(allPlayers[i].jersey, 10),
      //   position: allPlayers[i].position,
      photo: allPlayers[i].photo,
      //   team: allPlayers[i].pro_team,
    };
    // );
    // db.createPlayer(player);
    // db.createPlayer();
  }
  return allPlayers;
};
const createPlayer = async (req, res) => {
  try {
    const getPlayers = async () => {
      const response = await fetch(nbaUrl);
      const json = await response.json();
      const allPlayers = json.body.players;
      for (let i = 0; i < allPlayers.length; i++) {
        const player = {
          firstName: allPlayers[i].firstname,
          lastName: allPlayers[i].lastname,
          playerId: allPlayers[i].id,
          age: allPlayers[i].age,
          jersey: parseInt(allPlayers[i].jersey, 10),
          //   position: allPlayers[i].position,
          photo: allPlayers[i].photo,
          //   team: allPlayers[i].pro_team,
        };
    //   }
    // };

            const {
            firstName, lastName, playerId, age, jersey, photo, avgPosAge, avgLeagueAge,
            } = req.body;
            // allPlayers;
            // const { player } = req.body;

            const newPlayer = await pool.query('INSERT INTO players (firstName, lastName, playerId, age, jersey, photo, avgPosAge, avgLeagueAge) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [firstName, lastName, playerId, age, jersey, photo, avgPosAge, avgLeagueAge], (error, results) => {
            if (error) {
                throw error;
            } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
                throw error;
            }
            // response.status(201).send(`Player added with ID: ${results.insertId}`);
        }
            res.status(201).send(`Player added with ID: ${results.rows[0].id}`);
            );}
            res.json(player);
        } catch (err) {
            console.log(err.message);
        }
    };
  };
}
    // };
// };
createPlayer();
// };
// getApiData();

//      player.save(() => {
//   console.log("saved" + player)

//   saveCounter++;

//   if (saveCounter === resultData.length) {
//      mongoose.disconnect()
//      .then(() => console.log("saved succesfully and mongodb   disconnected"))
//      .catch(error => console.log(error));
//      }
//   });
// }
// } catch (error) {s
// });
