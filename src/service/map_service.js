import { connection } from "./jsstore_con";

export class MapService {

    constructor() {

        this.taskLandingRate = "task_landing_rate";
        this.taskLarval = "task_larval_surveillance";
        this.taskTreatment = "task_treatment";
        this.taskTrap = "task_trap";
        this.taskOther = "task_other";
        this.siteData = "sites_data";
    }

    async getCities() {
        return connection.select({
            from: this.tableName,
        })
    }

    addTaskLandingRate(data) {
        return connection.insert({
            into: this.taskLandingRate,
            values: [data],
            //skipDataCheck: true
        })
    }
    addTasklarval(data){
        return connection.insert({
            into: this.taskLarval,
            values: [data],
            //skipDataCheck: true
        })
    }
    addTaskTreatment(data){
        return connection.insert({
            into: this.taskTreatment,
            values: [data],
            //skipDataCheck: true
        })
    }
    addTaskTrap(data){
        return connection.insert({
            into: this.taskTrap,
            values: [data],
            //skipDataCheck: true
        })
    }
    addTaskOther(data){
        return connection.insert({
            into: this.taskOther,
            values: [data],
            //skipDataCheck: true
        })
    }
    getCityById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }
    async getTaskLandingRate(){
        let sites = []
        let records = []
        
        records = await connection.select({
            from: this.taskLandingRate,
        })
        records.map(function(_r){
            sites.push(_r.siteid)
        })
        //console.log(sites)
        //console.log(records)
        
        return connection.select({
            from: this.siteData,
            where:{
                siteid: {
                    in: sites
                }
            }
        })
        
    }
    async getTaskLarval(){
        let sites = []
        let records = []
        
        records = await connection.select({
            from: this.taskLarval,
        })
        records.map(function(_r){
            sites.push(_r.siteid)
        })
        //console.log(sites)
        //console.log(records)
        
        return connection.select({
            from: this.siteData,
            where:{
                siteid: {
                    in: sites
                }
            }
        })
        
    }
    async getTaskTrap(){
        let sites = []
        let records = []
        
        records = await connection.select({
            from: this.taskTrap,
            where:{
                malfunction: 'true',
                lab_work_complete: 'true'
            }
        })
        records.map(function(_r){
            sites.push(_r.siteid)
        })
        //console.log(sites)
        //console.log(records)
        
        return connection.select({
            from: this.siteData,
            where:{
                siteid: {
                    in: sites
                }
            }
        })
        
    }

    async getSyncLandingRate(){
        let records = []
        let syncData = []
        records = await connection.select({
            from: this.taskLandingRate,
            where: {
                synced: 0
            }
        })
       
        console.log(records)
        return records
    }
    async getTaskLarvals(){
        let records = []
        let syncData = []
        records = await connection.select({
            from: this.taskLarval,
            where: {
                synced: 0
            }
        })
        

        return records
    }

    async getTaskTraps(){
        let records = []
        let syncData = []
        records = await connection.select({
            from: this.taskTrap,
            where: {
                synced: 0
            }
        })

        return records
    }

    async getTaskTreatments(){
        let records = []
        let syncData = []
        records = await connection.select({
            from: this.taskTreatment,
            where: {
                synced: 0
            }
        })

        return records
    }

    async getTaskOthers(){
        let records = []
        let syncData = []
        records = await connection.select({
            from: this.taskOther,
            where: {
                synced: 0
            }
        })
        
        return records
    }
    getLandingHistory(siteid){
        return connection.select({
            from: this.taskLandingRate,
            where: {
                siteid: siteid
            },
            join: {
                with: 'species',
                on: "task_landing_rate.species_id = species.iMSpeciesId",
                type: "left"

            }
        })
    }
    getLarvalHistory(siteid){
        return connection.select({
            from: this.taskLarval,
            where: {
                siteid: siteid
            }
        })
    }
}