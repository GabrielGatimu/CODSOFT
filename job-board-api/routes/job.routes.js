const router = require('express').Router()
const {jobController} = require('../controllers')

router.get('/all', jobController.getJobs)

module.exports = router