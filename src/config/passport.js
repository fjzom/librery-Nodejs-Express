/* eslint-disable no-undef */
const passport =  require('passport');
var chalk = require('chalk');

require('./strategies/local.strategy')();

module.exports = function passportConfig(app){
    app.use(passport.initialize());
    app.use(passport.session());

    //store user in session
    passport.serializeUser((user, done) => {
        console.log(` ${chalk.green('INSIDE serializeUser')} `);
        done(null, user); 
    });
    //store user for session
    passport.deserializeUser((user, done) => {
        console.log(` ${chalk.green('INSIDE deserializeUser')} `);
        done(null, user);
    });
};