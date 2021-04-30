const express = require('express')
const app = express()
const cors = require('cors')
const recordRoute = require('./routes/records')

app.use(cors({ origin: '*' }))
app.use(recordRoute)

app.listen(5000, () => {
    console.log("server is running at 5000")
})