import { Ad } from "../entities/Ad";
import { faker } from '@faker-js/faker';
import { AdQueries } from "../graphql-resolvers/AdQueries";
import { AdMutations } from "../graphql-resolvers/AdMutations";

import { MockTypeORM } from 'mock-typeorm'

describe("Ad graphql queries and mutations", () => {
    let adQueries: AdQueries;
    let ads: Ad[];

    beforeEach(() => {
        adQueries = new AdQueries();
        ads = [
            new Ad(faker.vehicle.bicycle(), undefined, undefined, 20),
            new Ad(faker.vehicle.vehicle(), undefined, undefined, 30),
            new Ad(faker.airline.airplane().name, undefined, undefined, 10),
            new Ad(faker.airline.airplane().name, undefined, undefined, 20),
            new Ad(faker.vehicle.vehicle(), undefined, undefined, 30),
            new Ad(faker.vehicle.vehicle(), undefined, undefined, 10),
        ]
    });

    describe("query all ads", () => {

        it("returns ads from TypeORM", async () => {
            const typeorm = new MockTypeORM();
            typeorm.onMock(Ad).toReturn(ads, 'find');

            const retrievedAds: Ad[] = await adQueries.getAllAds();
            
            expect(retrievedAds.length).toBe(ads.length);
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
