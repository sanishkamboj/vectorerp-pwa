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
					<button type="button" @click="clearFilter" class="btn btn-red w-100">Clear</button>
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
		zoneData: [],
		infoWindowHtml: ''
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
		this.$emit('changeMarkers', [])
		this.$emit('changeLines', [])
		this.$emit('changePolygon', [])
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
		
		if(this.checkedZones && this.checkedZones.length) {
			//console.log(this.checkedZones)
			zonesData = await new ZoneService().getZonesByIds(this.checkedZones);
			
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
		//console.log(res)
          if(res && res.length) {
          	let siteMarker = [];
          	let siteLines = [];
			let sitePolygon = [];
          	res.map((obj, idx) => {
				this.infoWindowHtml = `
					<div>
					<div cellpadding="5" cellspacing="5" class="info_box" id="info_box">
					<h5 class="border-bottom pb-2 mb-3">Site Id ${obj.siteid} ${obj.site_name}</h5>
					<h6>Mosquito Source Ditch (2018 Pool Survey,WOTUS)</h6>
					<strong>37 Shepard Road ,West Hartford ,Connecticut</strong>
					<div class="button mt-3">
					<button class="btn btn-primary  mr-2 text-white btn-sm" title="Landing Rate" v-on:click=="showLandingRate">Landing Rate</button>
					<a class="btn btn-primary  mr-2 text-white btn-sm" title="Larval Surveillance" >Larval Surveillance</a>
					<a class="btn btn-primary  mr-2 text-white btn-sm" title="Treatment Task">Treatment</a>
					<a class="btn btn-primary  mr-2 text-white btn-sm" title="Trap" >Trap Place</a>
					<a class="btn btn-primary  mr-2 text-white btn-sm" title="Other Task" >Other</a>
					<a class="btn btn-primary  mr-2 text-white btn-sm" href="https://lee.vectorcontrolsystem.com/site/edit&amp;mode=Update&amp;iSiteId=1" target="_blank">Edit site</a>
					<a class="btn btn-primary  mr-2 text-white btn-sm" title="Landing Rate">Insta Treat</a>
					</div>
					<h5 class="border-bottom pb-2 mb-3 mt-3">History</h5>
					<span class="w-100 d-block  pb-2">
					<a href="javascript:void(0);" onclick="addEditDataTaskTreatment(44,&quot;edit&quot;,0)">2021-01-12 Treated 1 acre With 1 lb Anvil</a>
					</span>
					<span class="w-100 d-block  pb-2">
					<a href="javascript:void(0);" onclick="addEditDataTaskOther(5,&quot;edit&quot;,0)">2020-06-29 Home Visit</a>
					</span>
					
					<span class="w-100 d-block  pb-2">
					<a href="javascript:void(0);" onclick="addEditDataTaskTreatment(12,&quot;edit&quot;,0)">2020-06-12 Treated 100 acre With 0.05 fl. oz Aqua-Reslin</a>
					</span>
					<span class="w-100 d-block  pb-2">
					<a href="javascript:void(0);" onclick="addEditDataTaskTrap(6,&quot;edit&quot;,0)">2020-06-02 BG Placed</a>
					</span><span class="w-100 d-block  pb-2">
					<a href="javascript:void(0);" onclick="addEditDataTaskOther(9,&quot;edit&quot;,0)">2020-06-02 Handing out Training Materials</a>
					</span>
					</div>
					</div>
				`
          		if(obj.point !== undefined) {
          			let point = JSON.parse(obj.point);
          			point.map((pts) => {
          				siteMarker.push({ position: pts, icon:obj.icon, content: this.infoWindowHtml})
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
      				this.zoneData.push(polygon)          		
          		}
          	})
          	//console.log(sitePolygon);
			this.$emit('changeMarkers', siteMarker)
			this.$emit('changeLines', siteLines)
			this.$emit('changePolygon', this.zoneData)
			
			
			//this.$store.dispatch('changeMarkerEditable', true)
			this.changeSpinnerStatus()
		  } else {
			  this.$notify({ group: 'app', type: 'warn', text: 'No sites found please try again with another selection' })
			  this.changeSpinnerStatus()
		  }
		   
	    })

	  },
	  clearFilter(){
		this.changeSpinnerStatus(true)
		this.$emit('changeMarkers', [])
		this.$emit('changeLines', [])
		this.$emit('changePolygon', [])
		this.checkedZones = []
		this.checkedSiteTypes = []
		this.checkedSiteAttr = []
		this.checkedCities = []
		this.changeSpinnerStatus()
		this.$notify({ group: 'app', text: 'Filters Cleared' })
	  },
	  showLandingRate: function(event){
		 console.log('here clicked2')
	  },
		changeSpinnerStatus(status = false) {
			this.$store.dispatch('changeSpinnerStatus', status)
		},
  }
}
</script>
