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
      const avgValue = average(groupedPlayers[key]);
      console.log(avgValue);
      groupedPlayers[value] = [avgValue];
      console.log(groupedPlayers[value] ^ 0);
      // ! flatten ages arrays into avg age
      // console.log({ [key]: groupedPlayers[value] ^ 0 });
      positionAges.push({ [key]: groupedPlayers[value] ^ 0 });
      console.log(positionAges);
      // console.log(average(groupedPlayers.G) ^ 0);
    }
    console.log(positionAges);
    return positionAges;

    // console.log(average(groupedPlayers.PG) ^ 0);
    // console.log(Array.isArray(groupedPlayers));
    // const positionKeys = Object.keys(groupedPlayers);
    // console.log(positionKeys);

    // // for (pos in positionKeys) {
    // positionKeys.forEach((pos) => {
    //   // console.log(average(positionKeys[pos]) ^ 0);
    //   // console.log(positionKeys[pos] ^ 0);
    //   console.log(positionKeys[pos]);
    //   console.log(pos);
    //   console.log(groupedPlayers[pos]);
    //   console.log(pos);
    //   // positionAges.push(Object.create({`${pos}`: (average(groupedPlayers[pos])^ 0)});
    //   const holder = {};
    //   // positionAges.push((holder[pos] = average(groupedPlayers[pos]) ^ 0));
    //   // positionAges.push((holder[pos] = average(positionKeys[pos]) ^ 0));
    //   // console.log(positionAges[0]);
    // });
    // console.log(Object.keys(groupedPlayers));

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

// console.log(positionAges);
const getApiData = async () => {
  try {
    const response = await fetch(nbaUrl);
    // const response = axios.get(nbaUrl);
    const json = await response.json();
    const allPlayers = json.body.players;
    //   console.log(json.body.players[0]); // ! first player in list
    const playerAvgs = await transformApiData(allPlayers);
    console.log(playerAvgs);
    // console.log(playerAvgs);
    // console.log(allPlayers.length);

    // for (let i = 0; i < allPlayers.length; i += 1) {
    playerAvgs;
    console.log(playerAvgs.includes('C'));
    playerAvgs.forEach((avg) => {
      avg;
      if (Object.keys(avg) == 'SG') {
        // console.log(avg);
        avg;
      }
    });

    console.log(Object.values(playerAvgs));
    console.log(Object.values(playerAvgs).includes('C'));
    console.log(Object.keys(playerAvgs).includes('C'));
    // console.log(Object.keys(playerAvgs) == 'SG');
    // console.log(Object.keys(playerAvgs.includes('SG')));

    // const checkKeyPresenceInArray = (key) => playerAvgs.some((obj) => Object.keys(obj).includes(key));

    // const isKeyPresent = checkKeyPresenceInArray('C');

    // console.log(isKeyPresent);

    // ! accept the player position... check the aplayerAvgs array and confirm the pposition ---then return theavg age
    const ageBox = [];
    console.log(playerAvgs);
    const j = playerAvgs.flat();
    console.log(j);
    let calcAvgAge = 0;
    const assignAvgPosValues = (playerPosition) => {
      // const checkKeyPresenceInArray = (key) => playerAvgs.some((obj) => Object.keys(obj).includes(key));
      playerAvgs.forEach((avg) => {
        // console.log(avg);
        // if (playerPosition == avg) {
        // if (Object.keys(avg) == playerPosition) {
        if (playerPosition == Object.keys(avg)) {
          console.log(playerPosition);
          console.log(avg);
          const avgAge = parseInt(Object.values(avg), 10);
          console.log(avgAge);
          // return avgAge;
          // return ageBox.avgAge;
          calcAvgAge = avgAge;
          return avgAge;
        }
        // return avgAge;
      });
      console.log(calcAvgAge);

      return calcAvgAge;
      // console.log(ageBox);
      // return ageBox;
      // if checkKeyPresenceInArray(playerPosition) {
      //   playerAvgs.playerPosition : 99;
      //   // return checkKeyPresenceInArray(playerPosition) ? playerAvgs.playerPosition : 99;
      //   return playerAvgs.playerPosition
      // }
      // else 99;
    };
    // const ageCount = (params) => 943;

    // console.log(assignAvgPosValues('G'));
    // console.log(assignAvgPosValues('PG'));
    // ? map incoming returned object of players to pgsql player object properties
    for (let i = 0; i < 30; i += 1) {
      const player = {
        firstName: allPlayers[i].firstname.toLowerCase(),
        lastName: allPlayers[i].lastname.toLowerCase(),
        playerId: allPlayers[i].id,
        age: allPlayers[i].age,
        jersey: parseInt(allPlayers[i].jersey, 10),
        photo: allPlayers[i].photo,
        position: allPlayers[i].position.toLowerCase(),
        team: allPlayers[i].pro_team.toLowerCase(),
        // avgPosAge: Object.keys(playerAvgs).select((pos) => allPlayers[i].position == pos),
        // avgPosAge: checkKeyPresenceInArray(allPlayers[i].position) ? playerAvgs[allPlayers[i].position] : 10000,
        // avgPosAge: assignAvgPosValues(allPlayers[i].position) ? 85 : 10000,
        avgPosAge: allPlayers[i].age && allPlayers[i].age ? assignAvgPosValues(allPlayers[i].position) : 9999,
        // avgPosAge: ageCount(allPlayers[i].position),
        // avgPosAge: playerAvgs.forEach((avg) => {
        // Object.keys(avg) == allPlayers[i].position ? avg : 100;
        // }),
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
