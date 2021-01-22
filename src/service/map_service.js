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

    async getTaskLandingRates(){
        let records = []
        let syncData = []
        syncData = await connection.select({
            from: this.taskLandingRate,
        })
        syncData.map(function(value){
            if(!value.synced){
                records.push(value)
            }
        })
        console.log(records)
        return records
    }
    async getTaskLarval(){
        let records = []
        let syncData = []
        syncData = await connection.select({
            from: this.taskLarval,
        })
        syncData.map(function(_r){
            if(!_r.synced){
                records.push(_r)
            }
        })

        return records
    }

    async getTaskTrap(){
        let records = []
        let syncData = []
        syncData = await connection.select({
            from: this.taskTrap,
        })
        syncData.map(function(_r){
            if(!_r.synced){
                records.push(_r)
            }
        })

        return records
    }

    async getTaskTreatment(){
        let records = []
        let syncData = []
        syncData = await connection.select({
            from: this.taskTreatment,
        })
        syncData.map(function(_r){
            if(!_r.synced){
                records.push(_r)
            }
        })

        return records
    }

    async getTaskOther(){
        let records = []
        let syncData = []
        syncData = await connection.select({
            from: this.taskOther,
        })
        syncData.map(function(_r){
            if(!_r.synced){
                records.push(_r)
            }
        })

        return records
    }
}