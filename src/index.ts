import 'dotenv/config'
import { ApolloServer } from 'apollo-server-express';
const ApolloServerPluginLandingPageGraphQLPlayground = require('apollo-server-core');
import Express from 'express';
import 'reflect-metadata';
import { typeDefs } from './graphql/schema';
import { resolvers } from './resolvers/index'
import db from '../models';
import { clearTables, seedUsersTable } from './utils/helpers';

const main = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    });

    const app = Express();

    // await clearTables();
    // await seedUsersTable();

    await server.start();

    server.applyMiddleware({ app });
    db.sequelize.sync().then(() => {
        app.listen({ port: process.env.PORT }, () =>
            console.log(
                `Server started on http://localhost:${process.env.PORT}${server.graphqlPath}`
            )
        );
    });
};

main().catch((error) => {
    console.log(error, 'error');
});