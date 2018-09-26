const express = require("express");
const passport = require('passport');
const User = require("../../models/User");
const Wine = require("../../models/Wine");
const ImagePost = require ("../../models/ImagePost");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get('/news', (req, res, next) => {

  ImagePost.find()
  .then(posts => {
    
    res.render('social/news', {posts})
  });
});


router.get('/wines', (req, res, next) => {

  Wine.find()
  .then(wines => {
    // console.log(req.user.wishlist);
    const processedWines = wines.map(wine => {
      let winebox = {
        isWished: false,
        wine:wine
      }
      // console.log('========================', wine._id)
      if(req.user.wishlist.map(obid => obid.toString()).includes(wine._id.toString())){
        winebox.isWished = true;
        // console.log('========================hello!')
      }
      return winebox;
    })
    // console.log("hello");
    // console.log(processedWines);
    res.render('social/social', {wished: processedWines})
  })

});

router.post('/wishlist', ensureLoggedIn(), (req, res, next) => {

  // Wine.findOne({'_id': req.body.wineID})
  //   .then(wine => {
      User.findByIdAndUpdate({_id: req.user.id}, {$push: {wishlist: req.body.wineID }})
      .then((response) => {
        res.redirect('/social/wines')
      })
      .catch((error) => {
        console.log(error)
      })
});






module.exports = router;
