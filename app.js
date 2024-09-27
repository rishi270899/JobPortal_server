const express = require('express')
const app = express()
const dotenv = require("dotenv")
const connectDB = require('./db/connectDB')
const api = require("./route/api");
const fileUpload = require("express-fileupload");
dotenv.config({path : ".env"})

//
app.use(express.json())

// Middleware for URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Temp files uploader
app.use(fileUpload({ useTempFiles: true }));

// route
app.use('/api',api)

// connect db
connectDB();

app.listen(process.env.PORT || 5000 , () => {
    console.log(`Server is running on port ${process.env.PORT || 5000} `)
})