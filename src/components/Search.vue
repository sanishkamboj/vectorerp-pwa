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
						<input type="text" class="form-control" v-model="siteName" id="formGroupExampleInput2" placeholder="Enter Site Name">
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
			siteName: null,
			pointPath: [],
			polygonPath: [],
			poly_line: [],
			pointArr: [],
			lineArr: [],
			polygonArr: []
		}
	},
	computed: {
		searchSidebar(){
			return this.$store.state.searchSidebar
		}
	},
	methods: {
		async searchSite(){
			this.$emit('showSite', [])
			this.$emit('changeLines', [])
			this.$emit('changePolygon', [])
			try {
				this.changeSpinnerStatus(true)
				let country = 'lee'
				//console.log(this.createSite);
				if(this.siteId != null){
					var siteID = parseInt(this.siteId)
					await new SiteDataService().getSiteById(siteID).then(res => {
						if(res.length){
							if(res[0].point !== undefined){
								let cordinates = JSON.parse(res[0].point)
								this.pointPath = {
											position: {
												lat: cordinates[0].lat,
												lng: cordinates[0].lng
											}
										}
								console.log(this.pointPath)
								this.$emit('showSite', this.pointPath)
							}
							if(res[0].polygon !== undefined){
								let cordinates = JSON.parse(res[0].polygon)
								let polyCenter = JSON.parse(res[0].polyCenter)
								var centPath = {
											position: {
												lat: polyCenter.lat,
												lng: polyCenter.lng
											}
										}
								this.polygonPath = cordinates
								this.$emit('showSite', centPath)
								this.$emit('changePolygon', this.polygonPath)
							}
							if(res[0].poly_line !== undefined){
								let cordinates = JSON.parse(res[0].poly_line)
								this.poly_line = cordinates
								console.log(cordinates)
								this.$emit('changeLines', this.poly_line)
							}
						} else {
							this.$notify({ group: 'app', type: 'warn', text: 'No site found please try another site id' })
						}
						//this.paths = this.center
						//this.edited = this.paths;
						this.changeSpinnerStatus()
					});
				} else if(this.siteName != null){
					var siteID = parseInt(this.siteId)
					await new SiteDataService().getSiteByName(this.siteName).then(res => {
						console.log(res)
						if(res.length){
							for(let i=0; i<res.length; i++){
								console.log(res[i])
								if(res[i].point !== undefined){
									let cordinates = JSON.parse(res[i].point)
									
									this.pointPath = {
												position: {
													lat: cordinates[0].lat,
													lng: cordinates[0].lng
												}
											}
									this.pointArr.push(this.pointPath)
									//this.$emit('showSite', this.pointPath)
								}
								if(res[i].polygon !== undefined){
									let cordinates = JSON.parse(res[i].polygon)
									let polyCenter = JSON.parse(res[i].polyCenter)
									console.log(cordinates)
									var centPath = {
												position: {
													lat: polyCenter.lat,
													lng: polyCenter.lng
												}
											}
									this.polygonPath = cordinates
									this.polygonArr.push(cordinates)
									//this.$emit('showSite', centPath)
									//this.$emit('changePolygon', this.polygonPath)
								}
								if(res[i].poly_line !== undefined){
									let cordinates = JSON.parse(res[i].poly_line)
									this.poly_line = cordinates
									console.log(cordinates)
									this.lineArr.push(cordinates)
									//this.$emit('changeLines', this.poly_line)
								}
							}
							this.$emit('showSite', this.pointArr)
							this.$emit('changeLines', this.lineArr)
							this.$emit('changePolygon', this.polygonArr)
							
						} else {
							this.$notify({ group: 'app', type: 'warn', text: 'No matching sites found. Please try with another name' })
						}
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