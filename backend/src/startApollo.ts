
import "reflect-metadata";

import fs from "node:fs";


import { Column, DataSource, Entity, EntityManager, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./entities/Ad";
import { Category } from "./entities/Category";
import { Tag } from "./entities/Tag";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AdQueries } from "./graphql-resolvers/AdQueries";
import { buildSchema } from "type-graphql";
import { cleanDB, dataSource, initTestData } from "./datasource";
import { AdMutations } from "./graphql-resolvers/AdMutations";
import { CategoriesQueries } from "./graphql-resolvers/CategoriesQueries";
import { UserQueriesAndMutations } from "./graphql-resolvers/UsersQueriesAndMutations";
import jwt from "jsonwebtoken";

const port = 4000;

// -------------------------- DATASOURCE 

async function startServerApollo() {

    const schema = await buildSchema({
        resolvers: [AdQueries, AdMutations, CategoriesQueries, UserQueriesAndMutations],
        authChecker: ({context}, roles: string[]) => {
            console.log('apollo context contains : ', context)
            if (context.user && (roles.length == 0 || roles.includes(context.user.role))) {
                return true;
            }

            return false;
        }
    });
    
    const server = new ApolloServer({
        schema
    });

    await dataSource.initialize();

    await cleanDB();
    await initTestData();

    const { url } = await startStandaloneServer(server, {
        listen: { port },
        context: async ({req}) => {
            const authHeader: string | undefined = req.headers.authorization;
            let user = null
            if (authHeader?.startsWith('Bearer ') === true) {
                const tokenValue: string = authHeader.substring('Bearer '.length);

                const jwtSecret: string | undefined = process.env.JWT_SECRET;
                console.log('jwt secret: ' + jwtSecret)
                if (!jwtSecret) {
                    throw new Error('invalid JWT secret');
                }

                console.log('JWT value: ' + tokenValue)
                user = jwt.verify(tokenValue, jwtSecret);

                console.log('JWT verify result', user)
            }

            return { user }
        }
    });

    console.log(`🚀  Server ready at: ${url}`);
}

startServerApollo();