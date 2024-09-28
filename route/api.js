const express = require("express")
const route = express.Router()
const userController = require("../controller/userController")
const checkAuth = require("../middleware/auth")

// User routes 
route.post("/userInsert" , userController.userInsert);
route.post("/userLogin" , userController.userLogin);
route.get("/userLogout" , userController.userLogout);
route.get("/getUserbyID/:id",checkAuth,userController.getUserbyID);
route.get("/getalluser",checkAuth,userController.getalluser);


module.exports = route;