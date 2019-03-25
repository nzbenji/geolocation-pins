const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const {findOrCreateUser} = require('./controllers/userController')

mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log('db connected'))
    .catch(err => console.error(err))

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        let authToken = null
        let currentUser = null
        try {
            authToken = req.headers.authorization

            //find or create a user
            if(authToken) {
                currentUser = await findOrCreateUser(authToken)
            }
        } catch(err) {
            console.error(`Unable to authenticate user with a token ${authToken}`)
        }
        return {currentUser}
    }
})

server.listen().then(({url}) => {
    console.log(`server is listen on ${url}`)
})