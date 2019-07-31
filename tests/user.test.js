// jshint esversion:8

const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Ray',
  email: 'ray@example.com',
  password: '1234567',
  tokens: [{
    token: jwt.sign({_id: userOneId}, process.env.SECRET)
  }]
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Josy',
      email: 'josy@example.com',
      password: '1234567'
    })
    .expect(201);
  //Assertions that DB was changed successfully
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  // Assertions about response
  expect(response.body).toMatchObject({
    user: {
      name: 'Josy',
      email: 'josy@example.com',
    },
    token: user.tokens[0].token
  });
  expect(user.password).not.toBe('1234567');
});

test('Should login existing user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexistent user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'oliver@example.com',
      password: '1234567'
    })
    .expect(400);
});

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get profile for unauthorized user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

test('Should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test('Should not delete account for unauthorized user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});
