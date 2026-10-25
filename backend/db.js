const mongoose = require('mongoose')

const connectToMongo = async ()=> {
const mongoURI = process.env.MONGO_URI;    

if (!mongoURI) {
    throw new Error('MONGO_URI is not configured');
  }

await mongoose.connect(mongoURI)
    console.log('connected to Mongo Successfully');
}
 
module.exports = connectToMongo;