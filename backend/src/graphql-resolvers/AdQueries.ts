import { Authorized, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Ad } from "../entities/Ad";
import DataLoader from "dataloader";
import { Tag } from "../entities/Tag";
import { EntityManager, In } from "typeorm";
import { dataSource } from "../datasource";

const tagsDataLoader = new DataLoader((ids) => {
    return Tag.findBy({
        id: In(ids)
    });
});

@Resolver(Ad)
export class AdQueries {

    @FieldResolver()
    async tags(@Root() ad: Ad): Promise<(Tag | Error)[]> {
        if (ad.tagIds == null || ad.tagIds.length == 0) {
            return [];
        }
        return tagsDataLoader.loadMany(ad.tagIds);
    }

    //@Authorized()
    @Query(type => [Ad])
    async getAllAds(): Promise<Ad[]> {

        console.log("MODIFIED getAllAds Query called from graphql")
        const ads: Ad[] = await dataSource.manager.find(Ad);
        console.log('adsok')
        const ad1: Ad | null = await dataSource.manager.findOne(Ad, { where: { id: 1 } });
        console.log('ad', ad1 == null, ad1)
        const ad2: Ad | null = await dataSource.manager.findOne(Ad, { where: { id: 2 } });
        console.log('ad2', ad2 == null, ad2)

        return ads;
    }

}