
import { mockTypeOrm } from "../__tests_mockTypeorm-config";
import { dataSource } from "../datasource";
import { Category } from "../entities/Category";
import { CategoriesQueries } from "../graphql-resolvers/CategoriesQueries";

describe("Categories graphql queries", () => {
    let catQueries: CategoriesQueries;

    beforeEach(() => {
        catQueries = new CategoriesQueries();
    });

    describe("query all categories", () => {

        it("returns categories", async () => {
            mockTypeOrm().onMock(Category)
            .toReturn([new Category("c1"), new Category("c2")], 'find');

            const categories = await catQueries.getAllCategories();
            console.log(categories);
            expect(categories.length).toBe(2);
        });

    })

});
