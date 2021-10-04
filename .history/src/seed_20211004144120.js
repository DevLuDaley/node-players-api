const { Pool } = require('pg');
const fetch = require('node-fetch');

const db = require('./queries');
const Player = require('./models/player');
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

// const postUrl = 'http://localhost:3000/api/v1/nba_players?firstname=Fatango&lastname=Regal'
const postUrl = 'http://localhost:3000/api/v1/nba_players';

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
    const importedPlayer = new Player({
    // const player = // createPlayer(// )
    // new Player(
    // const player = {
      firstName: allPlayers[i].firstname,
      lastName: allPlayers[i].lastname,
      playerId: allPlayers[i].id,
      age: allPlayers[i].age,
      jersey: parseInt(allPlayers[i].jersey, 10),
      //   position: allPlayers[i].position,
      photo: allPlayers[i].photo,
      //   team: allPlayers[i].pro_team,
    });
    // );
    // db.createPlayer(player);
    // db.createPlayer(importedPlayer);
    const response = await fetch(postUrl,
      {
        method: 'POST',
        body: JSON.stringify(importedPlayer),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json())
      .then((json) => console.log(json));

    // });
    // const json = await response.json();
  }
};
// const carrot = getApiData();
// console.log(carrot);
// const assignPlayerData = async (player) => {
// //    const getApiData = async () => {
//   const response = await fetch(postUrl,
//     {
//       method: 'POST',
//       body: JSON.stringify(importedPlayer),
//       headers: { 'Content-Type': 'application/json' },
//     }).then((res) => res.json())
//     .then((json) => console.log(json));

//   // });
//   const json = await response.json();
// };
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
