<template>
    <div class="right-section" :class="searchSidebar">
			
			<h3 class="popup-title desktop-view">Search <a class="float-right" @click="$store.commit('toggleSearchSideBar')"><i class="uil uil-times"></i></a></h3>
			<h5 class="mobile-view">
				<div class="mobile-title" @click="$store.commit('toggleSearchSideBar')"><i class="fa fa-arrow-left"></i> Search</div>
			</h5>
			<div id="accordion">
			<div class="card">

				
				<form>
					<div class="form-group">
						<label for="formGroupExampleInput">Site ID</label>
						<input type="text" class="form-control" v-model="siteId" id="formGroupExampleInput" placeholder="Enter Site ID">
					</div>
					<div class="form-group">
						<label for="formGroupExampleInput2">Site Name</label>
						<input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Enter Site Name">
					</div>
					<div class="form-group">
						<label for="formGroupExampleInput2">Address</label>
						<input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Enter Location">
					</div>
					<div class="form-group">
						<label for="formGroupExampleInput2">SR ID</label>
						<input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Enter sr id">
					</div>
				</form>
				</div>
				<div class="row pt-4">
				<div class="col">
					<button type="submit" @click="searchSite" class="btn btn-blue w-100">Submit</button>
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
	name: "Search", 
	data(){
		return {
			siteId: null, 
		}
	},
	computed: {
		searchSidebar(){
			return this.$store.state.searchSidebar
		}
	},
	methods: {
		async searchSite(){
			try {
				this.changeSpinnerStatus(true)
				let country = 'lee'
				//console.log(this.createSite);
				if(this.siteId != null){
					var siteID = parseInt(this.siteId)
					await new SiteDataService().getSiteById(siteID).then(res => {
						console.log(res)
						
						//this.paths = this.center
						//this.edited = this.paths;
						this.changeSpinnerStatus()
					});
				}
			} catch(error){
				this.changeSpinnerStatus()
				this.$notify({ group: 'app', type: 'warn', text: error })
			}
		},
		changeSpinnerStatus(status = false) {
			this.$store.dispatch('changeSpinnerStatus', status)
		},
	}

}
</script>