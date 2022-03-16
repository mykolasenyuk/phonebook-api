const express = require('express')
const router = express.Router()
const { joiSchema } = require('../../models/contact/contact')
const { validation, authenticate } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

const contactValidation = validation(joiSchema)
// const favoriteValidation = validation(updateFavoriteSchema)

router.get('/', authenticate, ctrl.getAllcontacts)
router.post('/', authenticate, contactValidation, ctrl.addContact)
module.exports = router
