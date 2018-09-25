const express = require("express");
const passport = require('passport');
const router = express.Router();
const uploadCloud = require("../config/cloudinary.js");


 router.get('/profile', (req, res, next) => {
   res.render('user/profile');
});

router.post('/profile', uploadCloud.single('photo'), (req, res, next) => {
  const { title, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newMovie = new Movie({title, description, imgPath, imgName})
  newMovie.save()
  .then(movie => {
    res.redirect('/')
  })
  .catch(error => {
    console.log(error)
  })
});





module.exports = router;