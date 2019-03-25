const {AuthenticationError} = require('apollo-server')

const user = {
    _id: '1', 
    name: 'Ben',
    email: 'ben@mail.com',
    picture: 'url.com'
}

const authenticated = next => (root, args, context, info) => {
    if(!context.currentUser) {
        throw new AuthenticationError("You must be logged in to do that")
    }
    return next(root, args, context, info)
}

module.exports = {
    Query: {
        me: authenticated((root, args, context) => context.currentUser)
    }
}