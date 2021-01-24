import { connection } from "./jsstore_con";

export class SitesService {

    constructor() {

        this.tableName = "sites";
    }

    getSitesData() {
        return connection.select({
            from: this.tableName,
        })
    }

    addSite(data) {
        return connection.insert({
            into: this.tableName,
            return: true,
            values: [data],
            upsert:true,
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

    removeStudent(id) {
        return connection.remove({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }
    updateSitePolyLatLngById(site) {
        return connection.update({
            in: this.tableName,
            set: {
                polygonLatLong: site.path,
            },
            where: {
                id: site.id
            }
        })
    }
    updateSiteLineLatLngById(site) {
        return connection.update({
            in: this.tableName,
            set: {
                polylineLatLong: site.path,
            },
            where: {
                id: site.id
            }
        })
    }
    updateStudentById(student) {
        return connection.update({
            in: this.tableName,
            set: {
                name: student.name,
                gender: student.gender,
                country: student.country,
                city: student.city
            },
            where: {
                id: student.id
            }
        })
    }

    async getSitesByIds(siteTypes) {

        return connection.select({
            from: this.tableName,
            where: {
                siteTypeId: {
                    in : siteTypes
                }
            }
        })
    }
    async getSitesBySync(){
        let sites = []
        let records = []
        sites = await connection.select({
            from: this.tableName,
            where: {
                synced: 0
            }
        })
        /*
        sites.map(function(value){
			if(!value.synced){
				records.push(value)
			}
        })
        */
        return sites
    }

    updateSiteSync(){
        return connection.update({
            in: this.tableName,
            set: {
                synced: 1,
            }
        })
    }
}