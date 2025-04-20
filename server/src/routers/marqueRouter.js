const Router = require('express')
const {createMarque, getAllMarque} = require('../controllers/marqueController')
const {verifyToken} = require('../../middlewares/verifyToken');

const marqueRouter =Router();

marqueRouter.post('/create-marque',verifyToken,createMarque )
marqueRouter.get('/get-all-marque',getAllMarque )


module.exports = marqueRouter