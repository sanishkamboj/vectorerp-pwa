<template>
    <div>
        <div class="popup-overlay" :class="trapModal">
			<div class="popup-wrapper map-popup">
				<h3 class="popup-title desktop-view">Add Task Treatment <a @click="toggleTrapModal()" class="float-right"><i class="uil uil-times"></i></a></h3>
				<h5 class="mobile-view">
					<div class="mobile-title mb-3"><i class="fa fa-arrow-left"></i> Add Task Treatment</div>
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
                        <label for="exampleInputEmail1">Date Set</label>
                        <input type="date" class="form-control" id="site_name" v-model="trap_placed" placeholder="Enter Date">
                    </div>
                     <div class="col">
                        <label for="exampleInputEmail1">Date Collected</label>
                        <input type="date" class="form-control" id="site_name" v-model="trap_collected" placeholder="Enter Date">
                    </div>
                   
                   
                </div>
                <div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Trap Type</label>
                        <input type="text" class="form-control" id="site_name" v-model="trap_type_id" aria-describedby="ste_name" placeholder="Enter max Landing Rate">
                    </div>
                    <div class="col pt-10">
                        <label class="form-check-label" for="exampleInputEmail1">Did The Trap malfunction?</label>
                        <select class="form-control" v-model="malfunction_trap">
                            <option value="false">No</option>
                            <option value="true">Yes</option>
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
						<button type="button" @click="toggleTrapModal()" class="btn btn-red w-100">Cancel</button>
					</div>
				</div>
				</form>
				
			</div>
		</div>
    </div>
</template>
<script>
import { MapService } from "../service/map_service";

export default {
    name: "Treatment",
    data(){
       return {
        trapModal: 'd-none',
        siteid: null,
        srid: null,
        trap_placed: null,
        trap_collected: null,
        trap_type_id: null,
        malfunction_trap: null,
        note: null
       }
   },
    methods: {
        changeSpinnerStatus(status = false) {
            this.$store.dispatch('changeSpinnerStatus', status)
        },
        toggleTrapModal(siteid){
            this.changeSpinnerStatus(true)
            const currState = this.trapModal
            if(currState == 'd-none'){
                this.trapModal = 'new-site-modal'
                this.siteid = siteid
                this.changeSpinnerStatus()
            } else {
                this.trapModal = 'd-none'
                this.changeSpinnerStatus()
            }
        },
        async processForm(){
            this.changeSpinnerStatus(true)
            try{
                if(this.trap_placed == null){
                    this.$notify({ group: 'app', type: 'warn', text: 'Select Date Set' })
                    this.changeSpinnerStatus()
                    return;
                }
                
                const data = []
                data.siteid = this.siteid
                data.srid = parseInt(this.srid)
                data.trap_placed = this.trap_placed
                data.trap_collected = this.trap_collected
                data.trap_type_id = parseInt(this.trap_type_id)
                data.malfunction = Boolean(this.malfunction_trap)
                data.note = this.note
        
                await new MapService().addTaskTrap(data).then(result => {
                    console.log(result)
                    this.$notify({ group: 'app', text: 'Task Created Successfully' })
                    this.changeSpinnerStatus()
                    this.clearForm()
                    this.toggleTrapModal()
                });
                
            } catch(error){
                    this.$notify({ group: 'app', text: error})
                    this.changeSpinnerStatus()
            }
        },
        clearForm(){
            this.siteid = null
            this.srid = null
            this.type = null
            this.due_date = null
            this.start_date = null
            this.end_date = null
            this.product = null
            this.rate = null
            this.area_treated = null
            this.area_treated_unit = null
            this.amount_applied = null
            this.amount_applied_unit = null
        }
    }
}
</script>
<style>
.map-popup{
    width:550px !important;
}
</style>