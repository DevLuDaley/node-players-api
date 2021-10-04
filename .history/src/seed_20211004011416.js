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
  console.log('response!!!!!!!!!!!!');
  //   console.log(json);
  console.log(json.body.players[0]);
};
getApiData();
// const json = response.json();
//   const json = resultData.json();
// resultData = [...json];
// for (let i = 0; i < resultData.length; i++) {
//   const player = new Player({
//     firstName: resultData[i].name,
//     lastName: resultData[i].name,
//     playerId: resultData[i].status,
//     age: resultData[i].age,
//   });

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
