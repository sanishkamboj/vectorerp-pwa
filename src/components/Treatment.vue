<template>
    <div>
        <div class="popup-overlay" :class="treatmentModal">
			<div class="popup-wrapper map-popup">
				<h3 class="popup-title desktop-view">Add Task Treatment <a @click="toggleTreatmentModal()" class="float-right"><i class="uil uil-times"></i></a></h3>
				<h5 class="mobile-view">
					<div class="mobile-title mb-3"><i class="fa fa-arrow-left"></i> Add Task Treatment</div>
				</h5>
				
				<form @submit.prevent="processForm">
				<div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Site</label>
                        <input type="text" class="form-control" v-model="siteid" placeholder="Enter site Id" readonly />
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">SR ID</label>
                        <input type="text" class="form-control" v-model="srid"  placeholder="Enter SR ID">
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">Date</label>
                        <input type="date" class="form-control" v-model="due_date" placeholder="Enter Date" required>
                    </div>
				</div>
                <div class="form-row">
                     <div class="col">
                        <label for="exampleInputEmail1">Type</label>
                        <select class="form-control" v-model="type" required>
                            <option value="">Select</option>
                            <option value="Spot Treatment">Spot Treatment</option>
                            <option value="Aerial Larviciding">Aerial Larviciding</option>
                            <option value="Aerial Adulticiding">Aerial Adulticiding</option>
                            <option value="Ground Larviciding">Ground Larviciding</option>
                            <option value="Ground Adulticiding">Ground Adulticiding</option>
                            <option value="ATV/UTV Mounted ULV">ATV/UTV Mounted ULV</option>
                            <option value="Backpack ULV">Backpack ULV</option>
                            <option value="Handheld ULV">Handheld ULV</option>
                            <option value="Hand Application">Hand Application</option>
                            <option value="Hand Thermal">Hand Thermal</option>
                            <option value="Truck Mounted ULV">Truck Mounted ULV</option>
                        </select>
                    </div>
                     <div class="col">
                        <label for="exampleInputEmail1">Start Time</label>
                        <input type="time" class="form-control" v-model="start_date" placeholder="Enter Start time" required>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">End Time</label>
                        <input type="time" class="form-control"  v-model="end_date" placeholder="Enter End Time" required>
                    </div>
                   
                </div>
                <div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Treatment Product</label>
                        <select v-model="product" class="form-control">
                            <option v-for="p in products" :key=p.iTPId :value="p.iTPId">{{p.vName}}</option>
                        </select>
                       
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">Application Rate</label>
                        <input type="text" class="form-control" v-model="rate" placeholder="Enter Rate">
                    </div>
                </div>
				<div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Area Treated</label>
                        <input type="text" class="form-control" v-model="area_treated" placeholder="Enter Area Treated"> 
                    </div>
                    <div class="col">
                         <label for="exampleInputEmail1"> </label>
                        <select class="form-control" v-model="area_treated_unit">
                            <option value="acre">acre</option>
                            <option value="sqft">sqft</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Amount Applied</label>
                        <input type="text" class="form-control"  v-model="amount_applied" placeholder="Enter Amount Applied">
                        
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1"> </label>
                        <select class="form-control" v-model="amount_applied_unit">
                            <option value="cup">cup</option>
                            <option value="fl. oz">fl. oz</option>
                            <option value="gal">gal</option>
                            <option value="l">l</option>
                            <option value="ml">ml</option>
                            </select>
                    </div>
                </div>
				<div class="row pt-2">
					<div class="col">
						<button class="btn btn-blue w-100">Submit</button>
					</div>
					<div class="col">
						<button type="button" @click="toggleTreatmentModal()" class="btn btn-red w-100">Cancel</button>
					</div>
				</div>
				</form>
				
			</div>
		</div>
    </div>
</template>
<script>
import { MapService } from "../service/map_service";
import { ProductService } from "../service/product_service";

export default {
    name: "Treatment",
    data(){
       return {
        products: {},
        treatmentModal: 'd-none',
        siteid: null,
        srid: null,
        due_date: null,
        type: null,
        start_date: null,
        end_date: null,
        product: null,
        rate: null,
        area_treated: null,
        area_treated_unit: null,
        amount_applied: null,
        amount_applied_unit: null
       }
   },
   created(){
      new ProductService().getProducts().then(res => {
          this.products = res
          console.log(res)
	  })
	  
  },
    methods: {
        changeSpinnerStatus(status = false) {
            this.$store.dispatch('changeSpinnerStatus', status)
        },
        toggleTreatmentModal(siteid){
            this.changeSpinnerStatus(true)
            const currState = this.treatmentModal
            if(currState == 'd-none'){
                this.treatmentModal = 'new-site-modal'
                this.siteid = siteid
                this.changeSpinnerStatus()
            } else {
                this.treatmentModal = 'd-none'
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
                const data = {}
                data.siteid = this.siteid
                data.srid = parseInt(this.srid)
                data.due_date = this.due_date
                data.type = this.type
                data.start_date = this.start_date
                data.end_date = this.end_date
                data.tpid = parseInt(this.product)
                data.area_treated = this.area_treated
                data.amount_applied = this.amount_applied
        
                await new MapService().addTaskTreatment(data).then(result => {
                    console.log(result)
                    this.$notify({ group: 'app', text: 'Task Created Successfully' })
                    this.changeSpinnerStatus()
                    this.clearForm()
                    this.toggleTreatmentModal()
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