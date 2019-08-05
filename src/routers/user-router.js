// jshint esversion: 8

const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middleware/auth');
const {sendWelcomeEmail} = require('../emails/account');
const {sendGoodbyeEmail} = require('../emails/account');
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload a photo.'));
    }
    cb(undefined, true);

  }
});
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
//  sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.cookie('auth_token', token);
    res.redirect('/tasks');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/users/login', urlencodedParser, async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.cookie('auth_token', token);
    res.redirect('/tasks');
  } catch(err) {
    res.status(400).send();
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch(err) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch(err) {
    res.status(500).send();
  }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
  const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();
  req.user.avatar = buffer;
  await req.user.save();
  res.send();
}, (error, req, res, next) => {
  res.status(400).send({error: error.message});
});

router.get('/users/me', auth, async (req, res) => {
  res.render('user', {
    name: user.req.name,
    email: user.req.email,
  });
});

// can be accessed by image tag etc
router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user || !user.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch(err) {
    res.status(400).send();
  }
});

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if(!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'});
  }
  try {
    updates.forEach((update) => req.user[update] = req.body[update]);
    await req.user.save();
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    sendGoodbyeEmail(req.user.email, req.user.name);
    await req.user.remove();
    res.send(req.user);
  } catch(err) {
    res.status(500).send();
    console.log(err.message);
  }
});

router.delete('/users/me/avatar', auth, async (req,res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

module.exports = router;
