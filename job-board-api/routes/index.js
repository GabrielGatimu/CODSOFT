const router = require('express').Router()

const jobRoutes = require('./job.routes')

const routes = (app, base_api) => {
    router.use('/jobs', jobRoutes)

    app.use(`${base_api}`, router)
}

module.exports = routes