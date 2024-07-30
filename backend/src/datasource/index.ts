import { DataSource } from "typeorm";
import { Tag } from "../entities/Tag";
import { Category } from "../entities/Category";
import { Ad } from "../entities/Ad";

export const dataSource = new DataSource({
    type: 'postgres',
    
    host: 'localhost',
    port: 5432,
    database: 'the_good_corner',
    username: 'postgres',
    password: 'example',

    entities: ['src/entities/*.ts'],
    synchronize: true,
    logging: "all"
});

export async function cleanDB() {
    await dataSource.manager.clear(Ad);
    await dataSource.manager.clear(Category);
    await dataSource.manager.clear(Tag);
}

async function createAndPersistAd(title: string, description: string | undefined, owner: string, price: number, pictureUrl: string | undefined, category: Category, ...tags: Tag[]) {
    const ad = new Ad(title, description, owner, price, pictureUrl);
    ad.category = category;
    ad.tags = Promise.resolve(tags);
    await dataSource.manager.save(ad);
}

export async function initTestData() {

    const tag = new Tag('Vieux matériel');
    const tag2 = new Tag('Bonne affaire');
    const tag3 = new Tag('0 carbone');

    const category = new Category("Meubles")
    await dataSource.manager.save(category);

    const category3 = new Category("Bolides")
    await dataSource.manager.save(category3);

    const category2 = new Category("Autres")
    await dataSource.manager.save(category2);

    await createAndPersistAd("Armoire normande", "très beau meuble d'époque", "Louis", 300, undefined, category, tag, tag3);
    await createAndPersistAd("Roller", undefined, "Mireille", 222, undefined, category, tag2);
    await createAndPersistAd("Table de jardin", undefined, "Benoit", 110, undefined, category, tag3);
    await createAndPersistAd("Bougie", "elle éclaire parfaitement", "Baptiste", 20, "/images/bougie.webp", category, tag3);
    await createAndPersistAd("Dame-Jeanne", undefined, "Damien", 70, "/images/dame-jeanne.webp", category, tag3);
    await createAndPersistAd("Porte-magazine", undefined, "Paul", 40, "/images/porte-magazine.webp", category, tag3);
}
