<template>
    <div class="right-section" :class="filterSideBar">
		
		<h3 class="popup-title desktop-view">Filters <a class="float-right" @click="$store.commit('toggleFilterSideBar')"><i class="uil uil-times"></i></a></h3>
		<h5 class="mobile-view">
			<div class="mobile-title" @click="$store.commit('toggleFilterSideBar')"><i class="fa fa-arrow-left"></i> Filters</div>
		</h5>
		<form id="filter-form" @submit.prevent="processFilter">
			<div id="accordion">
				<div class="card">
					<div class="card-header" id="headingOne">
					<h5 class="mb-0">
						<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" type="button">
						<!--input type="checkbox" class="form-check-input" id="exampleCheck1"--> Site Types <i class="uil uil-angle-right"></i>
						</button>
					</h5>
					</div>

					<div id="collapseOne" class="collapse" aria-labelledby="headingOnenew" data-parent="#accordion">
					<div class="card-body pt-1">
						
							<div class="form-check" v-for="record in filters" :key="record.id">
								<input type="checkbox" class="form-check-input" :value="record.id" :id="'sites-'+record.id" v-model="checkedSiteTypes">
								<label class="form-check-label" :for="'sites-'+record.id">{{record.name}}</label>
							</div>
							
					</div>
					</div>
				</div>
				
				<div class="card">
					<div class="card-header" id="headingThree">
					<h5 class="mb-0">
						<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo" type="button">
						Site Attributes <i class="uil uil-angle-right"></i>
						</button>
					</h5>
					</div>
					<div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
					<div class="card-body pt-1">
							<div class="form-check" v-for="record in siteAttr" :key="record.id">
								<input type="checkbox" class="form-check-input" :value="record.id" :id="'sites-attr-'+record.id" v-model="checkedSiteAttr">
								<label class="form-check-label" :for="'sites-attr-'+record.id" >{{record.name}}</label>
							</div>
							
					</div>
					</div>
				</div>
				
				<div class="card">
					<div class="card-header" id="headingTwo">
					<h5 class="mb-0">
						<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" type="button">
						Cities <i class="uil uil-angle-right"></i>
						</button>
					</h5>
					</div>
					<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
					<div class="card-body pt-1">
							<div class="form-check" v-for="record in city" :key="record.id">
								<input type="checkbox" class="form-check-input" :value="record.id" :id="'cities-'+record.id" v-model="checkedCities">
								<label class="form-check-label" :for="'cities-'+record.id" >{{record.name}}</label>
							</div>
							
					</div>
					</div>
				</div>
				<div class="card">
					<div class="card-header" id="headingFour">
					<h5 class="mb-0">
						<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" type="button">
						Zones <i class="uil uil-angle-right"></i>
						</button>
					</h5>
					</div>
					<div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
					<div class="card-body pt-1">
							<div class="form-check" v-for="record in zones" :key="record.zoneid">
								<input type="checkbox" class="form-check-input" :value="record.zoneid" :id="'zones-'+record.zoneid" v-model="checkedZones">
								<label class="form-check-label" :for="'zones-'+record.zoneid">{{record.name}}</label>
							</div>
							
					</div>
					</div>
				</div>
			</div>
			
			<div class="row pt-4">
				<div class="col">
					<button type="submit" class="btn btn-blue w-100">Submit</button>
				</div>
				<div class="col">
					<button type="submit" class="btn btn-red w-100">Clear</button>
				</div>
			</div>
		</form>
	</div>
</template>
<script>
import { SiteTypeService } from "../service/siteType_service";
import { CityService } from "../service/city_service";
import { SiteAttrService } from "../service/siteAttr_service";
import { SiteAttrDataService } from "../service/siteAttrData_service";
import { SitesService } from "../service/sites_service";
import { SiteDataService } from "../service/siteData_service";
import { ZoneService } from "../service/zone_service";

export default {
   name: "Filters", 
   data(){
       return {
        filters: [],
        checkedZones: [],
        checkedSiteTypes: [],
        checkedSiteAttr: [],
        checkedCities: [],
		city: [],
		siteAttr: [],
		zones: [],
		zoneData: []
       }
   },
   computed: {
	filterSideBar(){
		return this.$store.state.filterSideBar
	}
  },
  created(){
      new SiteTypeService().getSiteTypes().then(res => {
          this.filters = res
          //console.log(res)
	  })
	  new CityService().getCities().then(res => {
          this.city = res
          //console.log(res)
	  })
	  new SiteAttrService().getSiteAttrs().then(res => {
          this.siteAttr = res
          //console.log(res)
	  })
	  new ZoneService().getZoneData().then(res => {
          this.zones = res
          //console.log(res)
	  })
	  
  },
  methods: {
  	  fetchFilterData : async function() {
		await new SiteTypeService().getSiteTypes().then(res => {
	          this.filters = res
	          //console.log(res)
		  })
		await  new CityService().getCities().then(res => {
	          this.city = res
	          //console.log(res)
		  })
		await  new SiteAttrService().getSiteAttrs().then(res => {
	          this.siteAttr = res
	          console.log(res)
		  })
		await  new ZoneService().getZoneData().then(res => {
	          this.zones = res
	          console.log(res)
		  })
  	  },
	  async processFilter(){
		//console.log(this.checkedSiteTypes)
		this.changeSpinnerStatus(true);
		this.$store.commit('toggleFilterSideBar')
		let sites = []
		let sitesIds = []
		let zonesData = []
		if(this.checkedSiteAttr && this.checkedSiteAttr.length) {
			sites = await new SiteAttrDataService().getSitesByIds(this.checkedSiteAttr);
			sites.map((obj) => {
				if(sitesIds.indexOf(obj.siteid) == -1)
					sitesIds.push(obj.siteid)
			})
			//console.log(sitesIds)
		}

		if(this.checkedZones) {
			zonesData = await new ZoneService().getZonesByIds(this.checkedZones);
			console.log(zonesData)
			if(zonesData.length) {
				await zonesData.map((obj, idx) => {
					let path = JSON.parse(obj.lat_long);
					if(path) {
						this.zoneData.push(path)
					}
				})
				console.log(this.zoneData)
				this.$emit('displayZones', this.zoneData)
			}
		}
	  	new SiteDataService().getSitesByIds( this.checkedSiteTypes, sitesIds, this.checkedCities, this.checkedZones ).then(res => {
			  console.log(res)
          if(res && res.length) {
          	let siteMarker = [];
          	let siteLines = [];
			  let sitePolygon = [];
          	res.map((obj, idx) => {
          		if(obj.point !== undefined) {
          			let point = JSON.parse(obj.point);
          			point.map((pts) => {
          				siteMarker.push({ position: pts})
          			})
          		}
          		if(obj.poly_line !== undefined) {
          			let poly_line = JSON.parse(obj.poly_line);
          			poly_line.map((pts) => {
          				siteLines.push(pts)
          			})
      				//siteLines.push(poly_line)          		
          		}
          		if(obj.polygon !== undefined) {
          			let polygon = JSON.parse(obj.polygon);
      				sitePolygon.push(polygon)          		
          		}
          	})
          	//console.log(sitePolygon);
			this.$emit('changeMarkers', siteMarker)
			this.$emit('changeLines', siteLines)
			this.$emit('changePolygon', sitePolygon)
			
			
			//this.$store.dispatch('changeMarkerEditable', true)
			this.changeSpinnerStatus()
		  } else {
			  this.$notify({ group: 'app', type: 'warn', text: 'No Data Found' })
			  this.changeSpinnerStatus()
		  }
		   
	    })

	  },
		changeSpinnerStatus(status = false) {
			this.$store.dispatch('changeSpinnerStatus', status)
		},
  }
}
</script>
