import { connection } from "./jsstore_con";

export class SiteTypeService {

    constructor() {

        this.tableName = "site_types";
    }

    async getSiteTypes() {
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

    async getSiteTypeById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }

    async getSiteTypeByIds(ids) {
        return connection.select({
            from: this.tableName,
            where: {
                id: {
                    in : ids
                }
            }
        })
    }
}