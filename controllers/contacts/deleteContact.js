const { Contact } = require('../../models')

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = { contactId, owner: req.user._id }
    // console.log(contact)
    const result = await Contact.findByIdAndDelete(contact.contactId)
    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Conatct with ID=${contact.contactId} not found`,
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      message: ' ✔️ Contact deleted',
    })
  } catch (error) {
    next(error)
  }
}
module.exports = deleteContact
