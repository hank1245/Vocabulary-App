const asyncHandler = require('express-async-handler')
const Day = require('../models/dayModel')


const getDays = asyncHandler (async (req,res) => {
    const days = await Day.find({user: req.user.id})
    res.status(200).json(days)
})

const createDay = asyncHandler (async (req,res) => {
    const day = await Day.create({
        day: req.body.day,
        user: req.user.id
    })
    res.status(200).json({message: 'create Day'})
})

const deleteDay = asyncHandler (async (req,res) => {
    const day = await Day.findById(req.params.id)
    console.log(day)
    if(!day) {
        res.status(400)
        throw new Error('Word not found')
    }
    await day.remove()
    res.status(200).json({id: req.params.id})
})

const getOneDay = asyncHandler (async (req,res) => {
    const id = req.params.id
    const day = await Day.find({day: Number(id)})
    res.status(200).json(day)
})

module.exports ={
    getDays,createDay,deleteDay,getOneDay
}