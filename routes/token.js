'use strict';

const express = require('express');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const knex = require('knex')
const bcrypt = require('bcrypt')
// const KEY = process.env.KEY

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.get('/token', (q, s, _) => {
  if (q.cookies) {
    s.json(false)
  }
  // else(!q.cookies){
  //   s.json(true)
  // }
})

router.post('/token', (q, s, _) => {

  knex('users')
    .select('email', 'hashed_password')
    .where('email', q.body.email)
    .then((users) => {
      let foundUser = users[0]

      let {
        id,
        hashed_password,
        email
      } = foundUser

      bcrypt.compare(q.body.password, hashed_password, (err, result) => {
        // if(this.compare == true){
        let token = jwt.sign({
          email: q.body.email
        }, shh)
        console.log(token);
        // })
      })
    })
})

module.exports = router;
