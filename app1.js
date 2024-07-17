const express = require('express');
const bodyParser = require('body-parser');
const { connectToDb, getDb } = require('./db1');
const UserModel = require('./models/user');
const { generatePassword } = require('./config/utils');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

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

app.get('/user', (req, res) => {
  db.collection('user')
    .find()
    .sort({ item: 1 })
    .toArray()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Could not fetch the documents' });
    });
});

app.post('/user', async (req, res) => {
  try {
    req.body.password = generatePassword(req.body.password);
    await UserModel.create(req.body);
    res.send({ message: 'User added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Oops, something went wrong!!');
  }
});




