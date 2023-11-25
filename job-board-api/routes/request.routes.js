const {OAuth2Client} = require("google-auth-library");
const router = require('express').Router()

router.post('/', async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.header('Referrer-Policy', 'no-referrer-when-downgrade')

    const redirectUrl = 'http://127.0.0.1:8080/api/v1/oauth'

    const oAuth2Client = new OAuth2Client(
        process.env['GOOGLE_CLIENT_ID'],
        process.env['GOOGLE_CLIENT_ID_SECRET'],
        redirectUrl
    )

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type:'offline',
        scope:'https://www.googleapis.com/auth/userInfo.profile openid',
        prompt: 'consent'
    })

    res.json({url: authorizeUrl})
})

module.exports = router