const express = require('express')

const jobRoutes = require('./job.routes')

const routes = (app, base_api) => {
    const router = express.Router()

    router.use('/jobs', jobRoutes)

    app.use(`${base_api}`, router)
}

module.exports = routes