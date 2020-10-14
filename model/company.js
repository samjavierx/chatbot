//const { removeAllListeners } = require("nodemon");

const mongoose = require("mongoose");


const companySchema = new mongoose.Schema({
    company:{
        company_name : String,
        company_address : String,
        courses : [String]
    }
})

module.exports = mongoose.model('company', companySchema)
