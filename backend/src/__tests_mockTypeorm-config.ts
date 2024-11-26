import { MockTypeORM } from "mock-typeorm";
import { dataSource } from "./datasource";
import { EntityManager } from "typeorm";

console.log("init mock TypeORM")


if (!(global as any).mockTypeOrm) {
    (global as any).mockTypeOrm = new MockTypeORM();
}
export function mockTypeOrm(): MockTypeORM {
    return (global as any).mockTypeOrm;
}

beforeEach(() => {

    mockTypeOrm().resetAll();
    (dataSource as any).transaction = <T>(callback: (entityManager: EntityManager) => Promise<T>) => {
        return callback(dataSource.manager);
    };

});