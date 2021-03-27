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
    async getTrapHistory(siteid){
        let history = []
        let records = []
        
        records = await connection.select({
            from: this.taskTrap,
            where: {
                siteid: siteid
            }
        })
        for(let i = 0; i < records.length; i++){
           
            let data = await connection.select({
                from: 'trap_type_mas',
                where:{
                    iTrapTypeId: records[i].trap_type_id
                }
            })
                
            history.push({
                trap_placed: records[i].trap_placed,
                trap_type: data[0].vTrapName
            })
            
        }

        return history;
    }
    async getTreatmentHistory(siteid){
        let history = []
        let records = []

        records = await connection.select({
            from: this.taskTreatment,
            where: {
                siteid: siteid
            }
        })

        for(let i = 0; i<records.length; i++){
            let data = await connection.select({
                from: 'treatment_product',
                where: {
                    iTPId: records[i].tpid
                }
            })
            history.push({
                date: records[i].due_date,
                area: records[i].area_treated,
                area_unit: records[i].area,
                amount_applied: records[i].amount_applied,
                amount_unit: records[i].amount_unit,
                product: data[0].vName
            })
        }
        return history;
    }

    async getOtherHistory(siteid){
        let history = []
        let records = []

        records = await connection.select({
            from: this.taskOther,
            where: {
                siteid: siteid
            }
        })

        for(let i=0;i<records.length;i++){
            let data = await connection.select({
                from: 'task_type_mas',
                where: {
                    iTaskTypeId: records[i].task_type_id
                }
            })

            history.push({
                date: records[i].due_date,
                task: data[0].vTypeName
            })
        }
        return history;
    }
    updateLRSync(){
        return connection.update({
            in: this.taskLandingRate,
            set: {
                synced: 1,
            }
        })
    }
    updateLarvalSync(){
        return connection.update({
            in: this.taskLarval,
            set: {
                synced: 1,
            }
        })
    }
    updateTreatmentSync(){
        return connection.update({
            in: this.taskTreatment,
            set: {
                synced: 1,
            }
        })
    }
    updateTrapSync(){
        return connection.update({
            in: this.taskTrap,
            set: {
                synced: 1,
            }
        })
    }
    updateOtherSync(){
        return connection.update({
            in: this.taskOther,
            set: {
                synced: 1,
            }
        })
    }
}