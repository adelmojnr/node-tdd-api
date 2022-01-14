require('dotenv').config()

const app = require('./src/app')

app.listen(process.env.PORT || 3000, () => {
  console.log('Everything is fine!')
})

module.exports = app
