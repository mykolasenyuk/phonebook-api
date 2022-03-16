const { User } = require('../../models')
const jwt = require('jsonwebtoken')
const { NotFound } = require('http-errors')

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    // console.log(user)
    if (!user || !user.comparePassword(password)) {
      throw new NotFound('Email or password is wrong')
    }
    const { _id } = user
    const payload = {
      _id,
    }

    const { SECRET_KEY } = process.env

    const token = jwt.sign(payload, SECRET_KEY)
    // console.log(token)

    const updUser = await User.findByIdAndUpdate(user._id, { token })

    res.json({
      status: '✔️ Success',
      code: 201,
      user: {
        name: updUser.name,
        email: updUser.email,
      },
      token,
    })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = login
