const mongoose = require('mongoose');
const connectDb=async () => {
  mongoose
    .connect('mongodb.//127.0.0.1:27017/express')
    .then(()=> console.log('Db connected successfully'))
    .catch((e) => {
      console.log(e);
    });
    try{
      await mongoose.connect('mongodb://localhost:27017/express')
      console.log('Db connected successfully');
    } catch(error){
        console.log(e);
    }

};
module.exports={connectDb};
