
import "reflect-metadata";

import bodyParser from "body-parser";
import express from "express";
import fs from "node:fs";
import { Column, DataSource, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./entities/Ad";
import { Category } from "./entities/Category";
import { Tag } from "./entities/Tag";

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.text({ type: 'text/plain' }));

// -------------------------- DATASOURCE 

const dataSource = new DataSource({
    type: 'sqlite',
    database: './db/good_corner.sqlite',
    entities: ['src/entities/*.ts'],
    synchronize: true,
    logging: "all"
});


// -------------------------- ENDPOINTS

app.get("/ads", async (req, res) => {

    const location = req.query['location'] as string | undefined;
    const ads: Ad[] = await dataSource.manager.find(Ad, {
        relations: {
            tags: true
        },
        where: {
            location
        }
    });

    console.log('got ads', ads);

    for (const ad of ads) {
        const tags: Tag[] = await ad.tags!;
        console.log('got ad[0].tags', tags);
    }

    // console.log('GET ads requested - ' + ads.length + ' ads returned');

    // const locationFilter = req.query['location'] as string | undefined;

    // let whereClause: string = "";
    // if (locationFilter) {
    //     whereClause = ` where location = '${locationFilter}' `;
    // }

    // console.log('search ad for location: ' + locationFilter)

    // const sql: string = `select * from ad ${whereClause};`;
    // console.log('sql: ' + sql)

    // db.all(sql, (error: Error | null, rows) => {

    //     // const rows: Ad[] = rowsUnknown as Ad[];
    //     console.log('ici sont les rows', rows);
    //     res.send(rows);
    // });
    res.send(ads);
});

// app.post("/ads/forCategory", (req, res) => {
//     const categoryNames = req.body.categoryNames as string[] | undefined;

//     if (!categoryNames || categoryNames.length == 0) {
//         return res.status(400).send('no categories');
//     }

//     const sql = `
//     select a.* 
//         from ad a 
//         join category c 
//             on a.category_id = c.id 
//         where c.name in ( ${categoryNames.map(name => `'${name}'`).join(', ')} ) 
//     `
//     console.log('get ads for category - sql=' + sql);

//     db.all(sql, (error: Error | null, rows) => {
//         if (error) {
//             console.error('an error occurred in get for category', error);
//             return res.status(500).send('unexpected error');
//         }

//         // const rows: Ad[] = rowsUnknown as Ad[];
//         console.log('ici sont les rows pour les catégories ' + categoryNames.join(','), rows);
//         res.send(rows);
//         //res.send('wait for it')
//     });
// })

// app.post("/ads/forCategoryStartingByV", (req, res) => {
//     const sql = `
//     select a.* 
//         from ad a 
//         join category c 
//             on a.category_id = c.id 
//         where c.name like 'v%' 
//     `
//     console.log('forCategoryStartingByV - sql=' + sql);

//     db.all(sql, (error: Error | null, rows) => {
//         if (error) {
//             console.error('an error occurred in get for category', error);
//             return res.status(500).send('unexpected error');
//         }
//         res.send(rows);
//     });
// })




// app.get("/ads/averageForAutre", (req, res) => {
//     const sql = `
//     select AVG(a.price) as average 
//         from ad a 
//         join category c 
//             on a.category_id = c.id 
//         where c.name = 'autre' 
//     `
//     console.log('get avg ads price for category - sql=' + sql);

//     db.get(sql, (error: Error | null, rowUntyped: unknown) => {
//         if (error) {
//             console.error('an error occurred in get for category', error);
//             return res.status(500).send('unexpected error');
//         }

//         const { average } = rowUntyped as { average: number };

//         console.log('average ads price for category autre: ' + average);

//         res.contentType('text/plain').status(200).send(average.toString());
//     });
// })


// app.get("/ads/average", (req, res) => {
//     console.log('GET ads requested - ' + ads.length + ' ads returned');

//     const locationFilter = req.query['location'] as string | undefined;

//     let whereClause: string = "";
//     if (locationFilter) {
//         whereClause = ` where location = '${locationFilter}' `;
//     }

//     console.log('search ad for location: ' + locationFilter)

//     const sql: string = `select AVG(price) as moyenne from ad ${whereClause};`;
//     console.log('sql: ' + sql)

//     db.all(sql, (error: Error | null, rows) => {

//         // const rows: Ad[] = rowsUnknown as Ad[];
//         console.log('ici sont les rows', rows);
//         res.send(rows);
//     });
// });

// function getInsertAdSql(body: any, categoryId: string) {
//     return `
//             insert into ad (title, description, owner, price, location, createdAt, category_id) 
//             values ('${body.title}', '${body.description}', '${body.owner}', ${body.price}, '${body.location}', DATE('${body.createdAt}') , ${categoryId});
//             `;
// }

app.post("/ads", async (req, res) => {
    console.log("create ad")

    try {
        const ad = new Ad(req.body.title, req.body.description,
            req.body.owner, req.body.price, req.body.picture,
            req.body.location, req.body.createdAt);

        console.log("will save ", ad)
        await dataSource.manager.save(ad);
        console.log("saved ", ad)
        res.send('au top');

    } catch (e) {
        console.error('create ad failed', e);
        res.status(500).send('unexpected error')
    }
})

// app.post("/ads", (req, res) => {
//     // TODO : vérifier qu'il n'y a pas déjà une annonce qui a le même nom
//     // générer automatiquement l'ID
//     if (!req.body.id) {
//         const max = ads.reduce((previous: number, current) => {
//             return Math.max(previous, current.id)
//         }, 0);
//         req.body.id = max + 1;
//     }

//     // TODO : vérifier que toutes les propriétés requises sont bien renseignées
//     // ads.push(req.body);

//     const categoryName = req.body.category.name as string;
//     db.get(`select id from category where name = '${categoryName}'`, (err: Error | null, row) => {
//         if (err) {
//             return res.status(500).send('unexpected error');
//         }

//         let categoryId: number | undefined;
//         if (row) {
//             categoryId = (row as any).id;
//         }

//         console.log("row => " + row)

//         if (categoryId == undefined) {
//             console.log("create ad : we need to create category " + categoryName)


//             const insertAdSql = getInsertAdSql(req.body, 'last_insert_rowid()')

//             const fullSql = `

//             BEGIN;

//             INSERT INTO category (name) VALUES ('${categoryName}');

//             ${insertAdSql}

//             COMMIT;

//             `

//             console.log('insert sql with create category: ' + fullSql);

//             db.exec(fullSql, (err: Error | null) => {
//                 if (err) {
//                     console.error('création de la catégorie', err)
//                     return res.status(500).send('unexpected error');
//                 }

//                 res.send('ok tout s\'est bien passé');
//             })


//         } else {
//             console.log("create ad : with category id " + categoryId);

//             const insertSql = getInsertAdSql(req.body, categoryId.toString())
//             console.log('insert sql: ' + insertSql);

//             db.exec(insertSql, (err: Error | null) => {
//                 if (err) {
//                     return res.status(500).send('unexpected error');
//                 }

//                 res.send('ok tout s\'est bien passé');
//             })
//         }
//     })

// });

app.delete('/ads', async (req, res) => {
    const id: number = req.body.id;
    await dataSource.manager.delete(Ad, { id });
});

// app.put('/ads', (req, res) => {
//     const index = ads.findIndex(ad => ad.id == req.body.id)
//     if (index >= 0) {
//         ads[index] = req.body;
//     }

//     console.log("coucou", req.body)
//     res.send('ok');
// });

async function cleanDB() {
    await dataSource.manager.clear(Ad);
    await dataSource.manager.clear(Category);
    await dataSource.manager.clear(Tag);
}

async function createAndPersistAd(title: string, owner: string, category: Category, ...tags: Tag[]) {
    const ad = new Ad(title, undefined, owner);
    ad.category = category;
    ad.tags = Promise.resolve(tags);
    await dataSource.manager.save(ad);
}

async function initData() {

    const tag = new Tag('Vieux matériel');
    const tag2 = new Tag('Bonne affaire');
    const tag3 = new Tag('0 carbone');

    const category = new Category("Meubles")
    await dataSource.manager.save(category);

    const category2 = new Category("Autres")

    await createAndPersistAd("armoire normande", "louis", category, tag, tag3);
    await createAndPersistAd("roller", "mireille", category, tag2);
    await createAndPersistAd("table de jardin", "benoit", category, tag3);
}

app.listen(port, async () => {

    await dataSource.initialize();

    await cleanDB();
    await initData();

    console.log(`Example app listening on port ${port}`);
});

