const {AuthenticationError} = require('apollo-server')
const Pin = require('./models/Pin')

const authenticated = next => (root, args, context, info) => {
    if(!context.currentUser) {
        throw new AuthenticationError("You must be logged in to do that")
    }
    return next(root, args, context, info)
}

module.exports = {
    Query: {
        me: authenticated((root, args, context) => context.currentUser),
        getPins: async (root, args, ctx) => {
           const pins = await Pin.find({}).populate('author').populate('comments.author')
           return pins
        }
    },
    Mutation: {
        //Create a pin with authenticated user as the author of pin
        createPin: authenticated(async (root, args, ctx) => {
            const newPin = await new Pin({
                ...args.input,
                author: ctx.currentUser._id
            }).save()
            const addPin = await Pin.populate(newPin, 'author')
            return addPin
        })
    }
}