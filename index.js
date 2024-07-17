const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');
const bodyParser =require('body-parser');  //to not get err in post request first install npm i body parser

const app = express();
app.use(express.json());
app.use(bodyParser.json()); //add this to in code 

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(4000, () => {
      console.log("Your node server is listening at 4000");
    });
    db = getDb();
  } else {
    console.error("Failed to connect to the database", err);
  }
});

app.get('/books', (req, res) => {
  db.collection('books')
    .find()
    .sort({ author: 1 })
    .toArray()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Could not fetch the documents' });
    });
});

app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;

  if (ObjectId.isValid(bookId)) {
    db.collection('books')
      .findOne({ _id: new ObjectId(bookId) })
      .then((doc) => {
        if (doc) {
          res.status(200).json(doc);
        } else {
          res.status(404).json({ error: 'Document not found' });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Could not fetch the document' });
      });
  } else {
    res.status(400).json({ error: 'Invalid document ID' });
  }
});

app.post('/books', (req, res) => {
  const newBook = req.body;

  db.collection('books')
    .insertOne(newBook)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Could not create a new document' });
    });
});

//app.get('/transitions',async (req,res) => {
  //try {
   // const{skip,limit,search}=req.query;

    //const data=await UserModel.aggregate([
     // {
       // $match: {
        //  item:search,
       //},
      //},
    //]);

    //res.send({data});
  //} catch (error) {
   // console.log(error);
    //res.send('Oop,something went wrong !!');
    
  //}
//});




