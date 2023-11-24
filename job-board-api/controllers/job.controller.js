const {Job} = require('../models')

// -- Get Jobs -- //
const getJobs = async (req, res) => {
    const data = await Job.findAll({
        order: ["createdAt"]
    })
    console.log(data)

    return data ? res.status(200).send(data) : res.send('No Jobs found')
}

module.exports = {
    getJobs
}