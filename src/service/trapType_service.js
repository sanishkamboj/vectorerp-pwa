import { connection } from "./jsstore_con";

export class TrapTypeService {

    constructor() {

        this.tableName = "trap_type_mas";
    }

    async getTrapTypes() {
        return connection.select({
            from: this.tableName,
        })
    }

    addTrapType(data) {
        return connection.insert({
            into: this.tableName,
            values: [data],
            //skipDataCheck: true
        })
    }

    getTrapTypesById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }
}