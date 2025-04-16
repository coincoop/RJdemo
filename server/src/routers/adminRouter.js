const Router = require("express");
const { getAllUser } = require('../controllers/adminCustomerController');
const { getAllProduct } = require("../controllers/adminProductController");
const {verifyToken} = require('../../middlewares/verifyToken');
const { getAllCarts } = require("../controllers/adminCartController");

const adminRouter = Router();

adminRouter.get('/customers',verifyToken ,getAllUser)
adminRouter.get('/products',verifyToken ,getAllProduct)
adminRouter.get('/carts', verifyToken, getAllCarts)

module.exports = adminRouter;