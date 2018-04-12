'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex')
const humps = require('humps')
const jwt = require('jsonwebtoken')


const auth = function(q, s, _) {
  jwt.verify(q.cookies['/token'], process.env.KEY, (err, payload) => {
    if (err) {
      return _(s.json(401))
    }
    q.body = payload
    _()
  })
}

router.get('/favorites', (q, s, _) => {

  knex('favorites')
    .innerJoin('books', 'books.id', 'favorites.book_id')
    .then((x) => {
      let myobj = humps.camelizeKeys(x)
      // console.log('get sends back', myobj);
      s.json(myobj)
    })
    .catch((err => {
      _(err)
    }))
})

router.get('/favorites/check', auth, (q, s, _) => {
  console.log(q.body);
  knex('books')
    .innerJoin('favorites', 'favorites.book_id', 'books.id')
    .where({
      'favorites.book_id': Number.parseInt(q.query.bookId),
      'favorites.user_id': q.body.userId
    })
    .first()
    .then((x) => {
      if (x) {
        return s.send(true)
      }
      s.send(false)
    })
    .catch((err => {
      _(err)
    }))
})

router.delete('/favorites', auth, (q, s, _) => {
  const bookId = Number.parseInt(q.body.bookId);

  let favorite;

  knex('favorites')
    .where(humps.camelizeKeys({
      book_id: bookId,
      user_id: q.body.userId
    }))
    .first()
    .then((x) => {
      if (!x) {
        s.json({
          status: 404,
          error: 'Favorite not found'
        });
      }

      favorite = humps.camelizeKeys(row);

      return knex('favorites')
        .del()
        .where('id', favorite.id);
    })
    .then(() => {
      delete favorite.id;

      s.send(favorite);
    })
    .catch((err) => {
      _(err);
    });
});

module.exports = router;
