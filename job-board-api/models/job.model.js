module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define("jobs", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false
        },
        company: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        companyLogo: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        type: {
            type:Sequelize.ENUM(
                'Full-time', 'Part-time', 'Contract'),
            defaultValue: 'Full-time',
            allowNull: false,
        },
        experience: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        skills: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: false
        },
        salary: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        employer_id: {
            type: Sequelize.INTEGER,
            allowNull: true, // for testing since existing data does not have the field
            references: {
                model: "users",
                key: "id"
            }
        }
    }, {
        freezeTableName: true
    })

    return {Job}
}
