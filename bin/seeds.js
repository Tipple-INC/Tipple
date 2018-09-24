// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/tipple', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
{
    "wineName": "Bodegas Muga, Prado Enea' Gran Reserva, Rioja",
    "region": "Rioja",
    "color": "Red",
    "vintage": "2005",
    "score": 93.84,
},
{
    "wineName": "Torres, Salmos, Priorat",
    "region": "Priorat",
    "color": "Red",
    "vintage": "2014",
    "score": 91.65,
},
{
    "wineName": "Numanthia, Termes, Toro",
    "region": "Toro",
    "color": "Red",
    "vintage": "2004",
    "score": 92.69,
},
{
    "wineName": "La Rioja Alta, Gran Reserva 904, Rioja",
    "region": "Rioja",
    "color": "Red",
    "vintage": "1997",
    "score": 93.58,
},
{
    "wineName": "Torres, Mas La Plana Cabernet Sauvignon, Penedes",
    "region": "Penedes",
    "color": "Red",
    "vintage": "2012",
    "score": 93.94,
},
{
    "wineName": "Torres, Grans Muralles, Conca De Barbera",
    "region": "Conca De Barbera",
    "color": "Red",
    "vintage": "2010",
    "score": 92.64,
},
{
    "wineName": "Bodegas Aalto, Ribera Del Duero",
    "region": "Ribera Del Duero",
    "color": "Red",
    "vintage": "2014",
    "score": 92.99,
},
{
    "wineName": "Vega Sicilia, Tinto Valbuena 5, Ribera Del Duero",
    "region": "Ribera Del Duero",
    "color": "Red",
    "vintage": "2012",
    "score": 93.55,
},
{
    "wineName": "Dominio De Pingus, Ribera Del Duero",
    "region": "Ribera Del Duero",
    "color": "Red",
    "vintage": "2014",
    "score": 98.83,
},
{
    "wineName": "La Rioja Alta, Vina Ardanza Reserva, Rioja",
    "region": "Rioja",
    "color": "Red",
    "vintage": "1985",
    "score": 95.1,
},
{
    "wineName": "La Rioja Alta, Vina Ardanza Reserva, Rioja",
    "region": "Rioja",
    "color": "Red",
    "vintage": "1990",
    "score": 93.33,
}
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})