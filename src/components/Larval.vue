<template>
    <div>
        <div class="popup-overlay" :class="larvalModal">
			<div class="popup-wrapper map-popup">
				<h3 class="popup-title desktop-view">Add Landing Rate <a @click="toggleLarvalModal()" class="float-right"><i class="uil uil-times"></i></a></h3>
				<h5 class="mobile-view">
					<div class="mobile-title mb-3"><i class="fa fa-arrow-left"></i> Add Larval Surveillance</div>
				</h5>
				
				<form >
				<div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Site</label>
                        <input type="text" class="form-control" id="site_name" v-model="siteid" placeholder="Enter site Id" required />
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">SR ID</label>
                        <input type="text" class="form-control" id="site_name" v-model="srid"  placeholder="Enter SR ID">
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">Date</label>
                        <input type="date" class="form-control" id="site_name" v-model="due_added" placeholder="Enter Date">
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
                        <input type="text" class="form-control" id="dips"  placeholder="Enter Dips">
                    </div>
                   
                </div>
                <div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Genus 1</label>
                        <input type="text" class="form-control" id="site_name" v-model="max_landing_rate" aria-describedby="ste_name" placeholder="Enter max Landing Rate">
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">Count 1</label>
                        <input type="text" class="form-control" id="site_name" v-model="species_id" placeholder="Enter Species">
                    </div>
                </div>
                <div class="form-row pt-3 pl-1">
                    <div class="form-check form-check-inline">
                        <label for="exampleInputEmail1">Stages Found</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                    <label class="form-check-label" for="inlineCheckbox1">Eggs</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                    <label class="form-check-label" for="inlineCheckbox2">Instar1</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">
                    <label class="form-check-label" for="inlineCheckbox3">Instar2</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">
                    <label class="form-check-label" for="inlineCheckbox3">Instar2</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">
                    <label class="form-check-label" for="inlineCheckbox3">Instar2</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">
                    <label class="form-check-label" for="inlineCheckbox3">Instar2</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">
                    <label class="form-check-label" for="inlineCheckbox3">Instar2</label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Genus 2</label>
                        <input type="text" class="form-control" id="site_name" v-model="max_landing_rate" aria-describedby="ste_name" placeholder="Enter max Landing Rate">
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">Count 2</label>
                        <input type="text" class="form-control" id="site_name" v-model="species_id" placeholder="Enter Species">
                    </div>
                </div>
                <div class="form-row pt-3 pl-1">
                    <div class="form-check form-check-inline">
                        <label for="exampleInputEmail1">Stages Found</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                    <label class="form-check-label" for="inlineCheckbox1">Eggs</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                    <label class="form-check-label" for="inlineCheckbox2">Instar1</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">
                    <label class="form-check-label" for="inlineCheckbox3">Instar2</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">
                    <label class="form-check-label" for="inlineCheckbox3">Instar2</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">
                    <label class="form-check-label" for="inlineCheckbox3">Instar2</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">
                    <label class="form-check-label" for="inlineCheckbox3">Instar2</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">
                    <label class="form-check-label" for="inlineCheckbox3">Instar2</label>
                    </div>
                </div>

				<div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Note</label>
                        <textarea class="form-control" id="site_name" v-model="note" placeholder="Enter Note"></textarea>
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
        max_landing_rate: null,
        species: null,
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
        }
    }
}
</script>
<style>
.map-popup{
    width:700px !important;
}
</style>