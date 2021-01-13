<template>
    <div>
        <div class="popup-overlay" :class="larvalModal">
			<div class="popup-wrapper larval-map-popup">
				<h3 class="popup-title desktop-view">Add Landing Rate <a @click="toggleLarvalModal()" class="float-right"><i class="uil uil-times"></i></a></h3>
				<h5 class="mobile-view">
					<div class="mobile-title mb-3"><i class="fa fa-arrow-left"></i> Add Larval Surveillance</div>
				</h5>
				
				<form @submit.prevent="processForm">
				<div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Site</label>
                        <input type="text" class="form-control" id="site_name" v-model="siteid" placeholder="Enter site Id" readonly />
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">SR ID</label>
                        <input type="text" class="form-control" id="site_name" v-model="srid"  placeholder="Enter SR ID">
                    </div>
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
                        <label for="exampleInputEmail1">Dips</label>
                        <input type="text" class="form-control" v-model="dips"  placeholder="Enter Dips">
                    </div>
                   
                </div>
                <div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Genus 1</label>
                        <input type="text" class="form-control" v-model="genus1" aria-describedby="ste_name" placeholder="Enter max Landing Rate">
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">Count 1</label>
                        <input type="text" class="form-control" v-model="count1" placeholder="Enter Species">
                    </div>
                </div>
                <div class="form-row pt-3 pl-1">
                    <div class="form-check form-check-inline">
                        <label for="exampleInputEmail1">Stages Found</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" v-model="eggs" id="inlineCheckbox1">
                    <label class="form-check-label" for="inlineCheckbox1">Eggs</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" v-model="instar1" id="inlineCheckbox2">
                    <label class="form-check-label" for="inlineCheckbox2">Instar1</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" v-model="instar2">
                    <label class="form-check-label" for="inlineCheckbox3">Instar2</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" v-model="instar3" >
                    <label class="form-check-label" for="inlineCheckbox3">Instar3</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" v-model="instar4" >
                    <label class="form-check-label" for="inlineCheckbox3">Instar4</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" v-model="pupae" >
                    <label class="form-check-label" for="inlineCheckbox3">Pupae</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" v-model="adult">
                    <label class="form-check-label" for="inlineCheckbox3">adult</label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Genus 2</label>
                        <input type="text" class="form-control" v-model="genus2" placeholder="Enter Genus">
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">Count 2</label>
                        <input type="text" class="form-control" v-model="count2" placeholder="Enter Count">
                    </div>
                </div>
                <div class="form-row pt-3 pl-1">
                    <div class="form-check form-check-inline">
                        <label for="exampleInputEmail1">Stages Found</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" v-model="eggs2" id="inlineCheckbox1" >
                    <label class="form-check-label" for="inlineCheckbox1">Eggs</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" v-model="instar12" id="inlineCheckbox2">
                    <label class="form-check-label" for="inlineCheckbox2">Instar1</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" v-model="instar22" id="inlineCheckbox3" >
                    <label class="form-check-label" for="inlineCheckbox3">Instar2</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" v-model="instar32" id="inlineCheckbox4" >
                    <label class="form-check-label" for="inlineCheckbox3">Instar3</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" v-model="instar42" id="inlineCheckbox5">
                    <label class="form-check-label" for="inlineCheckbox3">Instar4</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" v-model="pupae2" id="inlineCheckbox6">
                    <label class="form-check-label" for="inlineCheckbox3">pupae</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" v-model="adult2" id="inlineCheckbox7">
                    <label class="form-check-label" for="inlineCheckbox3">Adult</label>
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
						<button type="button" @click="toggleLarvalModal()" class="btn btn-red w-100">Cancel</button>
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
    name: "Larval",
    data(){
       return {
        larvalModal: 'd-none',
        siteid: null,
        srid: null,
        due_date: null,
        start_date: null,
        end_date: null,
        dips: null,
        genus1: null,
        count1: null,
        eggs: null,
        instar1: null,
        instar2: null,
        instar3: null,
        instar4: null,
        pupae: null,
        adult: null,
        genus2: null,
        count2: null,
        eggs2: null,
        instar12: null,
        instar22: null,
        instar32: null,
        instar42: null,
        pupae2: null,
        adult2: null,
        note: null

        
       }
   },
    methods: {
        changeSpinnerStatus(status = false) {
            this.$store.dispatch('changeSpinnerStatus', status)
        },
        toggleLarvalModal(siteid){
            this.changeSpinnerStatus(true)
            const currState = this.larvalModal
            if(currState == 'd-none'){
                this.larvalModal = 'new-site-modal'
                this.siteid = siteid
                this.changeSpinnerStatus()
            } else {
                this.larvalModal = 'd-none'
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
                data.dips = parseInt(this.dips)
                data.genus = this.genus1
                data.count= parseInt(this.count1)
                data.eggs = this.eggs
                data.binstar1 = this.instar1
                data.binstar2 = this.instar2
                data.binstar3 = this.instar3
                data.binstar4 = this.instar4
                data.Pupae = this.pupae
                data.Adult = this.adult
                data.genus2 = this.genus2
                data.count2 = parseInt(this.count2)
                data.eggs2 = this.eggs2
                data.Instar12 = this.instar12
                data.Instar22 = this.instar22
                data.Instar32 = this.instar32
                data.Instar42 = this.instar42
                data.Pupae2 = this.pupae2
                data.Adult2 = this.adult2
                data.note = this.note
                await new MapService().addTasklarval(data).then(result => {
                    console.log(result)
                    this.$notify({ group: 'app', text: 'Task Created Successfully' })
                    this.changeSpinnerStatus()
                    this.clearForm()
                    this.toggleLarvalModal()
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
            this.dips = null
            this.genus1 = null
            this.count1 = null
            this.eggs = null
            this.instar1 = null
            this.instar2 = null
            this.instar3 = null
            this.instar4 = null
            this.pupae = null
            this.adult = null
            this.genus2 = null
            this.count2 = null
            this.eggs2 = null
            this.instar12 = null
            this.instar22 = null
            this.instar32 = null
            this.instar42 = null
            this.pupae2 = null
            this.adult2 = null
            this.note = null
        }
    }
}
</script>
<style>
.larval-map-popup{
    width:700px !important;
}
</style>