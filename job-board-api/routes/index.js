const express = require('express')
const authRoutes = require('./auth.routes')
const requestRoutes =require('./request.routes')
const jobRoutes = require('./job.routes')

const routes = (app, base_api) => {
    const router = express.Router()

    router.use('/request', requestRoutes)
    router.use('/auth', authRoutes)
    router.use('/jobs', jobRoutes)

    app.use(`${base_api}`, router)
}

module.exports = routes