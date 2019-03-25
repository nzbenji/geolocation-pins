const user = {
    _id: '1', 
    name: 'Ben',
    email: 'ben@mail.com',
    picture: 'url.com'
}

module.exports = {
    Query: {
        me: () => user
    }
}