const { User } = require('../../models')
const { Conflict } = require('http-errors')
const jwt = require('jsonwebtoken')
const { v4 } = require('uuid')

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    console.log(req.body)
    const user = await User.findOne({ email })

    if (user) {
      throw new Conflict('Already register')
    }
    const verificationToken = v4()
    const payload = {
      verificationToken,
    }
    const { SECRET_KEY } = process.env

    const token = jwt.sign(payload, SECRET_KEY)

    const newUser = new User({
      name,
      email,
      token,
    })
    console.log(newUser)
    newUser.setPassword(password)
    await newUser.save()

    res.status(201).json({
      status: 'success',
      code: 201,
      message: ' Success register',
      user: {
        name: newUser.name,
        email: newUser.email,
      },
      token: newUser.token,
    })
  } catch (error) {
    res.status(409).json(error.message)
  }
}
module.exports = signup
