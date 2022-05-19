const express = require('express')
const router = express.Router()
const {getDays,createDay,deleteDay,getOneDay} = require('../controllers/daysControllers')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getDays).post(protect,createDay)

router.route('/:id').delete(protect,deleteDay).get(protect,getOneDay)

module.exports = router