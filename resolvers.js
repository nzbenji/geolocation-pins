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
        }),
        deletePin: authenticated(async (root, args, ctx) => {
            const pinDeleted = await Pin.findOneAndDelete({ _id: args.pinId}).exec()
            return pinDeleted
        }),
        createComment: authenticated((root, args, ctx) => {
            const newComment = {
                text: args.text, 
                author: ctx.currentUser._id
            }
            const pinUpdated = await Pin.findOneAndUpdate({
                _id: args.pinId
            }, {$push: {
                comments: newComment
            }}, {
                new: true
            }).populate("author").populate("comments.author")
            
            return pinUpdated
        })
    }
}