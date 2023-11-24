authConfig = {
    jwt_access_token_secret: process.env['JWT_SECRET_ACCESS_TOKEN'],
    jwt_refresh_token_secret: process.env['JWT_SECRET_REFRESH_TOKEN']
}

module.exports = authConfig