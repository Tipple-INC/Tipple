const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const uploadCloud = require('../../config/cloudinary.js');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const ImagePost = require('../../models/imagePost.js');


router.get('/postImage', ensureLoggedIn('/login'), (req, res) => {
  res.render('social/postImage');
});

router.post('/postImage', uploadCloud.single('photo'), (req, res, next) => {
  const wineName = req.body.wineName;
  const vintage = req.body.vintage;
  const region = req.body.region;
  const score = req.body.score;
  const username = req.user.username;
  if(req.file) {
    const picPath = req.file.url;
    const picName = req.file.originalname;
    const newPost = new ImagePost({wineName, vintage, region, score, username, picPath, picName});
    newPost.save()
    .then(wine => {
      res.redirect('/social/wines')
    })
    .catch(error => {
      console.log(error)
    })
  } else {
    const newPost = new ImagePost({wineName, vintage, region, score, username});
    newPost.save()
    .then(wine => {
      res.redirect('/social/wines')
    })
    .catch(error => {
      console.log(error)
    })
  }
});


module.exports = router;