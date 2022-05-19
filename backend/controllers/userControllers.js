const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//@desc Register new User
//route Post /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
  
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please add all fields')
    }
  
    // Check if user exists
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })
  
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
//@desc  Authenticate User
//route POST /api/users/login
//@access Public
const loginUser = asyncHandler( async (req,res) => {
    const {email, password} = req.body
    //Check for User email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        const newToken = generateToken(user._id)
        res.json({
            _id: user.id,
            email: user.email,
            name: user.name,
            token: newToken
        })
        await User.findByIdAndUpdate(user._id, {token:newToken})
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

//Generate JWT 
const generateToken = (id) => {
    //making token
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

//@desc Get User Data
//route GET /api/users/me
//@access Private
const getMe = asyncHandler (async (req,res) => {
    res.status(200).json(req.user)
})

const logoutUser = asyncHandler( async(req,res) => {
    const user = await User.findByIdAndUpdate(req.user.id, {token:""})
    res.status(200).json({message: 'logout success'})
})



module.exports = { registerUser, loginUser, getMe, logoutUser }