const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
mongoose.connection.once('open', ()=>{
    console.log('Connected to DB');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Now listening for requests on port ${PORT}`);
});