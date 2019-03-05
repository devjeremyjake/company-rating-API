const User = require('../models/user');
const Company = require('../models/company');

exports.createCompany =async (req, res) => {

    if ( req.body.name === undefined || req.body.address === undefined || req.body.city === undefined || req.body.country === undefined || req.body.sector === undefined || req.body.website === undefined ){
        return res.status(200).json({ error: 'You cannot submit empty field'});
    }

    if ( req.body.name === '' || req.body.address === '' || req.body.city === ''|| req.body.country === '' || req.body.sector === '' || req.body.website === ''){
        return res.status(200).json({ error: 'You cannot submit empty field'});
    }

    const newCompany = new Company();
    newCompany.companyname = req.body.name;
    newCompany.address = req.body.address;
    newCompany.city = req.body.city;
    newCompany.country = req.body.country;
    newCompany.sector = req.body.sector;
    newCompany.website = req.body.website;
    newCompany.admin = req.body.userId;

    const company = await newCompany.save();

    return res.status(200).json({ message: 'Company created Successfully'});
}

exports.getAllCompanies = async (req, res) => {
    const results = await Company.find({}); 

    return res.status(200).json({result: results});
}