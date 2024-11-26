
import { mockTypeOrm } from "../__tests_mockTypeorm-config";
import { dataSource } from "../datasource";
import { Category } from "../entities/Category";
import { CategoriesQueries } from "../graphql-resolvers/CategoriesQueries";

describe("Ad graphql queries and mutations", () => {
    let catQueries: CategoriesQueries;

    beforeEach(() => {
        catQueries = new CategoriesQueries();
    });

    describe("2 query all ads", () => {

        it("2 returns ads from TypeORM", async () => {
            const c3 = new Category("c3");
            mockTypeOrm().onMock(Category)
            .toReturn([new Category("c1"), new Category("v2")], 'find')
            .toReturn(c3, 'save');

            const rr = await catQueries.getAllCategories();
            console.log(rr);
        });

    })

});
