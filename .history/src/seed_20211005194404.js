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

        return acc;
      },
      {});
    }
    const positionAges = [];
    const groupedPlayers = groupBy(playersWithAges, 'position');
    for (const [key, value] of Object.entries(groupedPlayers)) {
      const avgValue = average(groupedPlayers[key]);
      console.log(avgValue);
      groupedPlayers[value] = [avgValue];
      // ! flatten ages arrays into avg age

      positionAges.push({ [key]: groupedPlayers[value] ^ 0 });
    }

    return positionAges;
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
    const playerAvgs = await transformApiData(allPlayers);

    // ! accept the player position... check the playerAvgs array and confirm the position ---then return the avgAge
    let calcAvgAge = 0;
    const assignAvgPosValues = (playerPosition) => {
      playerAvgs.forEach((avg) => {
        if (playerPosition == Object.keys(avg)) {
          const avgAge = parseInt(Object.values(avg), 10);
          calcAvgAge = avgAge;
          return avgAge;
        }
      });
      return calcAvgAge;
    };

    // ? map incoming returned object of players to pgsql player object properties
    for (let i = 0; i < 100; i += 1) {
      const player = {
        firstName: allPlayers[i].firstname.toLowerCase(),
        lastName: allPlayers[i].lastname.toLowerCase(),
        playerId: allPlayers[i].id,
        age: allPlayers[i].age,
        jersey: parseInt(allPlayers[i].jersey, 10),
        photo: allPlayers[i].photo,
        position: allPlayers[i].position.toLowerCase(),
        team: allPlayers[i].pro_team.toLowerCase(),
        avgPosAge: allPlayers[i].age && allPlayers[i].position ? assignAvgPosValues(allPlayers[i].position) : null,
      };
      //   ! DO DATA TRANSFORMATIONS HERE
      createNewPlayer(player);
    }
  } catch (error) {
    console.error(error);
  }
};
const apiData = getApiData();
