/* eslint-disable no-undef */
const { MongoClient } = require('mongodb');
const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug');
var chalk = require('chalk');

module.exports = function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'

    }, (username, password, done) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        (async function mongo() {
            let client;
            console.log(` ${chalk.green('INSIDE local.strategy' + username)} `);
            try {
                client = await MongoClient.connect(url, { useNewUrlParser: true });
                const db = client.db(dbName);
                const col = db.collection('users');
                const user = await col.findOne({ username });

                console.log(user.password + " " + password);
                if (user.password === password) {
                    done(null, user);
                } else {
                    done(null, false);
                }

            } catch (err) {
                console.log(err.stack);
            }
            client.close();
        }());
    }));
}