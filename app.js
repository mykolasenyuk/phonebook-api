// tecster2005
// mongodb+srv://tecster:tecster2005@cluster0.xetew.mongodb.net/phonebook?retryWrites=true&w=majority

const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/api/auth')
// const boolParser = require('express-query-boolean')
// const upload = require('./middlewares/upload')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
// app.use(boolParser())

app.use('/contacts', contactsRouter)
app.use('/users', authRouter)
// app.post('/api/img', upload.single('image'), async (req, res) => {
//   console.log(req.body)
//   console.log(req.file)
// })

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Not  Found',
  })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

module.exports = app
