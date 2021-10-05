// const { Pool } = require('pg');
const fetch = require('node-fetch');
const axios = require('axios').default;

const nbaUrl = 'https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=basketball&response_format=JSON';

const postUrl = 'http://localhost:3000/api/v1/nba_players';

const createNewPlayer = async (importedPlayer) => {
  const response = await fetch(postUrl,
    {
      method: 'POST',
      body: JSON.stringify(importedPlayer),
      headers: { 'Content-Type': 'application/json' },
    });
};

const average = (ages) => {
  let sum = 0;
  let avg = 0;

  for (const num of ages) {
    sum += num;
    avg = sum / ages.length;
  }
  return avg;
};

const transformApiData = async (apiResponse) => {
  try {
    // await apiResponse;
    // for (p in apiResponse

    const playersWithAges = apiResponse.filter((player) => player.age != null);// && player.position != null);
    console.log(apiResponse.length);
    console.log(playersWithAges.length);
    console.log(playersWithAges[0].position);
    console.log(playersWithAges[0].age);

    function groupBy(objectArray, property) {
      return objectArray.reduce((acc, obj) => {
        const add = 0;
        const key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj.age);

        // console.log('yo ', average(acc[key]));
        return acc;
      },
      {});
    }
    // console.log(acc[0])

    const groupedPlayers = groupBy(playersWithAges, 'position');
    console.log(groupedPlayers);
    console.log(average(groupedPlayers.G));
    console.log(average(groupedPlayers.PG));
    console.log(average(groupedPlayers.SF));
    console.log(average(groupedPlayers.SG));
    console.log(average(groupedPlayers.C));
    console.log(average(groupedPlayers.F));
    // const cantShoot = groupedPlayers.map((position) => position);
    // const cantShoot = groupedPlayers.filter((position) => position !== 'SF');
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
    transformApiData(allPlayers);
    // console.log(allPlayers.length);

    // for (let i = 0; i < allPlayers.length; i += 1) {
    // ? map incoming returned object of players to pgsql player object properties
    for (let i = 0; i < 10; i += 1) {
      const player = {
        firstName: allPlayers[i].firstname.toLowerCase(),
        lastName: allPlayers[i].lastname.toLowerCase(),
        playerId: allPlayers[i].id,
        age: allPlayers[i].age,
        jersey: parseInt(allPlayers[i].jersey, 10),
        photo: allPlayers[i].photo,
        position: allPlayers[i].position.toLowerCase(),
        team: allPlayers[i].pro_team.toLowerCase(),
      };
      //   ! DO DATA TRANSFORMATIONS HERE
      createNewPlayer(player);
    }
  } catch (error) {
    console.error(error);
  }
};
const apiData = getApiData();

// const callApi = () => {
// console.log('HELLO');
// // const apiData = getApiData();
// getApiData().then((result) => {
//   console.log('WHYYYYYYYYY????'); // "Some User token"
//   console.log('result =>', result); // "Some User token"
// });
// console.log('HELLO AGAIN');
// console.log(apiData.result);
// console.log(Promise.all);
// console.log('Promise.all');
// };

// console.log(apiData);
// console.log();
// callApi();
// console.log(transformApiData(callApi()));
// console.log('apiData type => ', typeof (apiData)); // object
// console.log('apiData type => ', Array.isArray(apiData)); // false

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
