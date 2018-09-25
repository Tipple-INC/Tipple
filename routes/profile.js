const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require('../models/User')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require("../config/cloudinary.js");


router.get("/:id", ensureLoggedIn(), (req, res, next) => {

  res.render("user/profile");
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