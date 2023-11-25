module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.ENUM('ADMIN', 'USER'),
            defaultValue: 'USER',
        },
        auth_source :{
            type: Sequelize.ENUM('self', 'google'),
            defaultValue: 'self'
        },
        status: {
            type: Sequelize.ENUM("pending", "active"),
            defaultValue: "pending",
        },
        access_code: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
        },
        access_code_expires: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    }, {
        freezeTableName: true,
        timestamps: true
    })

    return {User}
}
