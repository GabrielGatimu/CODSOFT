const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client()
const {tokenGenerator} = require('../utils')

const {User} = require('../models')

const googleAuth = async (req, res) => {
    const {credential, client_id, email} = req.body

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: client_id
        })
        const payload = ticket.getPayload()
        const userId = payload['sub']

        let user = await User.findOne({where: {email}})

        if (!user) {
            const user = await User.create({
                first_name: `${given_name}`,
                last_name: `${family_name}`,
                email,
                auth_source: 'google'
            })
        }

        const userName = `${user.first_name} ${user.last_name}`
        const {accessToken} = await tokenGenerator(res, user.id, userName, user.role)

        res.status(200).json({payload, accessToken})
    } catch (e) {
        res.status(400).json({err})
    }
}