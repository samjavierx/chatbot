'use strict';

const mongoose = require("mongoose");
const company = require('../model/company');

exports.processRequest = function(req,res){
    if(req.body.queryResult.action == "companies"){
        getCompanies(req,res)
    }
    else{
        res.send("error")
    }
}


async function getCompanies(req,res)
{
    let parameters = req.body.queryResult.parameters;
    let company_course = parameters.company_course;
    if (req.query.course != null && req.query.course !== '')
    {
        company_course = new RegExp(req.query.course,'i')
    }
    try {
        const companies = await (await company.find({course: company_course},{company_name: 1,company_address: 1, _id: 0}))
        const display = {fulfillmentText: "Here is the list of companies for " + company_course + " (Please input the full company name of your choice):\n"  + companies};
        res.send(JSON.stringify(display))
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

