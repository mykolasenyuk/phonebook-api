const { Contact } = require('../../models')

const getAllContacts = async (req, res, next) => {
  try {
    const { limit = 5, page = 1, favorite = null } = req.query
    const { _id } = req.user
    const optionSearch = { owner: _id }
    if (favorite !== null) {
      optionSearch.favorite = favorite
    }
    const { docs: contacts, ...rest } = await Contact.paginate(optionSearch, {
      limit,
      page,
    })
    // const contacts = await Contact.find({}, '_id name email phone favorite')
    res.json({
      status: 'success',
      code: 200,
      data: { contacts, ...rest },
    })
  } catch (error) {
    next(error)
  }
}
module.exports = getAllContacts
