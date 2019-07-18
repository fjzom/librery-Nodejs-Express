/* eslint-disable no-undef */
const express = require('express');
var chalk = require('chalk');
const { MongoClient } = require('mongodb');
const debug = require('debug');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {

    authRouter.route('/signUp')

        .post((req, resp) => {
            const { username, password } = req.body;
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';
            (async function addUser() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const col = db.collection('users');
                    const user = { username, password };

                    const results = await col.insertOne(user);
                    debug(results);

                    console.log(`INSIDE SIGNUP!!!!! ${chalk.green(results.ops[0].username)} `);


                    //create user
                    req.login(results.ops[0], () => {
                        resp.redirect('/auth/profile');
                    });
                } catch (err) { debug(err); }
            }());
            debug(req.body);
        });


    authRouter.route('/signin')

        .get((req, resp) => {

            resp.render('signin', {
                nav,
                title: 'Sign In'
            })
            console.log(` ${chalk.green('INSIDE SIGNIN')} `);
        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));


    authRouter.route('/profile')
        //to protect the rofile
        .all((req, resp, next) => {
            if (req.user) {
                next();
            } else {
                resp.redirect('/');
            }
        })
        .get((req, resp) => {
            //resp.json(req.user);
            resp.send('profile')
        });
    return authRouter;
}

module.exports = router;