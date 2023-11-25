const {Job} = require('../models')

// -- Get Jobs -- //
const getJobs = async (req, res) => {
    const pageNumber = parseInt(req.query.pageNumber) || 0
    const limit = parseInt(req.query.limit) || 12
    const result = {}

    const totalJobs = await  Job.count()

    let startIndex = pageNumber * limit
    const endIndex = (pageNumber + 1) * limit

    result.totalJobs = totalJobs

    if(startIndex > 0){
        result.previous = {
            pageNumber: pageNumber - 1,
            limit: limit
        }
    }

    if(endIndex < totalJobs){
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
}

module.exports = {
    getJobs
}