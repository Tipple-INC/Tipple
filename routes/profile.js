const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require('../models/User')
const Store = require('../models/Store')
const Quote = require('../models/Quote');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require("../config/cloudinary.js");
const GoogleMapsAPI = require("googlemaps");


function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/login')
    }
  }
}

const checkGuest  = checkRoles('GUEST');
const checkOwner = checkRoles('STOREOWNER');

router.get("/:id", ensureLoggedIn(), (req, res, next) => {
  
  User.findById(req.params.id)
  .populate('wishlist')
  .then(wines => {
    Quote.find({}).then(quotes=>{
      let random = Math.floor(Math.random() * Math.floor(quotes.length));
      let quote = quotes[random]
      const owner = (req.user.role == "STOREOWNER")
      res.render("user/profile", {wine: wines.wishlist, owner: owner,quote});
    })
  })
});

router.get('/:id/update', ensureLoggedIn(), (req, res, next) => {
    res.render("user/update")
});

router.post('/:id/update', ensureLoggedIn(), (req, res, next) => {
  const { username, email, password } = req.body;
  User.update({_id: req.params.id}, { $set: {username, email, password }}, { new: true })
  .then((user) => {
    res.redirect('/profile/:id')
  })
  .catch((error) => {
    console.log(error)
  })
});

//================== STORE INFORMATION ============================

router.get("/:id/store", ensureLoggedIn(), checkOwner, (req, res, next) => {
  const owner = req.params.id;
  Store.find({ownerID: owner})
  .then(shops => {
    res.render("user/store", {shops});
  })

});

router.get("/:id/store/create", ensureLoggedIn(), checkOwner, (req, res, next) => {
  res.render("user/storeCreate");
});

router.post('/:id/store/create', ensureLoggedIn(), (req, res, next) => {

  
  var publicConfig = {
    key: 'AIzaSyBWpcXiHEvP6IX3iEto4Ghz_O_-aiMiCJ8',
    stagger_time:       1000, // for elevationPath
    encode_polylines:   false,
    secure:             true, // use https
  };
  var gmAPI = new GoogleMapsAPI(publicConfig);
  
  const ownerID = req.params.id;
  const storename = req.body.storename;
  const direction1 = req.body.direction1;
  const direction2 = req.body.direction2;
  const city = req.body.city;
  const zip = req.body.zip;
  const address = `${storename}, ${direction1}, ${direction2}, ${city}, ${zip}`;
  const description = req.body.description;
  var geocodeParams = {
    "address":    address,
    // "components": "components=country:GB",
    // "bounds":     "55,-1|54,1",
    // "language":   "en",
  };
  
  getCoordinates = (( address, callback ) => {
  gmAPI.geocode(geocodeParams, function(err, result){
    var coordinates;
      console.log(result)
      lng = result.results[0].geometry.location.lng;
      lat = result.results[0].geometry.location.lat;
      coordinates = [lat, lng]
      callback(coordinates)
  });
  });

  const coordinates = getCoordinates(address, function(coordinates) {
    console.log(coordinates[0])

    if (ownerID === "" || storename === "" || direction1 === "" || city === "") {
      res.render("user/storeCreate", { message: "Please fill all fields" });
      return;
    }
  
    Store.findOne({$and: [{ storename }, {direction1}]}, "storename", (err, store) => {
      if (store !== null) {
        res.render("user/storeCreate", { message: "This store already exists" });
        return;
      }
  
      const newStore = new Store({
        ownerID,
        storename,
        direction1,
        direction2,
        city,
        zip,
        coordinates: [coordinates[0], coordinates[1]],
        description
      });
  
      newStore.save()
      .then(() => {
        res.redirect("/profile/:id/store");
      })
      .catch(err => {
        res.render("user/storeCreate", { message: "Something went wrong, please try again" });
      })
    });
   })



  
});


router.post("/uploadCloud", uploadCloud.single("photo"), (req, res, next) => { 
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  User.findByIdAndUpdate({_id: req.user.id}, {imgPath, imgName})
  .then (() => {
    res.redirect("/");
  })
});



// router.get('/form', (req, res, next) => {
//   res.render('forms/form');
// });






module.exports = router;