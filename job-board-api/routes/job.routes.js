const router = require('express').Router()
const {jobController} = require('../controllers')

router.get('/', jobController.getJobs)

module.exports = router