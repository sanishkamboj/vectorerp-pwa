import { connection } from "./jsstore_con";

export class ZoneService {

    constructor() {

        this.tableName = "zones";
    }

    async getZoneData() {
        return connection.select({
            from: this.tableName,
            order: {
                by: 'name',
                type: 'asc' //supprted sort type is - asc,desc
            }
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

    async getZonesByIds(ids) {
        let query = {
            from: this.tableName,
            where: [],
        }
        if(ids && ids.length) {
            query.where.push({zoneid: {in: ids}})
        }
        return connection.select(query);
    }
}