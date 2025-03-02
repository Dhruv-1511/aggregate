require('dotenv').config('')
const express = require('express')
const connectToMongo = require('./db');
var cors = require('cors');
connectToMongo()
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use('/api',require('./routes/auth'))
app.use('/workerapi',require('./routes/workerapi'))
app.use('/review',require('./routes/review'))
app.use('/job',require('./routes/job'))
app.use('/request',require('./routes/request'))
app.use('/farmerapi',require('./routes/farmerapi'))
app.use('/sellerapi',require('./routes/sellerapi'))

app.listen(port, () => {
  console.log(`aggregate_agro backend listening on port ${port}`)
})
