const Router = require('express')
const { createInvoice } = require('../controllers/invoiceController')

const invoiceRouter =Router();

invoiceRouter.post('/create-invoice',createInvoice )


module.exports = invoiceRouter