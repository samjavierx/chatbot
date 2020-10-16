'use strict';

const mongoose = require("mongoose");
const company = require('../model/company');

exports.processRequest = function(req,res){
    if(req.body.result.action == "companies"){
        getCompanies(req,res)
    }
    else{
        res.send("error")
    }
}


async function getCompanies(req,res)
{
    let parameters = req.body.result.parameters;
    let company_course = parameters.company_course;
    if (req.query.course != null && req.query.course !== '')
    {
        company_course = new RegExp(req.query.course,'i')
    }
    try {
        const companies = await (await company.find({course: company_course},{company_name: 1}))
        res.json(companies)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}