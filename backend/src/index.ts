import bodyParser from "body-parser";
import express from "express";

import sqlite from "sqlite3";
import fs from "node:fs";

const db = new sqlite.Database('./db/good_corner.sqlite');

const sqlContent: string = fs.readFileSync('./db/init.sql', { encoding: 'utf-8' });

console.log('init sql content : ' + sqlContent);

db.exec(sqlContent, (err: Error | null) => {
    if (err) {
        console.log("error loading sql content : " + err);
    } else {
        console.log("init OK");
    }
});


const message: string = "hi"
console.log(message);

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.text({ type: 'text/plain' }));

let ads = [
    {
        id: 1,
        title: "Bike to sell",
        description:
            "My bike is blue, working fine. I'm selling it because I've got a new one",
        owner: "bike.seller@gmail.com",
        price: 100,
        picture:
            "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
        location: "Paris",
        createdAt: "2023-09-05T10:13:14.755Z",
    },
    {
        id: 2,
        title: "Car to sell",
        description:
            "My car is blue, working fine. I'm selling it because I've got a new one",
        owner: "car.seller@gmail.com",
        price: 10000,
        picture:
            "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
        location: "Paris",
        createdAt: "2023-10-05T10:14:15.922Z",
    },
];

app.get("/", (req, res) => {
    res.send("Hello World ! ");
});

type Ad = {
    id: number;
    title: string;
}

app.get("/ads", (req, res) => {
    console.log('GET ads requested - ' + ads.length + ' ads returned');

    const locationFilter = req.query['location'] as string | undefined;

    let whereClause: string = "";
    if (locationFilter) {
        whereClause = ` where location = '${locationFilter}' `;
    }

    console.log('search ad for location: ' + locationFilter)

    const sql: string = `select * from ad ${whereClause};`;
    console.log('sql: ' + sql)

    db.all(sql, (error: Error | null, rows) => {

        // const rows: Ad[] = rowsUnknown as Ad[];
        console.log('ici sont les rows', rows);
        res.send(rows);
    });
});



app.get("/ads/average", (req, res) => {
    console.log('GET ads requested - ' + ads.length + ' ads returned');

    const locationFilter = req.query['location'] as string | undefined;

    let whereClause: string = "";
    if (locationFilter) {
        whereClause = ` where location = '${locationFilter}' `;
    }

    console.log('search ad for location: ' + locationFilter)

    const sql: string = `select AVG(price) as moyenne from ad ${whereClause};`;
    console.log('sql: ' + sql)

    db.all(sql, (error: Error | null, rows) => {

        // const rows: Ad[] = rowsUnknown as Ad[];
        console.log('ici sont les rows', rows);
        res.send(rows);
    });
});

app.post("/ads", (req, res) => {
    // TODO : vérifier qu'il n'y a pas déjà une annonce qui a le même nom
    // générer automatiquement l'ID
    if (!req.body.id) {
        const max = ads.reduce((previous: number, current) => {
            return Math.max(previous, current.id)
        }, 0);
        req.body.id = max + 1;
    }

    // TODO : vérifier que toutes les propriétés requises sont bien renseignées
    ads.push(req.body);
    res.send(ads);
});

app.delete('/ads', (req, res) => {
    // ads = ads.filter(ad => ad.id
    if (req.body.id) {
        const id = parseInt(req.body.id);
        if (isNaN(id)) {
            return res.status(400).send('bad id');
        }

        // id is valid, let's delete it
        console.log("delete ad of id " + id)
        db.run('DELETE FROM ad WHERE id = ' + id, (err: Error | null) => {
            if (err) {
                return res.status(500).send('unexpected error');
            }

            res.send('ok');
        });
    } else if (req.body.minPrice) {
        const minPrice = parseInt(req.body.minPrice);
        if (isNaN(minPrice)) {
            return res.status(400).send('bad minPrice');
        }

        const sql = 'DELETE FROM ad WHERE price > ' + minPrice;
        console.log("delete ad with sql: " + sql)
        db.run(sql, (err: Error | null) => {
            if (err) {
                return res.status(500).send('unexpected error');
            }

            res.send('ok');
        });
    }

});

app.put('/ads', (req, res) => {
    const index = ads.findIndex(ad => ad.id == req.body.id)
    if (index >= 0) {
        ads[index] = req.body;
    }

    console.log("coucou", req.body)
    res.send('ok');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

