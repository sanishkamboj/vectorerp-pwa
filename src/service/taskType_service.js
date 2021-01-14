import { connection } from "./jsstore_con";

export class TaskTypeService {

    constructor() {

        this.tableName = "task_type_mas";
    }

    async getTaskTypes() {
        return connection.select({
            from: this.tableName,
        })
    }

    addTaskType(data) {
        return connection.insert({
            into: this.tableName,
            values: [data],
            //skipDataCheck: true
        })
    }

    getTaskTypesById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }
}