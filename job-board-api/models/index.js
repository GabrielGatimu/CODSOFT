const {Sequelize} = require('sequelize')
const {dbConfig} = require('../config')

let sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        dialect: dbConfig.dialect,
        host: dbConfig.HOST,
        pool: dbConfig.pool,
        operatorsAliases: 0,
        ssl: true
    }
)

const db = {}

// adding sequelize to db object
db.Sequelize = Sequelize
db.sequelize = sequelize

// -- models -- //
const {User} = require('./user.model')(sequelize, Sequelize)
const {Job} = require('./job.model')(sequelize, Sequelize)

// -- associations -- //

Object.assign(db, {User, Job})

module.exports = db
