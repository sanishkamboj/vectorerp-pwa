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
					<button type="submit" @click="processForm()" class="btn btn-blue w-100">Submit</button>
				</div>
				<div class="col">
					<button type="button" @click="clearForm()" class="btn btn-red w-100">Clear</button>
				</div>
			</div>
			
			
			</div>
		</div>
</template>
<script>
import { SiteDataService } from "../service/siteData_service";
import { SrDetailService } from "../service/srDetail_service";
import { MapService } from "../service/map_service";

export default {
	name: "Layers", 
	data(){
		return {
            API_URL: this.$store.state.API_URL,
            sr: null,
            rate: null,
            ldata: null,
			positive: null,
			zoneData: []

		}
	},
	computed: {
		layerSidebar(){
			return this.$store.state.layerSidebar
		}
	},
	methods: {
		changeSpinnerStatus(status = false) {
            this.$store.dispatch('changeSpinnerStatus', status)
        },
		clearForm(){
			this.sr = null
            this.rate = null
            this.ldata = null
            this.positive = null
		},
		async processForm(){
			try{
				const country = localStorage.getItem('country')
				this.changeSpinnerStatus(true)
				this.$store.commit('toggleLayerSideBar')
				this.$store.dispatch('loadingText', 'Fetching Data...');
				if(this.sr){
					await new SrDetailService().getSrDetails().then(res => {
						
						let points = []
						res.map(function(_r){
							
							let icon = ''
							let infoWindowHtml = ''
							let status = ''
							let vRequestType =''
							if(_r.iStatus == 1){
								icon = "https://"+country+".vectorcontrolsystem.com/images/sr_red.png";
								status = 'Draft'
							} else if(_r.iStatus == 2){
								icon = "https://"+country+".vectorcontrolsystem.com/images/sr_yellow.png";
								status = 'Assigned'
							} else if(_r.iStatus == 3){
								icon = "https://"+country+".vectorcontrolsystem.com/images/sr_green.png";
								status = 'Review'
							} else if(_r.iStatus == 4){
								icon = "https://"+country+".vectorcontrolsystem.com/images/sr_black.png";
								status = 'Complete'
							}
							if(_r.bMosquitoService) {
								vRequestType = 'Mosquito Inspection/Treatment';
							}else if(_r.bMosquitoService && _r.bCarcassService) {
								vRequestType = 'Carcass Removal';
							}else if(_r.bMosquitoService && _r.bCarcassService) {
								vRequestType = 'Mosquito Inspection/Treatment | Carcass Removal';
							}
							infoWindowHtml = `<div><div cellpadding="5" cellspacing="5" class="info_box" id="info_box"><h5 class="border-bottom pb-2 mb-3">SR Id `+_r.iSRId+` ()</h5><div class="d-flex"><h6>`+vRequestType+`</h6></div><div class="d-flex"><span>`+_r.vStreet+`  </span></div><div class="d-flex"><b>Assign To : </b>&nbsp;<span> </span></div><div class="d-flex"><b>Status : </b>&nbsp;<span>`+status+`</span></div><div class="button mt-3"><a class="btn btn-primary  mr-2 text-white" href="https://`+country+`.vectorcontrolsystem.com/sr/edit&amp;mode=Update&amp;iSRId=`+_r.iSRId+`" target="_blank">Edit SR</a></div></div></div>`
							let point = {
								position: {
									lat: parseFloat(_r.vLatitude),
									lng: parseFloat(_r.vLongitude)
								},
								icon: icon,
								content: infoWindowHtml
							}
							points.push(point)
						})
						console.log(points)
						this.$emit('changeMarkers', points)
						this.changeSpinnerStatus()
					})
				} 
				if(this.rate){
					let siteMarker = [];
					let siteLines = [];
					let sitePolygon = [];
					await new MapService().getTaskLandingRate().then(result => {
						if(result.length){
							let _this = this
							result.map(function(_r){
								if(_r.point !== undefined) {
									let point = JSON.parse(_r.point);
									point.map((pts) => {
										siteMarker.push({ position: pts, icon:_r.icon})
									})
								}
								if(_r.poly_line !== undefined) {
									let poly_line = JSON.parse(_r.poly_line);
									poly_line.map((pts) => {
										siteLines.push(pts)
									})
									//siteLines.push(poly_line)          		
								}
								if(_r.polygon !== undefined) {
									let polygon = JSON.parse(_r.polygon);
									_this.zoneData.push(polygon) 
									if(_r.polyCenter != undefined){
										let polyCenter = JSON.parse(_r.polyCenter)
										console.log(polyCenter)  
										siteMarker.push({ position: polyCenter, icon:_r.icon, siteid: _r})
										
									}         		
								}
							})
							
						} else {
							this.$notify({ group: 'app', type: 'warn', text: 'No Records Found' })
							this.changeSpinnerStatus()
						}
					})
					this.$emit('changeMarkers', siteMarker)
					this.$emit('changeLines', siteLines)
					this.$emit('changePolygon', this.zoneData)
					this.changeSpinnerStatus()
				}
				if(this.ldata){
					let siteMarker = [];
					let siteLines = [];
					let sitePolygon = [];
					await new MapService().getTaskLarval().then(result => {
						if(result.length){
							let _this = this
							result.map(function(_r){
								if(_r.point !== undefined) {
									let point = JSON.parse(_r.point);
									point.map((pts) => {
										siteMarker.push({ position: pts, icon:_r.icon})
									})
								}
								if(_r.poly_line !== undefined) {
									let poly_line = JSON.parse(_r.poly_line);
									poly_line.map((pts) => {
										siteLines.push(pts)
									})
									//siteLines.push(poly_line)          		
								}
								if(_r.polygon !== undefined) {
									let polygon = JSON.parse(_r.polygon);
									_this.zoneData.push(polygon)         
									if(_r.polyCenter != undefined){
										let polyCenter = JSON.parse(_r.polyCenter)
										console.log(polyCenter)  
										siteMarker.push({ position: polyCenter, icon:_r.icon, siteid: _r})
										
									}     		
								}
							})
							
						} else {
							this.$notify({ group: 'app', type: 'warn', text: 'No Records Found' })
							this.changeSpinnerStatus()
						}
					})
					this.$emit('changeMarkers', siteMarker)
					this.$emit('changeLines', siteLines)
					this.$emit('changePolygon', this.zoneData)
					this.changeSpinnerStatus()
				}
				if(this.positive){
					let siteMarker = [];
					let siteLines = [];
					let sitePolygon = [];
					await new MapService().getTaskTrap().then(result => {
						if(result.length){
							let _this = this
							result.map(function(_r){
								if(_r.point !== undefined) {
									let point = JSON.parse(_r.point);
									point.map((pts) => {
										siteMarker.push({ position: pts, icon:_r.icon})
									})
								}
								if(_r.poly_line !== undefined) {
									let poly_line = JSON.parse(_r.poly_line);
									poly_line.map((pts) => {
										siteLines.push(pts)
									})
									//siteLines.push(poly_line)          		
								}
								if(_r.polygon !== undefined) {
									let polygon = JSON.parse(_r.polygon);
									_this.zoneData.push(polygon)         
									if(_r.polyCenter != undefined){
										let polyCenter = JSON.parse(_r.polyCenter)
										console.log(polyCenter)  
										siteMarker.push({ position: polyCenter, icon:_r.icon, siteid: _r})
										
									}     		
								}
							})
							
						} else {
							this.$notify({ group: 'app', type: 'warn', text: 'No Records Found' })
							this.changeSpinnerStatus()
						}
					})
					this.$emit('changeMarkers', siteMarker)
					this.$emit('changeLines', siteLines)
					this.$emit('changePolygon', this.zoneData)
					this.changeSpinnerStatus()
				}

				if(!this.sr && !this.rate && !this.ldata && !this.positive){
					this.$notify({ group: 'app', type: 'warn', text: 'Please select any one option' })
					this.changeSpinnerStatus()
				}
			}catch(error){
				this.$notify({ group: 'app', type: 'warn', text: error })
				this.changeSpinnerStatus()
			}

		},
		clearForm(){
			this.sr = null
			this.rate = null
			this.ldata = null
			this.positive = null
			this.$emit('changeMarkers', [])
			this.$emit('changeLines', [])
			this.$emit('changePolygon', [])
			this.changeSpinnerStatus()
		}

	}
}
</script>