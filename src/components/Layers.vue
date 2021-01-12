<template>
    <div class="right-section" :class="layerSidebar">
			
			<h3 class="popup-title desktop-view">Layers <a class="float-right" @click="$store.commit('toggleLayerSideBar')"><i class="uil uil-times"></i></a></h3>
			<h5 class="mobile-view">
				<div class="mobile-title" @click="$store.commit('toggleLayerSideBar')"><i class="fa fa-arrow-left"></i> Layers</div>
			</h5>
			<div id="accordion">
			<div class="card">

				
				<form>
					<div class="form-check">
                        <input type="checkbox" class="form-check-input" v-model="sr" id="formGroupExampleInput">
						<label for="formGroupExampleInput">Service Request</label>
						
					</div>
					<div class="form-check">
                        <input type="checkbox" class="form-check-input" v-model="rate" id="formGroupExampleInput2">
						<label for="formGroupExampleInput2">Landing Rate</label>
						
					</div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" v-model="ldata" id="formGroupExampleInput3">
						<label for="formGroupExampleInput3">Larval Data</label>
						
					</div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" v-model="positive" id="formGroupExampleInput4">
						<label for="formGroupExampleInput4">Positive</label>
						
					</div>
				</form>
				</div>
				<div class="row pt-4">
				<div class="col">
					<button type="submit" class="btn btn-blue w-100">Submit</button>
				</div>
				<div class="col">
					<button type="submit" class="btn btn-red w-100">Clear</button>
				</div>
			</div>
			
			
			</div>
		</div>
</template>
<script>
import { SiteDataService } from "../service/siteData_service";

export default {
	name: "Layers", 
	data(){
		return {
            API_URL: this.$store.state.API_URL,
            sr: null,
            rate: null,
            ldata: null,
            positive: null

		}
	},
	computed: {
		layerSidebar(){
			return this.$store.state.layerSidebar
		}
    }
}
</script>