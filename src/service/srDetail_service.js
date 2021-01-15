import { connection } from "./jsstore_con";

export class SrDetailService {

    constructor() {

        this.tableName = "sr_details";
    }

    async getSrDetails() {
        return connection.select({
            from: this.tableName,
        })
    }

    addSrDetail(data) {
        return connection.insert({
            into: this.tableName,
            values: [data],
            //skipDataCheck: true
        })
    }

    getSrDetailById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }
}