const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const app = express();
const port = 3001;

// Replace <password> with your actual MongoDB password
const url = 'mongodb+srv://vemulasaisurya141:manager@cluster0.xzz4h9v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
app.use(express.json());

mongoose.connect(url)
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.log(err.message);
    });

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
    try {
        await server.start();
        server.applyMiddleware({ app });
        app.listen(port, () => {
            console.log(`Server is live on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}

startServer();
