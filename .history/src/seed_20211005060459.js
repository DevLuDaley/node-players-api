// const { Pool } = require('pg');
const fetch = require('node-fetch');
// const axios = require('axios').default;

// const db = require('./queries');
// const Player = require('./models/player');
// const createPlayer = require('./index');

// const pool = new Pool({
//   user: 'nba_admin',
//   host: 'localhost',
//   database: 'sports_api',
//   password: 'password',
//   port: 5432,
// });

// let resultData;
// const saveCounter = 0;

// const nba_url = ['https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=basketball&response_format=JSON
const nbaUrl = 'https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=basketball&response_format=JSON';

const postUrl = 'http://localhost:3000/api/v1/nba_players';

const createNewPlayer = async (importedPlayer) => {
  //    const getApiData = async () => {
  const response = await fetch(postUrl,
    {
      method: 'POST',
      body: JSON.stringify(importedPlayer),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
    .then((json) => console.log(json));
};

const transformApiData = async (apiResponse) => {
  try {
    // await apiResponse;
    // for (p in apiResponse
    console.log('apiResponse.length', apiResponse.length);
    // return await apiResponse.filter((player) => player.age != null);
  } catch (error) {
    console.error(error);
  }
};
const getApiData = async () => {
  try {
    const response = await fetch(nbaUrl);
    // const response = axios.get(nbaUrl);
    const json = await response.json();
    const allPlayers = json.body.players;
    //   console.log(json.body.players[0]); // ! first player in list
    //   console.log(json.body.players[0].age);
    // console.log(json.body.players[0].firstname);
    // console.log(json.body.players[0].lastname);
    // console.log(json.body.players[0].position);
    //   console.log(json.body.players[0].id);
    //   console.log(json.body.players[0].photo);
    // console.log(json.body.players[0].pro_team);

    // for (let i = 0; i < allPlayers.length; i += 1) {
    // ? map incoming returned object of players to pgsql player object properties
    for (let i = 0; i < 10; i += 1) {
    // const player = new Player({
    // const player = // createPlayer(// )
    // new Player(
      const player = {
        firstName: allPlayers[i].firstname.toLowerCase(),
        lastName: allPlayers[i].lastname.toLowerCase(),
        playerId: allPlayers[i].id,
        age: allPlayers[i].age,
        jersey: parseInt(allPlayers[i].jersey, 10),
        position: allPlayers[i].position.toLowerCase(),
        photo: allPlayers[i].photo,
        team: allPlayers[i].pro_team.toLowerCase(),
      };

      //   ! DO DATA TRANSFORMATIONS HERE

      // return createNewPlayer(player);
      createNewPlayer(player);
      // );
      // db.createPlayer(player);
      // db.createPlayer();
      // i += 1;
    }
  } catch (error) {
    console.error(error);
  }
};

const callApi = async () => {
  const apiData = await getApiData();
};

transformApiData(apiData);
// const filter =
// const playersWithAges = (listOfPlayers) => listOfPlayers.filter((player) => player.age != null);
// console.log('playersWithAges => ', playersWithAges[0]);

// playersWithAges(apiData);
console.log(apiData);
console.log('apiData type => ', typeof (apiData)); // object
console.log('apiData type => ', Array.isArray(apiData)); // false

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
