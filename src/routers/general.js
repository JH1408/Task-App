// jshint esversion: 9

const express = require('express');
const router = new express.Router();

router.get('/', (req,res) => {
  res.render('index');
});

router.get('/users/login', (req,res) => {
  res.render('login', {
    message: ''
  });
});

router.get('/users/register', (req,res) => {
  res.render('register', {
    message: ''
  });
});

router.get('*', (req, res) => {
  res.render('404');
});

module.exports = router;
