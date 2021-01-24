import { connection } from "./jsstore_con";

export class ProductService {

    constructor() {

        this.tableName = "treatment_product";
    }

    async getProducts() {
        return connection.select({
            from: this.tableName,
        })
    }

    addProducts(data) {
        return connection.insert({
            into: this.tableName,
            values: [data],
            //skipDataCheck: true
        })
    }

    getProductById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }
    async clearRecords(){
        await connection.clear(this.tableName);
    }
}