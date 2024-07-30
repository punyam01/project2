require('dotenv').config()
const express = require('express')

const app = express()

// declaring middlewartes for accepting vaLues
app.use(express.json())

//  declaring Routes related middlewares

const movieRouters = require('./routes/movie.routes.js')
app.use('/api/v1/movies', movieRouters)

app.listen(process.env.PORT, () => {
  console.log('server is running')
})
