'use strict';

const express = require('express');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const knex = require('../knex')
const bcrypt = require('bcrypt')
const humps = require('humps')
const saltRounds = 5;
const KEY = process.env.KEY

// const { promisify } = require('util');
// const signAsync = promisify(jwt.sign);
// const verifyAsync = promisify(jwt.verify);

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.get('/token', (q, s, _) => {
  if (q.cookies['/token']) {
    s.json(true)
  } else {
    s.json(false)
  }
})

router.post('/token', (q, s, _) => {
  knex('users')
    .select('email', 'hashed_password', 'first_name', 'last_name', 'id')
    .where('email', q.body.email)
    .then((users) => {
        if(users[0] == undefined){
          s.setHeader('content-type', 'text/plain')
          s.status(400).send('Bad email or password')
        }
      bcrypt.compare(q.body.password, users[0].hashed_password, (err, result) => {
        if (result) {
          let token = jwt.sign({
            'userId': q.body.id,
            'email': q.body.email,
            'hashed_password': users[0].hashed_password
          }, KEY)
          s.cookie('/token', token, {
            httpOnly: true
          })
          const resp = humps.camelizeKeys({
            'first_name': users[0].first_name,
            'last_name': users[0].last_name,
            'email': users[0].email,
            'id': users[0].id
          })
          s.json(resp)
        } else {
          s.setHeader('content-type', 'text/plain')
          s.status(400).send('Bad email or password')
        }
      })
    })
})

router.delete('/token', (q, s, _) => {
  s.cookie('/token', '', -1)
  s.json(200)
})


module.exports = router;
