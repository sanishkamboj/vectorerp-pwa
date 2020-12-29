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

    async addSite() {
        let data = [{cityid: "687",
        icon: "https://lee.vectorcontrolsystem.com/storage/site_type_icon/1597665212_catchbasin-02.png",
        point: [{lat: 41.755416, lng: -72.680677}],
        stypeid: "3",
        zoneid: "25"},

        {cityid: "687",
        icon: "https://lee.vectorcontrolsystem.com/storage/site_type_icon/1597665212_catchbasin-02.png",
        point: [{lat: 41.755416, lng: -72.680710333333}],
        stypeid: "3",
        zoneid: "25"}]
        return connection.insert({
            into: this.tableName,
            values: [data],
            skipDataCheck: true
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
}