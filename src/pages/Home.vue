<template>
	<div class="map">
		
		<gmap-map ref="map" :center="center" map-type-id="roadmap" :zoom="7" style="width: 100%; height: 100%">
			<gmap-polygon :paths="paths" :editable="polygonEditable" @paths_changed="updateEdited($event)">
			</gmap-polygon>
			<gmap-polyline v-if="lines" :path="lines" v-bind:options="{ strokeColor:'#008000'}" :editable="lineEditable" ref="polyline" @path_changed="updatePolyline($event)">
			</gmap-polyline>
			<gmap-circle
				v-if="circleCenter"
				:center="circleCenter"
				:radius="500"
				:visible="true"
				:editable="true"
				fillColor="red"
				fillOpacity="1.0">
        	</gmap-circle>
	        <gmap-marker v-for="(m, index) in markers"
	          :position="m.position"
	          :clickable="markerEditable" :draggable="markerEditable"
	          @click="center=m.position"
	          :key="index"
	          ></gmap-marker>
		</gmap-map>
		<div class="right-bar" :class="sidebarClass" >
			<h5 class="mobile-view">
				<div class="mobile-title mb-3" @click="$store.commit('toggleSidebarMobile')"><i class="fa fa-arrow-left"></i> Main</div>
			</h5>
			
			<div @click="$store.commit('toggleToolsSideBar')"><span><a><i class="uil uil-cog desktop-view"></i><i class="uil uil-arrow-right mobile-view"></i> </a> Tools</span></div>
			<div @click="$store.commit('toggleFilterSideBar')"><span><a><i class="uil uil-filter desktop-view"></i><i class="uil uil-arrow-right mobile-view"></i></a> Filters</span></div>
			<div><span><a><i class="uil uil-layer-group desktop-view"></i><i class="uil uil-arrow-right mobile-view"></i></a> Layers</span></div>
			<div @click="$store.commit('toggleSearchSideBar')"><span><a><i class="uil uil-search-alt desktop-view"></i><i class="uil uil-arrow-right mobile-view"></i></a> Search</span></div>
		</div>
		
		<div class="map-icon-outer desktop-view">
			<a class="filter-icon" id="add-desktop" @click="createSiteModel()"><i class="uil uil-plus"></i></a>
			<a class="filter-icon" @click="logOut()"><i class="uil uil-exit"></i></a>
		</div>
		
		<a class="filter-icon filter mobile-view" @click="$store.commit('toggleSidebarMobile')"><i class="uil uil-filter"></i></a>
		<a class="filter-icon logout mobile-view" @click="logOut()"><i class="uil uil-exit"></i></a>
		<a class="filter-icon add mobile-view" id="add-desktop" @click="createSiteModel()"><i class="uil uil-plus"></i></a>
		
		<div class="popup-overlay" :class="siteModalClass">
			<div class="popup-wrapper">
				<h3 class="popup-title desktop-view">Add Site <a class="float-right" @click="createSiteModel()"><i class="uil uil-times"></i></a></h3>
				<h5 class="mobile-view">
					<div class="mobile-title mb-3" @click="createSiteModel()"><i class="fa fa-arrow-left"></i> Add Site</div>
				</h5>
				
				<form @submit.prevent="createSite">
				<div class="form-group">
					<label for="exampleInputEmail1">Site Name</label>
					<input type="text" class="form-control" v-model="createSite.siteName" id="site_name" aria-describedby="ste_name" placeholder="Enter site name">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Geometry Type</label>
					<select class="form-control" v-model="createSite.geometryType">
						<option value="">Select</option>
						<option value="1">Point</option>
						<option value="2">Polygon</option>
						<option value="3">Polyline</option>
					</select>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Site Type</label>
					<select class="form-control" v-model="createSite.siteType">
					<option disabled value="">Please select one</option>
						<option v-for="option in siteTypeOpt" v-bind:key="option.id" v-bind:value="option.id">
							{{ option.name }}
						</option>
					</select>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Address</label>
					<gmap-autocomplete
						placeholder="Enter Address"
						class="form-control"
						v-model="createSite.address"
						@place_changed="setPlace"
						>
						</gmap-autocomplete>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Site Sub Type</label>
					<select class="form-control" v-model="createSite.siteSubType">
						<option disabled value="">Please select one</option>
						<option v-for="option in siteSubTypeOpt" v-bind:key="option.id" v-bind:value="option.id">
							{{ option.name }}
						</option>
						
					</select>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1" >Status</label>
					<select class="form-control" v-model="createSite.status">
						
						<option value="1">Active</option>
						<option value="0">Inactive</option>
						
					</select>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Site Attribute</label>
					<select class="form-control" v-model="createSite.siteAttribute">
						<option disabled value="">Please select one</option>
						<option v-for="option in siteAttributeOpt" v-bind:key="option.id" v-bind:value="option.id">
							{{ option.name }}
						</option>
						
					</select>
				</div>
				<div class="row pt-2">
					<div class="col">
						<button class="btn btn-blue w-100">Submit</button>
					</div>
					<div class="col">
						<a href="#" @click="createSiteModel()" class="btn btn-red w-100">Cancel</a>
					</div>
				</div>
				</form>
				
			</div>
		</div>
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
						<input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter Site ID">
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
					<button type="submit" class="btn btn-blue w-100" @click="searchSite">Submit</button>
				</div>
				<div class="col">
					<button type="submit" class="btn btn-red w-100">Clear</button>
				</div>
			</div>
			
			
			</div>
		</div>
		<Tools @changeCircle="changeCircle" @changeLines="changeLines" @changePolygon="changePolygon" />
		<Filters  @changeMarkers="changeMarkers" @changeLines="changeLines" @changePolygon="changePolygon" ref="childFilter" />
	</div>
  
</template>

<script>
import { initJsStore } from "../service/idb_service";
import { SitesService } from "../service/sites_service";
import { SiteDataService } from "../service/siteData_service";
import { SiteTypeService } from "../service/siteType_service";
import { SiteSubTypeService } from "../service/siteSubType_service";
import { SiteAttrService } from "../service/siteAttr_service";
import { CityService } from "../service/city_service";
import { ZoneService } from "../service/zone_service";
import { Global } from "../global";
import Tools  from "../components/Tools";
import Filters  from "../components/Filters";
import _ from 'lodash';

export default {
  name: "Home",
  components: {
	Tools,
	Filters
  },
  data: {
	markers: [],
    createSite: {
        siteName: '',
        geometryType: '',
        siteType: '',
        address: '',
        siteSubType: '',
        status: '',
        siteAttribute: '',

      },
    },
  async beforeCreate() {
    try {
	  const isDbCreated = await initJsStore();
	 console.log('======', isDbCreated)
      if (isDbCreated) {
		console.log("db created");
		// prefill database
		this.changeSpinnerStatus(true)
		await this.getData().then()
		await this.getSiteData()
		await this.getZoneData()
		await this.$refs.childFilter.fetchFilterData();
		this.changeSpinnerStatus()
      } else {
		console.log("db opened");
      }
    } catch (ex) {
      console.error(ex);
      alert(ex.message);
      Global.isIndexedDbSupported = false;
    }
  },
  mounted() {
	this.refreshSites();
	this.setFormFeildsOpt();
    let deviceWidth = window.screen.availWidth;
    console.log(deviceWidth);
    if(deviceWidth < 767){
        this.$store.commit('set', ['sidebarClass', 'd-none'])
    } else {
        this.$store.commit('set', ['sidebarClass', 'show-sidebar'])
	}
	this.geolocation();
	this.$store.commit('set',['map', this.$refs.map])
  },
  data() {
    return {
	  sites: [],
	  center: {
            lat: 0, lng: 0
          },
	  API_URL: this.$store.state.API_URL,
	  siteModalClass: 'd-none',
	  siteTypeOpt: '',
	  siteSubTypeOpt: '',
	  siteAttributeOpt: '',
	  circleCenter: '',
	  mvcPath: null,
	  polylineGeojson: '',
	  marker1: [

	  ],
	  totalDistance: 0,
	  markers: [{
            position: {
              lat: 10.0,
              lng: 10.0
            }
          }, {
            position: {
              lat: 11.0,
              lng: 11.0
            }
          }],
	  edited: null,
	  paths: [
           
          ],
	  lines: [
          ],
	  shape: {
            coords: [10, 10, 10, 15, 15, 15, 15, 10],
            type: 'poly'
          },
    };
  },
  computed: {
    sidebarClass() {
      return this.$store.state.sidebarClass
	},
	toolsSideBar(){
		return this.$store.state.toolsSideBar
	},
	filterSideBar(){
		return this.$store.state.filterSideBar
	},
	searchSidebar(){
		return this.$store.state.searchSidebar
	},
	polygonEditable(){
		return this.$store.state.polygonEditable
	},
	lineEditable(){
		return this.$store.state.lineEditable
	},
	markerEditable(){
		return this.$store.state.markerEditable
	},
	polylinePath () {
		
	},
	
	
  },
  methods: {

  	changeMarkers(newMarkers) {
  		this.markers = newMarkers;
  		if(newMarkers && newMarkers.length) {
  			this.center = newMarkers[0].position;
  		}
  	},
  	changeLines(newLines) {
		console.log(newLines)
  		this.lines = newLines;
  		/*if(newLines && newLines.length) {
  			this.center = newLines[0][0];
  		}*/
  	},
  	changePolygon(newPolygon) {
		this.paths = newPolygon;
	},
	changeCircle(newCircleCenter){
		console.log(newCircleCenter)
		this.circleCenter = newCircleCenter
	},
	updateEdited(mvcArray) {
		let paths = [];
		for (let i=0; i<mvcArray.getLength(); i++) {
			let path = [];
			for (let j=0; j<mvcArray.getAt(i).getLength(); j++) {
			let point = mvcArray.getAt(i).getAt(j);
			path.push({lat: point.lat(), lng: point.lng()});
			}
			paths.push(path);
		}
		this.edited = paths;
	},
	async getData(){
		const country = localStorage.getItem('country')
		const url = `${this.API_URL}/user/get-data?country=`+country
		await this.$http.get(url)
			.then(response => {
				let insertRes = false
				if(response.data.status == 200){
					let siteTypes = response.data.data.site_types
					let siteSubType = response.data.data.site_sub_types
					let siteAttr = response.data.data.site_attributes
					let cities = response.data.data.cities

					siteTypes.map(function(value) {
						new SiteTypeService().addSiteType(value)
					});

					siteSubType.map(function(value) {
						new SiteSubTypeService().addSiteSubType(value)
					});

					siteAttr.map(function(value) {
						new SiteAttrService().addSiteAttr(value)
					});

					cities.map(function(value) {
						new CityService().addCity(value)
					});
					
					//this.changeSpinnerStatus()
				} else {
					//this.changeSpinnerStatus()
				}
				
			})
			.catch(function (error) {
				this.$notify({ group: 'app', type: 'warn', text: 'Data import error. resync again' })
			});
	},
	async getSiteData(){
		const country = localStorage.getItem('country')
		let page = 0
		let apiFlag = true
		const url = `${this.API_URL}/user/get-sites?country=`+country+`&page=`+page
		
		//while(apiFlag){
			await this.$http.get(url)
			.then(response => {
				
				if(response.data.status == 200){
					let sites = response.data.data.sites
					//console.log(sites)
					sites.map(function(value) {
						//console.log(value)
						var siteData = {
							'siteid': value.siteid,
							'cityId': value.cityid,
							'siteTypeId': value.stypeid,
							'zoneId': value.zoneid,
							'site_attr': value.site_attr
						}
						if(value.point != null){
							siteData.point = JSON.stringify(value.point)
						}
						if(value.poly_line != null){
							siteData.poly_line = JSON.stringify(value.poly_line)
						}
						if(value.polygon != null){
							siteData.polygon = JSON.stringify(value.polygon)
							siteData.polyCenter = JSON.stringify(value.polyCenter)
						}
						//console.log(siteData)
						new SiteDataService().addSiteData(siteData)
					});
				} else {
					apiFlag = false
				}
			})
			.catch(function (error) {
				//this.$notify({ group: 'app', type: 'warn', text: 'Data import error. resync again' })
			});
		//}
	},
	async getZoneData(){
		const country = localStorage.getItem('country')
		let page = 0
		let apiFlag = true
		const url = `${this.API_URL}/user/get-zones?country=`+country
		
		//while(apiFlag){
			await this.$http.get(url)
			.then(response => {
				
				if(response.data.status == 200){
					let zones = response.data.data.polyZone
					//console.log(sites)
					zones.map(function(value) {
						//console.log(value)
						var zoneData = {
							'zoneid': value.zoneid,
							'name': value.name,
							'lat_long': JSON.stringify(value.lat_long),
						}
						//console.log(siteData)
						new ZoneService().addZone(zoneData)
					});
				} else {
					apiFlag = false
				}
			})
			.catch(function (error) {
				//this.$notify({ group: 'app', type: 'warn', text: 'Data import error. resync again' })
			});
		//}
	},
    async refreshSites() {
      this.sites = await new SitesService().getSitesData();
	},
	createSiteModel(){
		this.changeSpinnerStatus(true)
		this.setFormFeildsOpt();
		const currState = this.siteModalClass
		if(currState == 'd-none'){
            this.siteModalClass = 'new-site-modal'
            this.changeSpinnerStatus()
		} else {
            this.siteModalClass = 'd-none'
            this.changeSpinnerStatus()
		}
    },
    changeSpinnerStatus(status = false) {
      this.$store.dispatch('changeSpinnerStatus', status)
	},
	setPlace(place) {
		this.createSite.address = place
	},
	async createSite(e){
		try {
			
			let country = 'lee'
			//console.log(this.createSite);
			if(this.createSite.siteName == null){
				this.$notify({ group: 'app', type: 'warn', text: 'Site name cannot be null' })
				return false
			}

			if(this.createSite.siteType == null){
				this.$notify({ group: 'app', type: 'warn', text: 'Site type cannot be null' })
				return false
			}

			if(this.createSite.siteSubType == null){
				this.$notify({ group: 'app', type: 'warn', text: 'Site sub type cannot be null' })
				return false
			}

			if(this.createSite.address == null){
				this.$notify({ group: 'app', type: 'warn', text: 'Address cannot be null' })
				return false
			}
			if(this.createSite.status == null){
				this.$notify({ group: 'app', type: 'warn', text: 'Status cannot be null' })
			}
			this.changeSpinnerStatus(true)
			const data = {
				name: this.createSite.siteName.trim(),
				siteTypeId: parseInt(this.createSite.siteType),
				siteSubTypeId: parseInt(this.createSite.siteSubType),
				address1: this.createSite.address.formatted_address,	
				geometryType: this.createSite.geometryType.trim(),
				latitude: String(this.createSite.address.geometry.location.lat()),
				longitude: String(this.createSite.address.geometry.location.lat()),
				created: new Date(),
				status: parseInt(this.createSite.status)
			}
			//console.log(data)
			await new SitesService().addSite(data).then(res => {
				this.center = {lat: this.createSite.address.geometry.location.lat(), lng: this.createSite.address.geometry.location.lng() }
				this.paths = 
					[ {lat: 1.380, lng: 103.800}, {lat:1.380, lng: 103.810}, {lat: 1.390, lng: 103.810}, {lat: 1.390, lng: 103.800} ]
				
				//this.paths = this.center
				//this.edited = this.paths;
				this.changeSpinnerStatus()
				this.createSiteModel()
			});
			this.resetForm()
			this.$notify({ group: 'app', text: 'Site Created Successfully' })
		} catch(error){
			this.changeSpinnerStatus()
			this.$notify({ group: 'app', type: 'warn', text: error })
		}
	},
	logOut(){
		this.changeSpinnerStatus(true)
		localStorage.removeItem('user')
		localStorage.removeItem('jwt')
		this.$router.push('login')
		this.changeSpinnerStatus()

	},
	async setFormFeildsOpt(){
		this.siteTypeOpt  = await new SiteTypeService().getSiteTypes()
		this.siteSubTypeOpt = await new SiteSubTypeService().getSiteSubTypes()
		this.siteAttributeOpt = await new SiteAttrService().getSiteAttrs()
	},
	resetForm() {
        console.log('Reseting the form')
        var self = this; //you need this because *this* will refer to Object.keys below`

        //Iterate through each object field, key is name of the object field`
        Object.keys(this.createSite).forEach(function(key,index) {
          self.createSite[key] = '';
        });
	},
	async searchSite(){
		this.changeSpinnerStatus(true)

	},
	geolocation : function() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
	},
	updatePolyline: function (mvcPath) {
		this.mvcPath = mvcPath
		if (!this.mvcPath) return null
		let path = [];
		for (let j=0; j<this.mvcPath.getLength(); j++) {
			let point = this.mvcPath.getAt(j);
			path.push({lat: point.lat(), lng: point.lng()});
		}
		
		let marker1 = []
		let _this = this;
		if(path.length > 2){
			path.map(function(value){
				if(marker1){
					var distance = _this.calDistance(marker1, value)
					_this.totalDistance = _this.totalDistance + distance
				}
				marker1 = value
				console.log(_this.totalDistance)
			})
		} else {
			path.map(function(value){
				if(marker1){
					var distance = _this.calDistance(marker1, value)
					_this.totalDistance = _this.totalDistance + distance
				}
				marker1 = value
				console.log(_this.totalDistance)
			})
		}
		//return path
	},
	calDistance(mk1, mk2) {
		console.log(mk1, mk2);
		var R = 3958.8; // Radius of the Earth in miles
		var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
		var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
		var difflat = rlat2 - rlat1; // Radian difference (latitudes)
		var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

		var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
		return d;
	},
  }
};
</script>

<style>
.show-sidebar {
transition: .3s all ease;
z-index: 999999999;
}
.vue-map-container{
	position: absolute !important;
}
</style>
