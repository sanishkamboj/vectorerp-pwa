import { connection } from "./jsstore_con";

export class SiteSubTypeService {

    constructor() {

        this.tableName = "site_sub_types";
    }

    getSiteSubTypes() {
        return connection.select({
            from: this.tableName,
        })
    }

    addSiteSubType(data) {
        return connection.insert({
            into: this.tableName,
            values: [data],
            //skipDataCheck: true
        })
    }

    getSiteSubTypeById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }
}