const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(`mongodb+srv://bdUser:pcv7yMRm9Uval33E@cluster0.wjxsr9v.mongodb.net/myDatabase?retryWrites=true&w=majority`, { useMongoClient: true })

  .then(() => {
    console.log('Successfully connected to database')
  })

  .catch(error => {
    console.error('Error connecting to MongoDB database', error)
  })

module.exports = mongoose
