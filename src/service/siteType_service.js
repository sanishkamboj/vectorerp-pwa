import { connection } from "./jsstore_con";

export class SiteTypeService {

    constructor() {

        this.tableName = "site_types";
    }

    getSiteTypes() {
        return connection.select({
            from: this.tableName,
        })
    }

    async addSiteType(data) {
        return connection.insert({
            into: this.tableName,
            values: [data],
            //skipDataCheck: true
        })
    }

    getSiteTypeById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }
}