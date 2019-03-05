const express = require('express');
const router = express.Router();
const companyCtrl = require('../controllers/companyCtrl');

router.get('/companies/all', companyCtrl.getAllCompanies);
router.post('/company/create', companyCtrl.createCompany);

module.exports = router;