require('dotenv').load();
require('dotenv').config()
const mongoose = require("mongoose");
const Wine = require("../models/Wine");
var axios = require('axios')


mongoose
  .connect(process.env.DBURL, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

// let wines = [
//   {
//     "wineName": "Bodegas Muga, Prado Enea' Gran Reserva, Rioja",
//     "region": "Rioja",
//     "color": "Red",
//     "vintage": "2005",
//     "score": 93.84,
// },
// {
//     "wineName": "Torres, Salmos, Priorat",
//     "region": "Priorat",
//     "color": "Red",
//     "vintage": "2014",
//     "score": 91.65,
// },
// {
//     "wineName": "Numanthia, Termes, Toro",
//     "region": "Toro",
//     "color": "Red",
//     "vintage": "2004",
//     "score": 92.69,
// },
// {
//     "wineName": "La Rioja Alta, Gran Reserva 904, Rioja",
//     "region": "Rioja",
//     "color": "Red",
//     "vintage": "1997",
//     "score": 93.58,
// },
// {
//     "wineName": "Torres, Mas La Plana Cabernet Sauvignon, Penedes",
//     "region": "Penedes",
//     "color": "Red",
//     "vintage": "2012",
//     "score": 93.94,
// },
// {
//     "wineName": "Torres, Grans Muralles, Conca De Barbera",
//     "region": "Conca De Barbera",
//     "color": "Red",
//     "vintage": "2010",
//     "score": 92.64,
// },
// {
//     "wineName": "Bodegas Aalto, Ribera Del Duero",
//     "region": "Ribera Del Duero",
//     "color": "Red",
//     "vintage": "2014",
//     "score": 92.99,
// },
// {
//     "wineName": "Vega Sicilia, Tinto Valbuena 5, Ribera Del Duero",
//     "region": "Ribera Del Duero",
//     "color": "Red",
//     "vintage": "2012",
//     "score": 93.55,
// },
// {
//     "wineName": "Dominio De Pingus, Ribera Del Duero",
//     "region": "Ribera Del Duero",
//     "color": "Red",
//     "vintage": "2014",
//     "score": 98.83,
// },
// {
//     "wineName": "La Rioja Alta, Vina Ardanza Reserva, Rioja",
//     "region": "Rioja",
//     "color": "Red",
//     "vintage": "1985",
//     "score": 95.1,
// },
// {
//     "wineName": "La Rioja Alta, Vina Ardanza Reserva, Rioja",
//     "region": "Rioja",
//     "color": "Red",
//     "vintage": "1990",
//     "score": 93.33,
// }  
// ]
const token = "fasdfasdf"
const instance = axios.create({
    baseURL: 'https://api.globalwinescore.com',
    headers: {'Authorization': process.env.API_KEY}
  })

//   const api_key: process.env.API_KEY


Wine.deleteMany()
.then(() => instance.get('/globalwinescores/latest/?country=Spain'))
.then(response => {
    const info = response.data.results;
    return info.map(e => ({
        wineName: e.wine,
        region: e.appellation,
        color: e.color,
        vintage: e.vintage,
        rating: e.score
    }));
})
.then( wineData => {
    console.log(wineData)
    return Wine.create(wineData);
})
.then( wines => {
    console.log(`Created ${wines.length} wines in database`);
    mongoose.connection.close();
})
.catch(e => {
    console.log(e)
    mongoose.connection.close();
})


// .then(response => {
//   console.log(`${response.length} wines created with the following id:`);
//   console.log(response.map(u => u._id));
// })
// .then(() => {
//   // Close properly the connection to Mongoose
//   mongoose.disconnect()
// })
// .catch(err => {
//   mongoose.disconnect()
//   throw err
// })
