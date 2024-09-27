const { error } = require("console");
const mongoose = require("mongoose")

const connectDB = () => {
    return mongoose.connect(process.env.DB_LIVE)
    .then((data) => {
        console.log(`Connected with mongodb live database`);

        
    })
    .catch((error)=> {
        console.log(error);
        
    })
}

module.exports = connectDB