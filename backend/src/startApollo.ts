
import "reflect-metadata";

import fs from "node:fs";


import { Column, DataSource, Entity, EntityManager, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./entities/Ad";
import { Category } from "./entities/Category";
import { Tag } from "./entities/Tag";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AdResolver } from "./graphql-resolvers/AdResolver";
import { buildSchema } from "type-graphql";
import { dataSource } from "./datasource";

const port = 4000;

// -------------------------- DATASOURCE 

async function startServerApollo() {

    const schema = await buildSchema({
        resolvers: [AdResolver],
    });
    
    const server = new ApolloServer({
        schema
    });

    await dataSource.initialize();

    const { url } = await startStandaloneServer(server, {
        listen: { port },
    });

    console.log(`🚀  Server ready at: ${url}`);
}

startServerApollo();