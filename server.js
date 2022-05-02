const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql/schema')
const { connectDB } = require('./db')
const { authenticate } = require('./middlewares/auth')

connectDB()
const app = express();

app.listen(3000);
console.log('server is running in port 3000');

// app.use(authenticate)

app.get('/', (req, res) => {
    res.send('welcome to my graphql api')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))