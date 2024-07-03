import { FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Ad } from "../entities/Ad";
import DataLoader from "dataloader";
import { Tag } from "../entities/Tag";
import { In } from "typeorm";
import { Category } from "../entities/Category";
import { dataSource } from "../datasource";

@Resolver(Category)
export class CategoriesQueries {


    @Query(type => [Category])
    async getAllCategories(): Promise<Category[]> {
        console.log("getAllAds Query called from graphql")
        const categories: Category[] = await dataSource.manager.find(Category);
        return categories;
    }

}