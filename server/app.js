const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('./config');

const app = express();

// Allow cross-origin requests
app.use(cors());

mongoose.connect(`${env.DB_DRIVE}://${env.DB_HOST}:${env.DB_PORT}`, {
    useNewUrlParser: true,
    user: env.DB_USER,
    pass: env.DB_PASS,
    dbName: env.DB_NAME
});
mongoose.connection.once('open', ()=>{
    console.log('Connected to DB');
});

app.use(env.API_URI, graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Now listening for requests on port ${PORT}`);
});