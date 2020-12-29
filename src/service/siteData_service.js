import { connection } from "./jsstore_con";

export class SiteDataService {

    constructor() {

        this.tableName = "sites_data";
    }

    getSitesData() {
        return connection.select({
            from: this.tableName,
        })
    }

    addSiteData(data) {
        return connection.insert({
            into: this.tableName,
            values: [data]
        })
    }

    getSiteById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }

    removeSite(id) {
        return connection.remove({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }
}