const { User } = require('../../models')

const current = async (req, res) => {
  try {
    const { _id } = req.user

    const user = await User.findById(_id)

    if (user) {
      res.status(200).json({
        name: user.name,
        email: user.email,
      })
      return
    }
  } catch (error) {
    res.json(error)
  }
}

module.exports = current
