import { Authorized, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Ad } from "../entities/Ad";
import DataLoader from "dataloader";
import { Tag } from "../entities/Tag";
import { In } from "typeorm";
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

    @Authorized()
    @Query(type => [Ad])
    async getAllAds(): Promise<Ad[]> {
        console.log("MODIFIED getAllAds Query called from graphql")
        const ads: Ad[] = await dataSource.manager.find(Ad);
        return ads;
    }

}