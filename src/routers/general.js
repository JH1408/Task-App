// jshint esversion: 9

const express = require('express');
const hbs = require('hbs');
const router = new express.Router();

router.get('/', (req,res) => {
  res.render('index');
});

router.get('/users/login', (req,res) => {
  res.render('login');
});

router.get('/users', (req,res) => {
  res.render('register');
});

router.get('*', (req, res) => {
  res.render('404');
});

module.exports = router;
