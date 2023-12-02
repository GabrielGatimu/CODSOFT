const asyncHandler = require('express-async-handler')
const {Job, Bookmark} = require('../models')

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

// --- Bookmarks --- //
const bookmarkJob = asyncHandler(async (req, res) => {
    let {jobId} = req.params
    jobId = +jobId
    const userId = +(req.user.userId)

    const existingBookmark = await Bookmark.findOne({where: {user_id: userId, job_id: jobId}});

    if (existingBookmark) {
        await existingBookmark.destroy();
        return res.status(200).send({message: 'Job removed from bookmarks'});
    }

    const bookmark = await Bookmark.create({user_id: userId, job_id: jobId});
    res.status(200).send({
        message: 'Job bookmarked successfully ✅',
        bookmark
    });
});

const getCandidateBookmarks = asyncHandler(async (req, res) => {
    const userId = req.user.userId;

    const bookmarkedJobs = await Bookmark.findAll({
        where: {user_id: userId},
        include: [{model: Job, attributes: ['id', 'title']}],
    });

    res.status(200).send(bookmarkedJobs);
});

module.exports = {
    getJobs,
    addJob,
    viewJob,
    updateJob,
    deleteJob,
    getEmployerJobs,
    getCandidateApplications,
    bookmarkJob,
    getCandidateBookmarks
}