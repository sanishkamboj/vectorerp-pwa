import { connection } from "./jsstore_con";

export class ZoneService {

    constructor() {

        this.tableName = "zones";
    }

    async getZoneData() {
        return connection.select({
            from: this.tableName,
        })
    }

    addZone(data) {
        return connection.insert({
            into: this.tableName,
            values: [data]
        })
    }

    getStudentById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }
}