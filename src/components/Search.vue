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
						<gmap-autocomplete
						placeholder="Enter Address"
						class="form-control"
						
						@place_changed="setAddress"
						>
						</gmap-autocomplete>
					</div>
					<div class="form-group">
						<label for="formGroupExampleInput2">SR ID</label>
						<input type="text" class="form-control" v-model="srid" id="formGroupExampleInput2" placeholder="Enter sr id">
					</div>
				</form>
				</div>
				<div class="row pt-4">
				<div class="col">
					<button type="submit" @click="searchSite" class="btn btn-blue w-100">Submit</button>
				</div>
				<div class="col">
					<button type="submit" @click="clearFields" class="btn btn-red w-100">Clear</button>
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
			API_URL: this.$store.state.API_URL,
			siteId: null, 
			siteName: null,
			siteAddr: null,
			
			polygonPath: [],
			poly_line: [],
			pointArr: [],
			lineArr: [],
			polygonArr: [],
			address: null,
			srid: ''
		}
	},
	computed: {
		searchSidebar(){
			return this.$store.state.searchSidebar
		}
	},
	methods: {
		setAddress(place) {
			console.log(place)
			this.address = place
		},
		async searchSite(){
			this.$emit('showSite', [])
			this.$emit('changeLines', [])
			this.$emit('changePolygon', [])
			this.$store.commit('toggleSearchSideBar')
			try {
				this.changeSpinnerStatus(true)
				let country = 'lee'
				//console.log(this.createSite);
				if(this.siteId){
					
					var siteID = parseInt(this.siteId)
					await new SiteDataService().getSiteById(siteID).then(res => {
						
						if(res.length){
							if(res[0].point !== undefined){
								let cordinates = JSON.parse(res[0].point)
								let pointPath = []
								pointPath.push( {
											position: cordinates[0],
											icon: res[0].icon,
											siteid: res
										})
								console.log(pointPath)
								this.$emit('changeMarkers', pointPath)
							}
							if(res[0].polygon !== undefined){
								let cordinates = JSON.parse(res[0].polygon)
								let polyCenter = JSON.parse(res[0].polyCenter)
								let pointPath = []
								pointPath.push( {
											position: polyCenter,
											icon: res[0].icon,
											siteid: res
										})
								
								this.$emit('showSite', pointPath)
								
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
				} else if(this.siteName){
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
												},
												icon: res[i].icon,
												siteid: res[i]
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
				} else if(this.address){
					const url = `${this.API_URL}/user/search-site?country=`+country
					await this.$http.post(url, {
						lat: '41.634819',
						lng: '-72.994825'
					})
					.then(response => {
						console.log(response)
						let siteMarker = [];
						let siteLines = [];
						let sitePolygon = [];
						if(response.data.status == 200){
							this.changeSpinnerStatus()
							let sites = response.data.data.sites
							sites.map((obj, idx) => {
								if(obj.point !== undefined) {
								
								 siteMarker.push({ position: obj.point[0], icon: obj.icon})
									
								}
							})
							console.log(siteMarker)
							this.$emit('changeMarkers', siteMarker)
							this.$emit('changeLines', siteLines)
							this.$emit('changePolygon', this.zoneData)
						} else {
							this.changeSpinnerStatus()
						}
						
					})
					.catch(function (error) {
						console.log(error)
						//this.$notify({ group: 'app', type: 'warn', text: 'Data import error. resync again' })
					});
				} else if(this.srid){ 
					const url = `${this.API_URL}/user/get-sr/`+this.srid+`?country=`+country
					await this.$http.get(url)
					.then(response => {
						console.log(response)
						let siteMarker = [];
						let siteLines = [];
						let sitePolygon = [];
						if(response.data.status == 200){
							this.changeSpinnerStatus()
							let site = response.data.data[0]

								siteMarker.push({ position: site.point[0], 
								icon: site.icon,
								content: site.infowindow
								})
							
							
							console.log(siteMarker)
							this.$emit('changeMarkers', siteMarker)
							
						} else {
							this.changeSpinnerStatus()
							this.$notify({ group: 'app', type: 'warn', text: 'No data found please try another' })
						}
						
					})
					.catch(function (error) {
						console.log(error)
						//this.$notify({ group: 'app', type: 'warn', text: 'Data import error. resync again' })
					});
				} else {
					this.changeSpinnerStatus()
					this.$notify({ group: 'app', type: 'warn', text: 'Please enter site detail' })
				}
			} catch(error){
				this.changeSpinnerStatus()
				this.$notify({ group: 'app', type: 'warn', text: error })
			}
		},
		changeSpinnerStatus(status = false) {
			this.$store.dispatch('changeSpinnerStatus', status)
		},
		clearFields(){
		this.changeSpinnerStatus(true)
		this.$emit('changeMarkers', [])
		this.$emit('changeLines', [])
		this.$emit('changePolygon', [])
		this.siteName = null
		this.siteId = null
		this.address = null
		this.siteAddr = null
		this.srid = null
		this.changeSpinnerStatus()
		this.$notify({ group: 'app', text: 'Fields Cleared' })
	  },
	}

}
</script>