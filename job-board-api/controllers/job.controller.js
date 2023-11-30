const asyncHandler = require('express-async-handler')
const {Job} = require('../models')

// -- Get Jobs -- //
const getJobs = asyncHandler(async (req, res) => {
    const pageNumber = +(req.query.pageNumber) || 0
    const limit = +(req.query.limit) || 12
    const result = {}
    const totalJobs = await Job.count()

    result.totalJobs = totalJobs

    let startIndex = pageNumber * limit
    const endIndex = (pageNumber + 1) * limit

    if (startIndex > 0) {
        result.previous = {
            pageNumber: pageNumber - 1,
            limit: limit
        }
    }

    if (endIndex < totalJobs) {
        result.next = {
            pageNumber: pageNumber + 1,
            limit: limit
        }
    }

    result.data = await Job.findAll({
        order: [["id", "ASC"]],
        offset: startIndex,
        limit: limit
    })

    result.rowsPerPage = limit

    return result.data ? res.status(200).send(result) : res.send('No Jobs found')
})

const addJob = asyncHandler(async (req, res) => {
res.send('add')
})

const viewJob = asyncHandler(async (req, res) => {
    res.send('viewJob')
})

const updateJob = asyncHandler(async (req, res) => {
    res.send('update')
})

const deleteJob = asyncHandler(async (req, res) => {
res.send('delete')
})

const getEmployerJobs = asyncHandler(async (req, res) => {
    res.send('employer')
})

const getCandidateApplications = asyncHandler(async (req, res) => {
res.send('candidate applications')
})

const getCandidateFavouriteJobs = asyncHandler(async (req, res) => {
res.send('bookmarks')
})

module.exports = {
    getJobs,
    addJob,
    viewJob,
    updateJob,
    deleteJob,
    getEmployerJobs,
    getCandidateApplications,
    getCandidateFavouriteJobs
}