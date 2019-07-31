// jshint esversion:8
require('dotenv').config({ path: './.env.test' });
const request = require('supertest');
const app = require('../src/app');
const User = require('..src/models/user');

const userOne = {
  name: 'Ray',
  email: 'ray@example.com',
  password: '1234567'
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test('Should signup a new user', async () => {
  await request(app).post('/users').send({
    name: 'Josy',
    email: 'josy@example.com',
    password: '1234567'
  }).expect(201);
});
