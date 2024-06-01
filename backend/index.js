const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb+srv://OpenCSame:PfvEiZAwoBI5eM3c@opencsame.frnarkw.mongodb.net/?retryWrites=true&w=majority&appName=OpenCSame')
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })
    })
    .catch((e) => {
        console.log('Connection failed', e)
    })