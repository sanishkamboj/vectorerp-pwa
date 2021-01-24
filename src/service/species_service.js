import { connection } from "./jsstore_con";

export class SpeciesService {

    constructor() {

        this.tableName = "species";
    }

    async getSpecies() {
        return connection.select({
            from: this.tableName,
        })
    }

    addSpecies(data) {
        return connection.insert({
            into: this.tableName,
            values: [data],
            //skipDataCheck: true
        })
    }

    getSpeciesById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }
    async clearRecords(){
        await connection.clear(this.tableName);
    }
}