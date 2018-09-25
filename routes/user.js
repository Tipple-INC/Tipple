const express = require("express");
const passport = require('passport');
const router = express.Router();
const uploadCloud = require("../config/cloudinary.js");


 router.get('/profile', (req, res, next) => {
   res.render('user/profile');
});





module.exports = router;