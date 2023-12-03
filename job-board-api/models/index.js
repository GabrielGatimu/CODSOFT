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
const {Token} = require('./token.model')(sequelize, Sequelize)
const {Bookmark} = require('./bookmark.model')(sequelize, Sequelize)

// -- associations -- //
// user(employer) --> job
User.hasMany(Job, {foreignKey: 'employer_id'})
Job.belongsTo(User, {foreignKey: 'employer_id'})

// user --> bookmark
User.hasMany(Bookmark, {foreignKey: 'user_id'})
Bookmark.belongsTo(User, {foreignKey: 'user_id'})

// job --> bookmark
Job.hasMany(Bookmark, {foreignKey: 'job_id'})
Bookmark.belongsTo(Job, {foreignKey: 'job_id'})

Object.assign(db, {User, Job, Token, Bookmark})

module.exports = db
