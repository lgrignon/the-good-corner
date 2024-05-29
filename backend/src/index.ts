import bodyParser from "body-parser";
import express from "express";

const message: string = "hi"
console.log(message);

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.text({type: 'text/plain'}));

const ads = [
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
    res.send("Hello World ! " );
});

app.get("/ads", (req, res) => {
    console.log('GET ads requested - ' + ads.length + ' ads returned');
    res.send(ads);
});

app.post("/ads", (req, res) => {
    // TODO : vérifier qu'il n'y a pas déjà une annonce qui a le même nom
    // TODO : générer automatiquement l'ID 
    // TODO : vérifier que toutes les propriétés requises sont bien renseignées
    ads.push(req.body);
    res.send(ads);
});

app.post("/dump", (req, res) => {
    console.log(req.body);
    res.send("okk");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

