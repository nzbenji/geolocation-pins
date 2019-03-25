const User = require('../models/User')
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

const verifyAuthToken = async token => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_CLIENT_ID
        })
        return ticket.getPayload()
    } catch(err) {
        console.error(`error verify auth token ${err}`)
    }
}

const checkIfUserExists = async email => await User.findOne({email}).exec()

const createNewUser = googleUser => {
    const {name, email, picture} = googleUser
    const user = {name, email, picture}

    return new User(user).save()
}

exports.findOrCreateUser = async token => {
    //verify token
    const user = await verifyAuthToken(token)
    //check if user exists
    const googleUser = await checkIfUserExists(user.email)
    //if user exists return, otherwise create new user
    return googleUser ? googleUser : createNewUser(user)
}