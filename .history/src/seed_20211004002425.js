const { Pool } = require('pg');
const fetch = require('node-fetch');

const Player = require("./models/Player");

const pool = new Pool({
  user: 'nba_admin',
  host: 'localhost',
  database: 'sports_api',
  password: 'password',
  port: 5432,
});

let resultData;
const saveCounter = 0;

const nba_url = ['https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=basketball&response_format=JSON
>'];

url.map(async url => {
try{
   const response = await fetch(url);
   const json = await response.json();
   resultData = [...json];
   for (let i = 0; i < resultData.length; i++) {
      let player = new Player({
         name: resultData[i].name,
         description: resultData[i].status,
         location: { coordinates:      [resultData[i].polygon.coordinates[0][0][1] , resultData[i].polygon.coordinates[0][0][0]]}
      })

         player.save(() => {
      console.log("saved" + player)
      
      saveCounter++;
  
      if (saveCounter === resultData.length) {
         mongoose.disconnect()
         .then(() => console.log("saved succesfully and mongodb   disconnected"))
         .catch(error => console.log(error));
         }
      });
   }
} catch (error) {
   console.log(error);
}
})