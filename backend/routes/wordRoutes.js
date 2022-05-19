const express = require('express')
const router = express.Router()
const {getWords,createWord,deleteWord,updateWord} = require('../controllers/wordControllers')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getWords).post(protect,createWord)
router.route('/:id').delete(deleteWord).put(updateWord)

module.exports = router