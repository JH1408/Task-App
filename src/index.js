// jshint esversion: 8

const express = require('express');

require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user-router');
const taskRouter = require('./routers/task-router');

const app = express();
const port = process.env.PORT||3000;

// app.use((req, res, next) => {
//   if(req.method === 'GET') {
//     res.send('GET requests are disabled.');
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send('Site is being maintained at the moment. Please try again soon.');
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
