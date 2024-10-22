import { Ad } from "../entities/Ad";

export class AdService {
 
    computeAdsAveragePrice(ads: Ad[]): number {
        if (ads.length == 0) {
            return 0;
        }

        const sum: number = ads.map(ad => ad.price ?? 0).reduce((previous, current) => {
            previous += current;
            return previous;
        }, 0);
        return sum / ads.length;
    }

}