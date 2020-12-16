import { connection } from "./jsstore_con";

export class SiteAttrService {

    constructor() {

        this.tableName = "site_attributes";
    }

    getSiteAttrs() {
        return connection.select({
            from: this.tableName,
        })
    }

    addSiteAttr(data) {
        return connection.insert({
            into: this.tableName,
            values: [data],
            //skipDataCheck: true
        })
    }

    getSiteAttrById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }
}