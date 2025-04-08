const Router = require('express')
const {createCar, getAllCar} = require('../controllers/carController')

const houseRouter =Router();

houseRouter.post('/create-car',createCar )
houseRouter.get('/get-all-car',getAllCar)

module.exports = houseRouter