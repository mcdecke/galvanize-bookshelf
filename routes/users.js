'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const knex = require('../knex')
const humps = require('humps')

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/users', (q, s, _) => {
  const hashedPassword = bcrypt.hashSync(q.body.password, 5)
    knex('users')
      .insert(humps.decamelizeKeys({
        "email": q.body.email,
        "first_name": q.body.firstName,
        "last_name": q.body.lastName,
        "hashed_password": hashedPassword
      }))
      .returning(['id','email', 'first_name', 'last_name'])
      .then((data) => {
        s.json(humps.camelizeKeys(data[0]))
      })
      .catch((err) => {
        console.log(err);
        _(err)
      })
})


module.exports = router;
