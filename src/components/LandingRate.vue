<template>
    <div>
        <div class="popup-overlay" :class="landingRateModal">
			<div class="popup-wrapper map-popup">
				<h3 class="popup-title desktop-view">Add Task Landing Rate <a @click="toggleLandingRateModal()" class="float-right"><i class="uil uil-times"></i></a></h3>
				<h5 class="mobile-view">
					<div class="mobile-title mb-3"><i class="fa fa-arrow-left"></i> Add Task Landing Rate</div>
				</h5>
				
				<form @submit.prevent="processForm">
				<div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Site</label>
                        <input type="text" class="form-control" v-model="siteid" placeholder="Enter site Id" readonly />
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">SR ID</label>
                        <input type="text" class="form-control"  v-model="srid"  placeholder="Enter SR ID">
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">Date</label>
                        <input type="date" class="form-control" v-model="due_date" placeholder="Enter Date" required />
                    </div>
				</div>
                <div class="form-row">
                     <div class="col">
                        <label for="exampleInputEmail1">Start Time</label>
                        <input type="time" class="form-control"  v-model="start_date" placeholder="Enter Start time">
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">End Time</label>
                        <input type="time" class="form-control"  v-model="end_date" placeholder="Enter End Time">
                    </div>
                   
                </div>
                <div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Max Landing rate</label>
                        <select class="form-control" v-model="max_landing_rate">
                            <option value="">Select Landing Rate</option>
                            <option value="0-Found">0-Found</option>
                            <option value="1-5">1-5</option>
                            <option value="6-10">6-10</option>
                            <option value="11-20">11-20</option>
                            <option value="21-50">21-50</option>
                            <option value="51-100">51-100</option>
                            <option value="100+">100+</option>
                        </select>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">Species</label>
                        <select v-model="species_id" class="form-control">
                            <option v-for="r in species" :key=r.iMSpeciesId :value="r.iMSpeciesId">{{r.tDescription}}</option>
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
						<button type="button" @click="toggleLandingRateModal()" class="btn btn-red w-100">Cancel</button>
					</div>
				</div>
				</form>
				
			</div>
		</div>
    </div>
</template>
<script>
import { MapService } from "../service/map_service";
import { SpeciesService } from "../service/species_service";
export default {
    name: "LandingRate",
    data(){
       return {
        species: [],
        landingRateModal: 'd-none',
        siteid: null,
        srid: null,
        due_date: null,
        start_date: null,
        end_date: null,
        max_landing_rate: null,
        species_id: null,
        note: null
       }
   },
    created(){
      new SpeciesService().getSpecies().then(res => {
          this.species = res
          console.log(res)
	  })
	  
  },
    methods: {

        changeSpinnerStatus(status = false) {
            this.$store.dispatch('changeSpinnerStatus', status)
        },
        toggleLandingRateModal(siteid){
            this.changeSpinnerStatus(true)
            const currState = this.landingRateModal
            if(currState == 'd-none'){
                this.landingRateModal = 'new-site-modal'
                this.siteid = siteid
                this.changeSpinnerStatus()
            } else {
                this.landingRateModal = 'd-none'
                this.changeSpinnerStatus()
            }
        },
        async processForm(){
            this.changeSpinnerStatus(true)
            try{
                if(this.due_date == null){
                    this.$notify({ group: 'app', type: 'warn', text: 'Select Due Date' })
                    this.changeSpinnerStatus()
                    return;
                }
                if(this.start_date == null){
                    this.$notify({ group: 'app', type: 'warn', text: 'Select Start Time' })
                    this.changeSpinnerStatus()
                    return;
                }
                if(this.end_date == null){
                    this.$notify({ group: 'app', type: 'warn', text: 'Select End Time' })
                    this.changeSpinnerStatus()
                    return;
                }
                const data = []
                data.siteid = this.siteid
                data.srid = parseInt(this.srid)
                data.due_date = this.due_date
                data.start_date = this.start_date
                data.end_date = this.end_date
                if(this.max_landing_rate != ''){
                    data.max_landing_rate = this.max_landing_rate
                }
                if(this.species_id != ''){
                    data.species_id = this.species_id
                }
                if(this.note != ''){
                    data.note = this.note
                }
                await new MapService().addTaskLandingRate(data).then(result => {
                    console.log(result)
                    this.$notify({ group: 'app', text: 'Task Created Successfully' })
                    this.changeSpinnerStatus()
                    this.clearForm()
                    this.toggleLandingRateModal()
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
            this.max_landing_rate = null
            this.species_id = null
            this.note = null
        }
    }
}
</script>
<style>
.map-popup{
    width:550px !important;
}
</style>