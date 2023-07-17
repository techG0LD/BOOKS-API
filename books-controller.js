const express = require('express')
const books = express.Router();

const db = require('./models')  

books.get('/seed', (req, res) => {
    db.Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})


//GET index page /books
books.get('/', (req,res) => {
    db.Book.find()
    .then(foundBooks => {
        res.json(foundBooks)
    })
    .catch (err => {
        console.log(err)
        res.send('error404')
    })
})

//GET show page /books
books.get('/:id', (req,res) => {
    // res.send('hi')  testing route
    db.Book.findById(req.params.id)
        .then(book => {
             res.json(book)  
        })
        .catch(err => {
            console.log( err)
            res.send('error404')
        })
})

//PUT/PATCH ROUTE
books.put('/:id',(req,res)=>{
    db.Book.findByIdAndUpdate(req.params.id, req.body)
        .then(book => {
             res.json(book)  
        })
        .catch(err => {
            console.log( err)
            res.send('error404')
        })
    // res.json('ou made it')
})

books.delete('/:id', (req,res) =>{
    db.Book.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(303).redirect('/books')
    })
    // res.send('oh you deleted')
})

//NEW BOOK
books.post('/',(req,res) => {
    db.Book.create(req.body)
    .then(() => {
       res.redirect('/books') 
    })
    // res.send('neew book')
})


module.exports = books