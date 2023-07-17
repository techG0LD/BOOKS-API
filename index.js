const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT;
const mongoose = require('mongoose')


const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to Mongo Successfully');
        })
        .catch(err => {
            console.error('Failed to connect to Mongo: ' + err);
        });
}




app.use(express.json())
app.use(cors())

app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })

app.get('/',(req,res) => {
    res.send('ayyy')
})


//Controller ROUTES
const booksController = require('./books-controller.js')
app.use('/books',booksController)

connectToMongo()

app.listen(PORT,function(){
    console.log(`http://localhost:${PORT}`)
})