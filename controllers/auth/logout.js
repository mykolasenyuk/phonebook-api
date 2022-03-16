const { User } = require('../../models')

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user

    await User.findByIdAndUpdate(_id, { token: null })

    res.json({
      status: 'success',
      code: 204,
      message: 'Logout',
    })
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = logout
