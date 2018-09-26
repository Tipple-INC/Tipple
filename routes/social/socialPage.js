const express = require("express");
const passport = require('passport');
const User = require("../../models/User");
const Wine = require("../../models/Wine")
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get('/wines', (req, res, next) => {

  Wine.find()
  .then(wines => {
    // console.log(wines)
    res.render('social/social', {wines})
  });

});

router.post('/wishlist', ensureLoggedIn(), (req, res, next) => {

  Wine.findOne({'_id': req.body.wineID})
    .then(wine => {
      User.findByIdAndUpdate({_id: req.user.id}, {$push: {wishlist: wine }})
      .then((response) => {
        res.redirect('/social/wines')
      })
      .catch((error) => {
        console.log(error)
      })
    })
    .catch(error => {
      console.log(error)
    })
});






module.exports = router;
