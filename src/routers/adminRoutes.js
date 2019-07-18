/* eslint-disable no-undef */
var express =  require("express");
const mongoClient = require('mongodb');
var debug = require('debug')('app:adminRoutes');
const adminRouter = express.Router();

const books = [
    {
        title: "Diario de una Pasion",
        genere: "Romance",
        author: "Nicholas Sparks",
        bookId: 656,
        read: false
    },
    {
        title: "Big Fish",
        genere: "fiction",
        author: "Tim",
        bookId:  24280,
        read: false
    },
    {
        title: "Alejandria",
        genere: "literatura",
        author: "X",
        read: false
    },
    {
        title: "LAD",
        genere: "TEST",
        author: "TEST",
        read: false
    }
]
function router(nav){

    adminRouter.route('/')
    .get((req, resp) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function mongo(){
            let client;
            try{
                client = await mongoClient.connect(url);
                debug('Connected correctly to server');

                const db = client.db(dbName);

                const response = await db.collection('books').insertMany(books);
                resp.json(response);
            }catch(err){
                debug(err.stack);
            }
            client.close();
        }()); 
    });
    return adminRouter;
}

module.exports = router;