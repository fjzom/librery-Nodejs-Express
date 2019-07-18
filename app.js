/* eslint-disable no-undef */
var express = require("express");
var chalk = require('chalk');
var debug = require('debug')('app');
var morgan = require('morgan');
var path = require('path');
var app = express();
var bodyParser = require('body-parser'); 
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.disable('etag');
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(session({secret: 'librery' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('css', express.static(path.join(__dirname, '/node_modules/boostrap/dist/css')));
app.use('js', express.static(path.join(__dirname, '/node_modules/boostrap/dist/js')));
app.use('js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.engine('pug', require('pug').__express);
app.set('views', './src/views');
//app.set('view engine', 'pug'); 
app.set('view engine', 'ejs');

const nav = [
    { link: '/books', titles: 'Books' },
    { link: '/authors', titles: 'Authors' }
];
const booksRouter = require('./src/routers/booksRouter')(nav);
const adminRouter = require('./src/routers/adminRoutes')(nav);
const authRouter = require('./src/routers/authRoutes')(nav);
app.use('/books', booksRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.get('/', (req, resp) => {
    resp.render('index', {
        nav,
        title: 'Librery'
    });
});

/*app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html') );
})*/



app.listen(3000, function () {
    debug(`listen info in port ${chalk.green('3000')} `);
    console.log(`listen info on port ${chalk.green('3000')} `);
});
