/* eslint-disable no-undef */
var express = require("express");
const booksRouter = express.Router();
var chalk = require('chalk');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadsService');

function router(nav) {
    const { getIndex, getById, middleware } = bookController(bookService, nav);
    //too aurotize user can navegate into the page once is log  persiste the login user
    booksRouter.use(middleware);
    booksRouter.route('/')
        .get(getIndex);


    booksRouter.route('/:id')
        .get(getById);
        
    return booksRouter;
}

module.exports = router;