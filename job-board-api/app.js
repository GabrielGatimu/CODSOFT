const express = require('express')
require('dotenv').config()

const {errorMiddleware} = require('./middleware')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// ---- Error Middleware ---- //
app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

const port = process.env['PORT'] || 8080
app.listen(port, () => {
    console.log(`\tServer alive at port ${port}`)
} )

