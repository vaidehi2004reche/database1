const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db1');
const bodyParser =require('body-parser');  //to not get err in post request first install npm i body parser

const app = express();
app.use(express.json());
app.use(bodyParser.json()); //add this to in code 

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("Your node server is listening at 3000");
    });
    db = getDb();
  } else {
    console.error("Failed to connect to the database", err);
  }
});
app.get('/transitions', (req, res) => {
  db.collection('transitions')
    .find()
    .sort({ item: 1 })
    .toArray()
    .then((transitions) => {
      res.status(200).json(transitions);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Could not fetch the documents' });
    });
});

app.get('/transitions/:id', (req, res) => {
  const transitionId = req.params.id;

  if (ObjectId.isValid(transitionId)) {
    db.collection('transitions')
      .findOne({ _id: new ObjectId(transitionId) })
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


app.get('/transitions/:id', (req,res) => {
  try {
    const{skip,limit,search,quantity}=req.query;

    const data=UserModel.aggregate([
      {
        $match: {
         item:search,          

       },
      },
    ]);

    res.send({data});
  } catch (error) {
    console.log(error);
    res.send('Oop,something went wrong !!');
    
  }
});
