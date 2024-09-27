const express = require("express")
const route = express.Router()
const userController = require("../controller/userController")

// User routes 
route.post("/userInsert" , userController.userInsert)



module.exports = route;