const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    companyname: {type: String},
    address: {type: String, default: ''},
    city: { type: String, default: ''},
    country: { type: String, default: ''},
    sector: { type: String, default: ''},
    website: { type: String, default: ''},
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    imageId: { type: String, default: ''},
    imageVersion: {type: String, default: ''}
});

module.exports = mongoose.model('Company', CompanySchema);