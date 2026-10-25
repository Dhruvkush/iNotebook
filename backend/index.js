const express = require('express');
const connectToMongo = require('./db');
var cors = require('cors')
require('dotenv').config();

connectToMongo();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth',require('./routes/auth'))   //  routes/auth.js se jo router export hua hai usko use karo, aur us router ke sabhi routes ke aage /api/auth prefix laga do.
app.use('/api/notes',require('./routes/notes'))

app.listen(port, '0.0.0.0', () => {
  console.log(`iNotebook backend listening on port ${port}`)
})

