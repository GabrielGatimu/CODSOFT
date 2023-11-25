const {OAuth2Client} = require("google-auth-library");
const router = require('express').Router()

const getUserData = async (access_token) => {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`)
    const data = await response.json()
    console.log('userdata >>> (getUserData)', data)
}

router.post('/oauth', async () => {
    const code = req.query.code
    console.log(code)

    try {
        const redirectUrl = 'http://127.0.0.1:8080/api/v1/oauth'

        const oAuth2Client = new OAuth2Client(
            process.env['GOOGLE_CLIENT_ID'],
            process.env['GOOGLE_CLIENT_ID_SECRET'],
            redirectUrl
        )
        const response = await oAuth2Client.getToken(code)
        await oAuth2Client.setCredentials(response.tokens)
        console.log('tokens acquired')

        const user = oAuth2Client.credentials
        console.log('credentials', user)
        await getUserData(user.access_token)
    } catch (e) {
        console.log('Error occurred while signing in with Google')
    }
})

router.post('/signup', () => console.log('hello signup'))

module.exports = router