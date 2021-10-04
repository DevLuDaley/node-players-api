const { Pool } = require('pg');
const fetch = require('node-fetch');

const Player = require('./models/player');

const pool = new Pool({
  user: 'nba_admin',
  host: 'localhost',
  database: 'sports_api',
  password: 'password',
  port: 5432,
});

let resultData;
const saveCounter = 0;

// const nba_url = ['https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=basketball&response_format=JSON
const nbaUrl = 'https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=basketball&response_format=JSON';

const getApiData = async () => {
  const response = await fetch(nbaUrl);
  const json = await response.json();
  //   resultData = [...json];
  // nbaUrl.map(async (url) => {
  // try {
  // const response = await fetch(nbaUrl);
  // const json = await response.json();
  //   console.log(json);
  // ! GET ALL PLAYERS =>>> console.log(json.body.players);
  const allPlayers = json.body.players;
  //   console.log(json.body.players[0]); // ! first player in list
  console.log(json.body.players[0].age); // ! first player in list
  console.log(json.body.players[0].firstname); // ! first player in list
  console.log(json.body.players[0].lastname); // ! first player in list
  console.log(json.body.players[0].position); // ! first player in list
  console.log(json.body.players[0].id); // ! first player in list
  console.log(json.body.players[0].photo); // ! first player in list
  console.log(json.body.players[0].pro_team); // ! first player in list
  // const json = response.json();
  //   const json = resultData.json();
  // allPlayers = [...json];
  // resultData = [...json];
  for (let i = 0; i < allPlayers.length; i++) {
    const player = new Player({
      firstName: allPlayers[i].name,
      lastName: allPlayers[i].name,
      playerId: allPlayers[i].status,
      age: allPlayers[i].age,
      allPlayers[i].age,
  allPlayers[i].firstname,
  allPlayers[i].lastname,
  allPlayers[i].position,
  allPlayers[i].id,
  allPlayers[i].photo,
  allPlayers[i].pro_team
    });
  }
};
getApiData();

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
