const asyncHandler = require('express-async-handler')
const Word = require('../models/wordModel')
const url = require('url')


const getWords = asyncHandler (async (req,res) => {
    var queryData = url.parse(req.url, true).query
    const words = await Word.find({day: Number(queryData.day), user: req.user.id})
    res.status(200).json(words)
})

const createWord = asyncHandler (async (req,res) => {
    const day = await Word.create({
        kor: req.body.kor,
        eng: req.body.eng,
        isDone: req.body.isDone,
        day: req.body.day,
        user: req.user.id
    })
    res.status(200).json({day})
})

const deleteWord = asyncHandler (async (req,res) => {
    const word = await Word.findById(req.params.id)
    if(!word) {
        res.status(400)
        throw new Error('Word not found')
    }
    await word.remove()
    res.status(200).json({id: req.params.id})
})

const updateWord = asyncHandler (async (req,res) => {
    const word = await Word.findById(req.params.id)
    if(!word) {
        res.status(400)
        throw new Error('Word not found')
    }
    const updatedWord = await Word.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({updatedWord})
})


module.exports ={
    getWords,createWord,deleteWord,updateWord
}