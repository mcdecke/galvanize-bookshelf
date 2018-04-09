'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex')
const humps = require('humps')


// YOUR CODE HERE

router.get('/books', (req, res, next) => {
  knex('books')
    .orderBy('title')
    .then((x) => {
      let myobj = humps.camelizeKeys(x)
      // console.log('get sends back', myobj);
      res.json(myobj)
    })
    .catch((err => {
      next(err)
    }))
})

router.get('/books/:id', (req, res, next) => {
  knex('books')
    .where('id', req.params.id)
    .then((x) => {
      res.json(humps.camelizeKeys(x[0]))
    })
    .catch((err => {
      next(err)
    }))
})

router.post('/books', (req, res, next) => {
  knex('books')
    .insert(humps.decamelizeKeys({
      "title": req.body.title,
      "author": req.body.author,
      "genre": req.body.genre,
      "description": req.body.description,
      "cover_url": req.body.coverUrl
    }))
    .returning('*')
    .then((data) => {
      res.json(humps.camelizeKeys(data[0]))
    })
    .catch((err) => {
      console.log(err);
      next(err)
    })
})

router.patch('/books/:id', (req, res, next) => {
  knex('books')
    .where('id', req.params.id)
    .then((data) => {
      knex('books')
        .where('id', req.params.id)
        .limit(1)
        .update(humps.decamelizeKeys({
          "title": req.body.title,
          "author": req.body.author,
          "genre": req.body.genre,
          "description": req.body.description,
          "cover_url": req.body.coverUrl
        }))
        .returning('*')
        .then((data) => {
          res.json(humps.camelizeKeys(data[0]))
        })
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/books/:id', (req, res, next) => {
  knex('books')
    .where('id', req.params.id)
    .first()
    .then((x) => {
      if (!x) return next()
      knex('books')
        .del()
        .where('id', req.params.id)
        .then(() => {
          console.log(x);
          res.json(humps.camelizeKeys(x))
        })
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router;
