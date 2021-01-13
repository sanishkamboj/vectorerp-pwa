<template>
    <div>
        <div class="popup-overlay" :class="otherModal">
			<div class="popup-wrapper map-popup">
				<h3 class="popup-title desktop-view">Add Task Other <a @click="toggleOtherModal()" class="float-right"><i class="uil uil-times"></i></a></h3>
				<h5 class="mobile-view">
					<div class="mobile-title mb-3"><i class="fa fa-arrow-left"></i> Add Task Other</div>
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
                        <input type="date" class="form-control" id="site_name" v-model="due_date" placeholder="Enter Date">
                    </div>
				</div>
                <div class="form-row">
                     <div class="col">
                        <label for="exampleInputEmail1">Type</label>
                        <input type="text" class="form-control" id="site_name" v-model="due_date" placeholder="Enter Date">
                    </div>
                     <div class="col">
                        <label for="exampleInputEmail1">Start Time</label>
                        <input type="time" class="form-control" id="site_name" v-model="start_date" placeholder="Enter Start time">
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">End Time</label>
                        <input type="time" class="form-control" id="site_name" v-model="end_date" placeholder="Enter End Time">
                    </div>
                   
                </div>
                <div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Treatment Product</label>
                        <input type="text" class="form-control" id="site_name" v-model="max_landing_rate" aria-describedby="ste_name" placeholder="Enter max Landing Rate">
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">Application Rate</label>
                        <input type="text" class="form-control" id="site_name" v-model="species_id" placeholder="Enter Species">
                    </div>
                </div>
				<div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Area Treated</label>
                        <input type="text" class="form-control" id="site_name" v-model="max_landing_rate" aria-describedby="ste_name" placeholder="Enter max Landing Rate"> 
                    </div>
                    <div class="col">
                         <label for="exampleInputEmail1"> </label>
                        <select class="form-control">
                            <option>acre</option>
                            </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Amount Applied</label>
                        <input type="text" class="form-control" id="site_name" v-model="species_id" placeholder="Enter Species">
                        
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1"> </label>
                        <select class="form-control">
                            <option>acre</option>
                            </select>
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
export default {
    name: "Other",
    data(){
       return {
        otherModal: 'd-none',
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
        }
    }
}
</script>
<style>
.map-popup{
    width:550px !important;
}
</style>