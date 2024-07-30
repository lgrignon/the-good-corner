
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
import { dataSource, initTestData } from "./datasource";
import { AdMutations } from "./graphql-resolvers/AdMutations";
import { CategoriesQueries } from "./graphql-resolvers/CategoriesQueries";

const port = 4000;

// -------------------------- DATASOURCE 

async function startServerApollo() {

    const schema = await buildSchema({
        resolvers: [AdQueries, AdMutations, CategoriesQueries],
    });
    
    const server = new ApolloServer({
        schema
    });

    await dataSource.initialize();

    await initTestData();

    const { url } = await startStandaloneServer(server, {
        listen: { port },
    });

    console.log(`🚀  Server ready at: ${url}`);
}

startServerApollo();