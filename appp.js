const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db2');
const mongoose =require('mongoose');
const app = express();
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


app.get('/course/:courseId/student', async (req, res) => {
  const courseId = req.params.courseId;

//if (!ObjectId.isValid(courseId)) {
  // db.collection('course')
   //return res.status(400).json({ error: 'Invalid course ID' });
// }

  try {
    const course = await db.collection('course').findOne({ _id: new ObjectId(courseId) });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const courseIds = course.studentIds;

    const student = await db.collection('student').find(
      { _id: { $in: courseIds.map(id => new ObjectId(id)) } },
      { projection: { name: 1, age: 1 } }
    ).toArray();

    res.status(200).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch the students' });
  }
});

       
     