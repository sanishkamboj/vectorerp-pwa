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
                siteid: id
            }
        })
    }

    getSiteByName(name) {
        return connection.select({
            from: this.tableName,
            where: {
                site_name: {
                    like: '%'+name+'%'
                },
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

    async getSitesByIds(siteTypes, siteAttr, siteCities, siteZones) {
        let query = {
            from: this.tableName,
            where: [],
        }
        if(siteTypes && siteTypes.length) {
            query.where.push({siteTypeId: {in: siteTypes}})
        }
        if(siteAttr && siteAttr.length) {
            query.where.push({siteid: {in: siteAttr}})
        }
        if(siteCities && siteCities.length) {
            query.where.push({cityId: {in: siteCities}})
        }
        if(siteZones && siteZones.length) {
            query.where.push({zoneId: {in: siteZones}})
        }
        return connection.select(query);
    }
}