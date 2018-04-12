'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/bookshelf_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/bookshelf_test'
  },

  production: {
    client: 'pg',
    connection: 'postgres://gggxayhttdlulo:042cc2a1c3f1431bfc1ef8696f96282a70450868b53899fa7bbf5fd284a0eb61@ec2-54-83-1-94.compute-1.amazonaws.com:5432/dct8ttv1s4po6r'
  }
};
