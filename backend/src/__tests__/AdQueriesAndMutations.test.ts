import { Ad } from "../entities/Ad";
import { faker } from '@faker-js/faker';
import { AdQueries } from "../graphql-resolvers/AdQueries";
import { AdMutations } from "../graphql-resolvers/AdMutations";

import { MockTypeORM } from 'mock-typeorm'
import { dataSource } from "../datasource";
import { EntityManager } from "typeorm";
import { mockTypeOrm } from "../__tests_mockTypeorm-config";

describe("Ad graphql queries and mutations", () => {
    let adQueries: AdQueries;
    let ads: Ad[];

    beforeEach(() => {
        adQueries = new AdQueries();
        ads = [
            new Ad("0" + faker.vehicle.bicycle(), undefined, undefined, 20),
            new Ad("1" + faker.vehicle.vehicle(), undefined, undefined, 30),
            new Ad("2" + faker.airline.airplane().name, undefined, undefined, 10),
            new Ad(faker.airline.airplane().name, undefined, undefined, 20),
            new Ad(faker.vehicle.vehicle(), undefined, undefined, 30),
            new Ad(faker.vehicle.vehicle(), undefined, undefined, 10),
        ]
    });

    describe("query all ads", () => {

        it("returns ads from TypeORM", async () => {
            mockTypeOrm().onMock(Ad)
                .toReturn(ads, 'find')
                .toReturn(false, 'findOne')
                .toReturn(ads[0], 'findOne');

            await adQueries.getAllAds();

            const x = {a:3, b:2}
            expect(x).toHaveProperty('a', 3);
            expect(x).toHaveProperty('b', 2);
        });

    })

});


describe("Ad graphql mutations", () => {
    let adMutations: AdMutations;

    beforeEach(() => {
        adMutations = new AdMutations();
    });

    it("...", async () => {
    });

});
