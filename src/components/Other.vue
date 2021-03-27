<template>
    <div>
        <div class="popup-overlay" :class="otherModal">
			<div class="popup-wrapper map-popup">
				<h3 class="popup-title desktop-view">Add Task Other <a @click="toggleOtherModal()" class="float-right"><i class="uil uil-times"></i></a></h3>
				<h5 class="mobile-view">
					<div class="mobile-title mb-3" @click="toggleOtherModal()"><i class="fa fa-arrow-left"></i> Add Task Other</div>
				</h5>
				
				<form @submit.prevent="processForm">
				<div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Site</label>
                        <input type="text" class="form-control" id="site_name" v-model="siteid" placeholder="Enter site Id" required />
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">SR ID</label>
                        <input type="text" class="form-control" id="site_name" v-model="srid"  placeholder="Enter SR ID">
                    </div>
				</div>
                <div class="form-row">
                     <div class="col">
                        <label for="exampleInputEmail1">Date</label>
                        <input type="date" class="form-control" id="site_name" v-model="due_date" placeholder="Enter Date">
                    </div>
				</div>
                <div class="form-row">
                     <div class="col">
                        <label for="exampleInputEmail1">Start Time</label>
                        <input type="time" class="form-control" id="site_name" v-model="start_date" placeholder="Enter Start time">
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">End Time</label>
                        <input type="time" class="form-control" id="site_name" v-model="end_date" placeholder="Enter End Time">
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">Task Type</label>
                        <select v-model="task_type_id" class="form-control">
                            <option v-for="p in types" :key=p.iTaskTypeId :value="p.iTaskTypeId">{{p.vTypeName}}</option>
                        </select>
                    </div>
                   
                </div>
                <div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Note</label>
                        <textarea class="form-control" v-model="note" placeholder="Enter Note"></textarea>
                    </div>
                </div>


				<div class="row pt-2">
					<div class="col">
						<button class="btn btn-blue w-100">Submit</button>
					</div>
					<div class="col">
						<button type="button" @click="toggleOtherModal()" class="btn btn-red w-100">Cancel</button>
					</div>
				</div>
				</form>
				
			</div>
		</div>
    </div>
</template>
<script>
import { MapService } from "../service/map_service";
import { TaskTypeService } from "../service/taskType_service";
export default {
    name: "Other",
    data(){
       return {
        types: {},
        otherModal: 'd-none',
        siteid: null,
        srid: null,
        due_date: null,
        start_date: null,
        end_date: null,
        task_type_id: null,
        note: null
       }
   },
   created(){
      new TaskTypeService().getTaskTypes().then(res => {
          this.types = res
	  })
	  
  },
    methods: {
        changeSpinnerStatus(status = false) {
            this.$store.dispatch('changeSpinnerStatus', status)
        },
        toggleOtherModal(siteid){
            this.changeSpinnerStatus(true)
            const currState = this.otherModal
            if(currState == 'd-none'){
                this.otherModal = 'new-site-modal'
                this.siteid = siteid
                this.changeSpinnerStatus()
            } else {
                this.otherModal = 'd-none'
                this.changeSpinnerStatus()
            }
        },
        async processForm(){
            this.changeSpinnerStatus(true)
            try{
                let user = localStorage.getItem('user')
                var startTime = new Date().setHours(this.GetHours(this.start_date), this.GetMinutes(this.start_date), 0);
                var endTime = new Date(startTime)
                endTime = endTime.setHours(this.GetHours(this.end_date), this.GetMinutes(this.end_date), 0);
                if (startTime > endTime) {
                    
                    this.$notify({ group: 'app', type: 'warn', text: 'Start Time is greater than end time' })
                    this.changeSpinnerStatus()
                    return;
                }
                const data = {}
                data.siteid = this.siteid
                data.srid = parseInt(this.srid)
                data.due_date = this.due_date
                data.start_date = this.start_date
                data.end_date = this.end_date
                data.task_type_id = this.task_type_id
                data.note = this.note
                data.userid = user.iUserId
                await new MapService().addTaskOther(data).then(result => {
                    console.log(result)
                    this.$notify({ group: 'app', text: 'Task Created Successfully' })
                    this.changeSpinnerStatus()
                    this.clearForm()
                    this.toggleOtherModal()
                });
                
            } catch(error){
                    this.$notify({ group: 'app', text: error})
                    this.changeSpinnerStatus()
            }
        },
        clearForm(){
            this.siteid = null
            this.srid = null
            this.due_date = null
            this.start_date = null
            this.end_date = null
            this.task_type_id = null
            this.note = null
        },
        GetHours(d) {
            var h = parseInt(d.split(':')[0]);
            if (d.split(':')[1].split(' ')[1] == "PM") {
                h = h + 12;
            }
            return h;
        },
        GetMinutes(d) {
            return parseInt(d.split(':')[1].split(' ')[0]);
        }
    }
}
</script>
<style>
.map-popup{
    width:550px !important;
}
</style>