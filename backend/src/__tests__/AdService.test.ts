import { Ad } from "../entities/Ad";
import { AdService } from "../services/AdService";

import { faker } from '@faker-js/faker';

describe("AdService", () => {
 
    describe("compute average ads price", () => {

        let adService: AdService;

        

        beforeEach(() => {
            adService = new AdService();
        });

        it("returns 0 if ads is empty", () => {
            const average: number = adService.computeAdsAveragePrice([]);
            expect(average).toBe(0);
        });

        it("returns average for ads with price", () => {
            const ads = [
                new Ad(faker.vehicle.bicycle(), undefined, undefined, 20),
                new Ad(faker.vehicle.vehicle(), undefined, undefined, 30),
                new Ad(faker.airline.airplane().name, undefined, undefined, 10),
                new Ad(faker.airline.airplane().name, undefined, undefined, 20),
                new Ad(faker.vehicle.vehicle(), undefined, undefined, 30),
                new Ad(faker.vehicle.vehicle(), undefined, undefined, 10),
            ]
            console.log('ads titles', ads.map(ad => ad.title))
            const average: number = adService.computeAdsAveragePrice(ads);
            expect(average).toBe(20);
        });

        it("returns average even if called twice", () => {
            const ads = [
                new Ad("titre ad 1", undefined, undefined, 20),
                new Ad("titre ad 2", undefined, undefined, 30),
                new Ad("titre ad 3", undefined, undefined, 10),
            ]
            const average: number = adService.computeAdsAveragePrice(ads);
            expect(average).toBe(20);

            const average2: number = adService.computeAdsAveragePrice(ads);
            expect(average2).toBe(20);
        });

        it("returns average for ads with price", () => {
            // 1er temps / 1er A : Les acteurs
            const ads = [
                new Ad("titre ad 1", undefined, undefined, 20),
                new Ad("titre ad 2", undefined, undefined, 30),
                new Ad("titre ad 3"),
                new Ad("titre ad 4"),
                new Ad("titre ad 5"),
                new Ad("titre ad 6", undefined, undefined, 10),
            ]

            // 2ème A : L'action
            const average: number = adService.computeAdsAveragePrice(ads);

            // 3ème A : Les assertions
            expect(average).toBe((20 + 30 + 10) / 6);
        });

    });

});
