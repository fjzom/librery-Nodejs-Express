
/* eslint-disable no-undef */
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug');
var chalk = require('chalk');
function bookController(bookService, nav) {

   

    function middleware(req, resp, next) {
        // if (req.user) {
        next();
        // } else {
        //      resp.redirect('/')
        //  }
    }
    function getIndex(req, resp) {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        console.log(`INSIDE getIndex!!!!! ${chalk.green('TEST')} `);
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url, { useNewUrlParser: true });
                console.log(`${chalk.green('Connected correctly to server')} `);

                const db = client.db(dbName);
                const col = await db.collection('books');
                const books = await col.find().toArray();
                resp.render('books', {
                    nav,
                    title: 'Librery',
                    books
                });
            } catch (err) {
                debug(err.stack);
            }
            if (client)
                client.close();
        }());

    }
    function getById(req, resp) {

        let { id } = req.params;
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        console.log(`INSIDE getById!!!!! ${chalk.green(id)} `);
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url, { useNewUrlParser: true });
                debug('Connected correctly to server');

                const db = client.db(dbName);
                const col = await db.collection('books');
                const book = await col.findOne({ _id: new ObjectID(id) }, { useNewUrlParser: true });

                console.log(`INSIDE bookId!!!!! ${chalk.green(book.bookId)} `);
                book.details = await bookService.getBookById(book.bookId);
                resp.render('bookView', {
                    nav,
                    title: 'Librery',
                    book
                });
            } catch (err) { debug(err.stack); }

        }());

    }

    /*
    booksRouter.route('/:id')
            .get((req, resp) => {
    
                let { id } = req.params;
                const url = 'mongodb://localhost:27017';
                const dbName = 'libraryApp';
    
                (async function mongo() {
                    let client;
                    try {
                        client = mongoClient.connect(url);
                        debug('Connected correctly to server');
    
                        const db = client.db(dbName);
    
                        const col = await db.collection('books');
    
                        const book = await col.findOne({ _id: new ObjectID(id) });
    
                        resp.render('book', {
                            nav,
                            title: 'Librery',
                            book
                        });
                    } catch (err) { debug(err.stack); }
     
                }());
    
            });
    */
    return {
        getIndex,
        getById,
        middleware
    };
}

module.exports = bookController;