import { Arg, Field, FieldResolver, Float, InputType, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { Ad } from "../entities/Ad";
import DataLoader from "dataloader";
import { Tag } from "../entities/Tag";
import { EntityManager, In } from "typeorm";
import { dataSource } from "../datasource";
import { Category } from "../entities/Category";

@InputType({ description: 'Provide either category id or name in order to create' })
export class CategoryInput {

    @Field(_ =>  Int, { nullable: true })
    id?: number;

    @Field({ nullable: true })
    name?: string;
}

@InputType()
export class AdInput {

    @Field()
    title!: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    owner?: string;

    @Field(type => Int, { nullable: true })
    price?: number;

    @Field({ nullable: true })
    picture?: string;

    @Field({ nullable: true })
    location?: string;

    @Field(type => Date, { nullable: true })
    createdAt?: Date;

    @Field(type => [String])
    tags!: string[];

    @Field()
    category!: CategoryInput
}

@Resolver(Ad)
export class AdMutations {

    @Mutation(_ => Ad)
    async publishAd(@Arg("adData") adData: AdInput): Promise<Ad> {
        return dataSource.transaction(async (entityManager: EntityManager) => {

            let category: Category | null = null;

            if (adData.category.id) {
                category = await entityManager.findOneBy(Category, {
                    id: adData.category.id
                });
            }

            if (category == null && adData.category.name) {
                category = new Category(adData.category.name);
                await entityManager.save(category);
            }

            if (category == null) {
                throw new Error("missing category - params were " + JSON.stringify(adData.category));
            }

            try {
                const ad = new Ad(adData.title, adData.description, 
                    adData.owner, adData.price, adData.picture,
                    adData.location, adData.createdAt);

                console.log("will save ", ad)

                if (category) {
                    ad.category = category;
                }

                await entityManager.save(ad);

                console.log("saved ", ad)
                return ad;

            } catch (e) {
                console.error('create ad failed', e);
                throw new Error("cannot create ad - " + e);
            }

        })
    }

}