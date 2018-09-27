const express = require("express");
const passport = require('passport');
const User = require("../models/User");
const Store = require("../models/Store");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get('/', (req, res, next) => {

  Store.find()
  .then(stores => {
    
    res.render('stores/wineStores', {stores})
  });
});

router.get('/:id', (req, res, next) => {

Store.findById(req.params.id)
.then(store => {

  res.render('stores/store', {store})
})
    
  });




module.exports = router;
