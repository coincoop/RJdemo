const Router = require('express')
const {createCar, getAllCar, getCarById} = require('../controllers/carController')

const houseRouter =Router();

houseRouter.post('/create-car',createCar )
houseRouter.get('/get-all-car',getAllCar)
houseRouter.get('/get-car/:_id',getCarById)

module.exports = houseRouter