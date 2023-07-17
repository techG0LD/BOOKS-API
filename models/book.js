//require mongoose
const mongoose = require('mongoose')
//creating shorthand for the schema constructor
const {Schema} = mongoose


//schema
const bookSchema = new Schema ({
    
    title: {type:String},
    description: {type:String},
    year: {type:Number},
    quantity: {type:Number},
    imageURL: {type:String}
})


const Book = mongoose.model('Book', bookSchema)
module.exports = Book