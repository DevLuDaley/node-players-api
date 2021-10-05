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
    const positionAges = [];
    const groupedPlayers = groupBy(playersWithAges, 'position');
    console.log(groupedPlayers);
    // console.log(groupedPlayers.forEach((p) => p.position));
    for (const [key, value] of Object.entries(groupedPlayers)) {
      console.log(average(groupedPlayers.G) ^ 0);
      console.log(average(groupedPlayers.G));
      console.log(average(groupedPlayers[key]) ^ 0);

      // groupedPlayers[key] = average(groupedPlayers[key])^ 0)
      groupedPlayers[value] = average(groupedPlayers[key]);
    }
    // ! flatten ages arrays into avg age

    console.log(average(groupedPlayers.PG) ^ 0);
    console.log(Array.isArray(groupedPlayers));
    const positionKeys = Object.keys(groupedPlayers);
    console.log(positionKeys);

    // for (pos in positionKeys) {
    positionKeys.forEach((pos) => {
      // console.log(average(positionKeys[pos]) ^ 0);
      // console.log(positionKeys[pos] ^ 0);
      console.log(positionKeys[pos]);
      console.log(pos);
      console.log(groupedPlayers[pos]);
      console.log(pos);
      // positionAges.push(Object.create({`${pos}`: (average(groupedPlayers[pos])^ 0)});
      const holder = {};
      // positionAges.push((holder[pos] = average(groupedPlayers[pos]) ^ 0));
      // positionAges.push((holder[pos] = average(positionKeys[pos]) ^ 0));
      // console.log(positionAges[0]);
    });
    console.log(Object.keys(groupedPlayers));

    const showKeys = {};
    showKeys[Object.keys(groupedPlayers)] = Object.values(groupedPlayers);
    console.log(showKeys);

    console.log(average(groupedPlayers.C) ^ 0);
    console.log(average(groupedPlayers.PF) ^ 0);
    console.log(average(groupedPlayers.PG) ^ 0);
    console.log(average(groupedPlayers.SG) ^ 0);
    console.log(average(groupedPlayers.G) ^ 0);
    console.log(average(groupedPlayers.SF) ^ 0);
    console.log(average(groupedPlayers.F) ^ 0);
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
    const playerAvgs = transformApiData(allPlayers);
    // console.log(playerAvgs);
    // console.log(playerAvgs);
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
