import { connection } from "./jsstore_con";

export class CityService {

    constructor() {

        this.tableName = "city";
    }

    getCities() {
        return connection.select({
            from: this.tableName,
        })
    }

    addCity(data) {
        return connection.insert({
            into: this.tableName,
            values: [data],
            //skipDataCheck: true
        })
    }

    getCityById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }
}