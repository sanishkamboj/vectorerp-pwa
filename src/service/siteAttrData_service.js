import { connection } from "./jsstore_con";

export class SiteAttrDataService {

    constructor() {

        this.tableName = "site_attribute_data";
    }

    async getSiteAttrData() {
        return connection.select({
            from: this.tableName,
        })
    }

    async addSiteAttrData(data) {
        return connection.insert({
            into: this.tableName,
            values: [data],
            //skipDataCheck: true
        })
    }

    async getSiteAttrDataById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                site_attr: id
            }
        })
    }
    async getSitesByIds(ids) {
        let query = {
            from: this.tableName,
            where: [],
        }

        query.where.push({site_attr: {in: ids}})
        return connection.select(query);
    }
    async clearRecords(){
        await connection.clear(this.tableName);
    }
}