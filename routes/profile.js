const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require('../models/User')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get("/:id", ensureLoggedIn(), (req, res, next) => {

  res.render("user/profile");
});

// router.get('/form', (req, res, next) => {
//   res.render('forms/form');
// });






module.exports = router;