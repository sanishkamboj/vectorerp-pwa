<template>
	<div class="map">
		
		<gmap-map ref="map" :center="center" map-type-id="roadmap" :zoom="10" style="width: 100%; height: 100%" :options="{
			fullscreenControl: false, mapTypeControl: false
		}">
			<gmap-polygon :paths="paths" :editable="polygonEditable" ref="polygon" @paths_changed="updatePolygone($event)">
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
				@radius_changed="updateCircle($event)"
				fillOpacity="1.0">
        	</gmap-circle>
			<gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
				<InfoWindow v-bind:shouldRender="this.shouldRender" v-bind:infoWindowSearch="this.infoWindowSearch" v-bind="this.siteid" @landingRateModal="landingRateModal" @larvalModal="larvalModal"  @treatmentModal="treatmentModal" @trapModal="trapModal" @otherModal="otherModal" ref="history" />
			</gmap-info-window>
			
	        <gmap-marker v-for="(m, index) in markers"
	          :position="m.position"
	          :clickable="true" :draggable="markerEditable"
			  :icon="m.icon"
	          :key="index"
			  @click="toggleInfoWindow(m,index)"
	          ></gmap-marker>
			  
		</gmap-map>
		<div class="right-bar" :class="sidebarClass" >
			<h5 class="mobile-view">
				<div class="mobile-title mb-3" @click="$store.commit('toggleSidebarMobile')"><i class="fa fa-arrow-left"></i> Main</div>
			</h5>
			
			<div @click="$store.commit('toggleToolsSideBar')"><span><a><i class="uil uil-cog desktop-view"></i><i class="uil uil-arrow-right mobile-view"></i> </a> Tools</span></div>
			<div @click="$store.commit('toggleFilterSideBar')"><span><a><i class="uil uil-filter desktop-view"></i><i class="uil uil-arrow-right mobile-view"></i></a> Filters</span></div>
			<div @click="$store.commit('toggleLayerSideBar')"><span><a><i class="uil uil-layer-group desktop-view"></i><i class="uil uil-arrow-right mobile-view"></i></a> Layers</span></div>
			<div @click="$store.commit('toggleSearchSideBar')"><span><a><i class="uil uil-search-alt desktop-view"></i><i class="uil uil-arrow-right mobile-view"></i></a> Search</span></div>
		</div>
		
		<div class="map-icon-outer desktop-view">
			<a class="filter-icon" @click="createSiteModel()"><i class="uil uil-plus"></i></a>
			<a class="filter-icon" @click="logOut()"><i class="uil uil-exit"></i></a>
			<a class="filter-icon" @click="manualSyncData()"><i class="uil uil-sync"></i></a>
		</div>
		
		<a class="filter-icon filter mobile-view" @click="$store.commit('toggleSidebarMobile')"><i class="uil uil-filter"></i></a>
		<a class="filter-icon logout mobile-view" @click="logOut()"><i class="uil uil-exit"></i></a>
		<a class="filter-icon add mobile-view" @click="createSiteModel()"><i class="uil uil-plus"></i></a>
		<a class="filter-icon sync mobile-view" @click="manualSyncData()"><i class="uil uil-sync"></i></a>
		
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
		
		<LandingRate ref="landingRate"/>
		<Larval ref="larval" />
		<Treatment ref="treatment" />
		<Trap ref="trap" />
		<Other ref="other" />

		<Tools @changeCircle="changeCircle" @changeLines="changeLines" @changePolygon="changePolygon" v-bind:lineDistance="polylineDistance" v-bind:polylineDistanceInFt="polylineDistanceInFt" v-bind:circleRadius="circleRadius" v-bind:circleArea="circleArea" v-bind:polyAreaFt="polyAreaFt" v-bind:polyAreaMile="polyAreaMile" />
		<Filters @changeMarkers="changeMarkers" @changeLines="changeLines" @changePolygon="changePolygon" ref="childFilter" @displayZones="displayZones"/>
		<Layers @changeMarkers="changeMarkers" @changeLines="changeLines" @changePolygon="changePolygon" />
		<Search @showSite="showSite" @changeMarkers="changeMarkers" @changePolygon="changePolygon" @changeLines="changeLines" />
		<div class="topPoup" :class="saveSiteModal">
			<p>Select area for the site by dots on the edges of shape.</p>
			<div class="rightBtns">
				<div><button type="submit" @click="saveSitePath()" class="btn btn-blue w-100">Save</button></div>
				<div><button type="submit" @click="cancelSiteSave()" class="btn btn-red w-100">Cancel</button></div>
			</div>
		</div>
	</div>
	
</template>

<script>
import { initJsStore } from "../service/idb_service";
import { SitesService } from "../service/sites_service";
import { SiteDataService } from "../service/siteData_service";
import { SiteTypeService } from "../service/siteType_service";
import { SiteSubTypeService } from "../service/siteSubType_service";
import { SiteAttrService } from "../service/siteAttr_service";
import { SiteAttrDataService } from "../service/siteAttrData_service";
import { CityService } from "../service/city_service";
import { ZoneService } from "../service/zone_service";
import { ProductService } from "../service/product_service";
import { SpeciesService } from "../service/species_service";
import { TaskTypeService } from "../service/taskType_service";
import { TrapTypeService } from "../service/trapType_service";
import { SrDetailService } from "../service/srDetail_service";
import { Global } from "../global";
import Tools  from "../components/Tools";
import Filters  from "../components/Filters";
import Search  from "../components/Search";
import Layers  from "../components/Layers";
import InfoWindow  from "../components/InfoWindow";
import LandingRate  from "../components/LandingRate";
import Larval  from "../components/Larval";
import Treatment  from "../components/Treatment";
import Trap  from "../components/Trap";
import Other  from "../components/Other";
import _ from 'lodash';
import {gmapApi} from 'vue2-google-maps';
import { MapService } from '../service/map_service';

const geoarea = require('geo-area')(/*options*/{x: 'lng', y: 'lat'});
export default {
  name: "Home",
  components: {
	Tools,
	Filters,
	Layers,
	Search,
	InfoWindow,
	LandingRate,
	Larval,
	Treatment,
	Trap,
	Other
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
		this.$store.dispatch('loadingText', 'Fetching Data...');
		await this.getData()
		this.$store.dispatch('loadingText', 'Fetching Zone Data...');
		await this.getZoneData()
		await this.$refs.childFilter.fetchFilterData();
		this.$store.dispatch('loadingText', 'Fetching Sites Data...');
		await this.getSiteData()
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
	if(navigator.onLine){
		this.connectionStatus = "Connected to internet.";
		}else{
		this.connectionStatus = "Unable to connect to internet.";	
		}
	//UPLOAD LOCAL DATA TO SERVER
	window.setInterval(() => {
		//this.uploadData().then()
		//this.downloadData()
	}, 40000000)
  },
  data() {
    return {
		sites: [],
		center: {
			lat: 41.634819, lng: -72.994825
			},
		API_URL: this.$store.state.API_URL,
		siteid: null,
		newSiteID: null,
		siteModalClass: 'd-none',
		siteTypeOpt: '',
		siteSubTypeOpt: '',
		siteAttributeOpt: '',
		circleCenter: '',
		mvcPath: null,
		polylineGeojson: '',
		newSitePolygonPath:[

		],
		newSitePolylinePath: [

		],
		marker1: [

		],
		polylineDistance: 0.00,
		polylineDistanceInFt: 0.00,
		circleRadius: 0.00,
		circleArea: 0.00,
		polyAreaFt: 0.00,
		polyAreaMile: 0.00,
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
		connectionStatus: '',
		shouldRender: true,
		infoWindowSearch: '',
		infoWindowPos: null,
		infoWinOpen: false,
		currentMidx: null,
		infoWindowHtml: '',
		infoOptions: {
			
			//optional: offset infowindow so it visually sits nicely on top of our marker
			pixelOffset: {
				width: 0,
				height: -35
			}
		},
    };
  },
  computed: {
	google: gmapApi,
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
	saveSiteModal(){
		return this.$store.state.saveSiteModal
	},
	polylinePath () {
		
	},
	
	
  },
  methods: {
	async manualSyncData(){
		this.changeSpinnerStatus(true)
		await this.uploadData()
		//this.downloadData()
		var syncTimestamp = new Date();
		localStorage.setItem('sync_timestamp', syncTimestamp.toISOString())
		this.changeSpinnerStatus()
	},
	showSite(newMarkers){
		this.markers = newMarkers;
		if(newMarkers && newMarkers.length) {
			  this.center = newMarkers[0].position;
  		}
  		
	},
  	changeMarkers(newMarkers) {
		console.log(newMarkers)
  		this.markers = newMarkers;
  		if(newMarkers && newMarkers.length) {
  			this.center = newMarkers[0].position;
  		}
  	},
  	changeLines(newLines) {
  		this.lines = newLines;
  		/*if(newLines && newLines.length) {
  			this.center = newLines[0][0];
  		}*/
  	},
  	changePolygon(newPolygon) {
		this.paths = newPolygon;
	},
	displayZones(zoneArr){
		console.log(zoneArr)
		this.paths = zoneArr
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
					let site_attr_data = response.data.data.site_attr_data
					let species = response.data.data.species
					let products = response.data.data.products
					let trapType = response.data.data.trap_type
					let taskType = response.data.data.task_type
					let srDetails = response.data.data.sr_details
					let taskLrData = response.data.data.taskLandingRate
					let taskTreatment = response.data.data.taskTreatment
					let taskTrap = response.data.data.taskTrap
					let taskOther = response.data.data.taskOther
					let taskLarval = response.data.data.taskLarval

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
					
					site_attr_data.map(function(value){
						new SiteAttrDataService().addSiteAttrData(value)
					});
					
					species.map(function(value){
						new SpeciesService().addSpecies(value)
					})
					
					products.map(function(value){
						new ProductService().addProducts(value)
					})

					trapType.map(function(value){
						new TrapTypeService().addTrapType(value)
					})

					taskType.map(function(value){
						new TaskTypeService().addTaskType(value)
					})

					srDetails.map(function(value){
						new SrDetailService().addSrDetail(value)
					})
					
					taskLrData.map(function(value){
						value.synced = 1
						new MapService().addTaskLandingRate(value)
					})

					taskTreatment.map(function(value){
						value.synced = 1
						new MapService().addTaskTreatment(value)
					})
					
					taskLarval.map(function(value){
						value.synced = 1
						new MapService().addTasklarval(value)
					})

					taskTrap.map(function(value){
						value.synced = 1
						new MapService().addTaskTrap(value)
					})

					taskOther.map(function(value){
						value.synced = 1
						new MapService().addTaskOther(value)
					})
					//this.changeSpinnerStatus()
				} else {
					//this.changeSpinnerStatus()
				}
				
			})
			.catch(function (error) {
				console.log(error)
				//this.$notify({ group: 'app', type: 'warn', text: 'Data import error. resync again' })
			});
	},
	async getSiteData(){
		this.$store.dispatch('loadingText', 'Adding Site Data...');
		const country = localStorage.getItem('country')
		let page = 0
		let apiFlag = true
		let url = ''
		do{
			url = `${this.API_URL}/user/get-sites?country=`+country+`&page=`+page
			let response = await this.$http.get(url)
			if(response.data.data.sites != undefined){
				let sites = response.data.data.sites
				//console.log(sites)
				
				await sites.map(function(value) {

					var siteData = {
						'site_name': value.site_name,
						'siteid': value.siteid,
						'cityId': value.cityid,
						'siteTypeId': value.stypeid,
						'zoneId': value.zoneid,
						'icon': value.icon,
						'site_attr_name': value.site_attr_name,
						'site_type_name': value.site_type_name,
						'address': value.address
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
				if(page == 2){
					this.changeSpinnerStatus()
				}
			} else {
				apiFlag = false
			}
			page = page + 1
		}while(page < 10)
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
					this.$store.dispatch('loadingText', 'Adding Zone Data...');
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
			
			const country = localStorage.getItem('country')
			let user = localStorage.getItem('user')
			let logggedInUserName = user.vFirstName+" "+user.vFirstName
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
			var geometry = this.createSite.geometryType.trim()
			const data = {
				name: this.createSite.siteName.trim(),
				siteTypeId: parseInt(this.createSite.siteType),
				siteSubTypeId: parseInt(this.createSite.siteSubType),
				address1: this.createSite.address.formatted_address,	
				geometryType: geometry,
				latitude: String(this.createSite.address.geometry.location.lat()),
				longitude: String(this.createSite.address.geometry.location.lng()),
				created: new Date(),
				status: parseInt(this.createSite.status),
				loginUserName: logggedInUserName
			}
			//console.log(data)
			await new SitesService().addSite(data).then(res => {
				this.newSiteID = res[0].id
				this.center = {lat: this.createSite.address.geometry.location.lat(), lng: this.createSite.address.geometry.location.lng() }
				this.$store.commit('set',['map', this.$refs.map])
				var self = this;
				if(geometry == 2){
					setTimeout(function() {
						self.drawGeometryPolygon()
						self.changeSpinnerStatus()
						self.$store.commit('toggleSaveSiteModal')
					}, 2000);
				} else if(geometry == 3){
					setTimeout(function() {
						self.drawGeometryPolyline()
						self.changeSpinnerStatus()
						self.$store.commit('toggleSaveSiteModal')
					}, 2000);
				}
				//this.paths = this.center
				//this.edited = this.paths;
				
				this.createSiteModel()
			});
			this.resetForm()
			this.$notify({ group: 'app', text: 'Site Created Successfully' })
		} catch(error){
			this.changeSpinnerStatus()
			this.$notify({ group: 'app', type: 'warn', text: error })
		}
	},
	async drawGeometryPolygon(){
		var bounds = this.$store.state.map.$mapObject.getBounds()
		var northEast = bounds.getNorthEast()
		var southWest = bounds.getSouthWest()
		var center = bounds.getCenter()
		var degree = this.paths.length + 1;
		var f = Math.pow(0.66, degree)
		var path = [
			{ lng: center.lng(), lat: (1-f) * center.lat() + (f) * northEast.lat() },
			{ lng: (1-f) * center.lng() + (f) * southWest.lng(), lat: (1-f) * center.lat() + (f) * southWest.lat() },
			{ lng: (1-f) * center.lng() + (f) * northEast.lng(), lat: (1-f) * center.lat() + (f) * southWest.lat() },
		]
		this.changePolygon(path)
		this.newSitePolygonPath = path
		this.$store.dispatch('changePolygonEditable', true)
		
	},
	async drawGeometryPolyline(){
		var bounds = this.$store.state.map.$mapObject.getBounds()
		var northEast = bounds.getNorthEast()
		var southWest = bounds.getSouthWest()
		var center = bounds.getCenter()
		var degree = this.paths.length + 1;
		var f = Math.pow(0.66, degree)
		var path = [
            { lng: center.lng(), lat: (1-f) * center.lat() + (f) * northEast.lat() },
            { lng: (1-f) * center.lng() + (f) * southWest.lng(), lat: (1-f) * center.lat() + (f) * southWest.lat() },
            
			]
		this.changeLines(path)
		this.newSitePolylinePath = path
		this.$store.dispatch('changeLineEditable', true)
		console.log(this.path)
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
		let netDistance = 0.00
		if (!this.mvcPath) return null
		let path = [];
		for (let j=0; j<this.mvcPath.getLength(); j++) {
			let point = this.mvcPath.getAt(j);
			path.push({lat: point.lat(), lng: point.lng()});
		}
		this.newSitePolygonPath = path
		let marker1 = null
		let _this = this;
		if(path.length > 2){
			path.map(function(value){
				if(marker1){
					var distance = _this.calDistance(marker1, value)
					netDistance = parseFloat(netDistance) + parseFloat(distance)
				}
				marker1 = value
				
			})
		} else {
			path.map(function(value){
				if(marker1){
					var distance = _this.calDistance(marker1, value)
					netDistance = parseFloat(netDistance) + parseFloat(distance)
				}
				marker1 = value
				console.log(netDistance)
			})
		}
		_this.polylineDistance = netDistance.toFixed(2)
		_this.polylineDistanceInFt = (netDistance * 5280).toFixed(2); 
		//return path
	},
	updatePolygone: function (mvcArray) {
		console.log(mvcArray)
		let paths = [];
		for (let i=0; i<mvcArray.getLength(); i++) {
			let path = [];
			for (let j=0; j<mvcArray.getAt(i).getLength(); j++) {
				let point = mvcArray.getAt(i).getAt(j);
				path.push({lat: point.lat(), lng: point.lng()});
			}
			paths.push(path);
		}
		this.newSitePolygonPath = paths
		console.log(paths[0])
		let polyArea = geoarea(paths[0]);
		var sqMile = polyArea.toFixed(2) * parseFloat('0.00000039');
		this.polyAreaMile = sqMile.toFixed(2)
		var sqFeet = sqMile.toFixed(2) * parseInt('27878400');
		this.polyAreaFt = sqFeet.toFixed(2)
		//var polyArea = google.maps.geometry.spherical.computeArea(mvcArray)
		//console.log(polyArea);
	},
	updateCircle: function(mvcArray){
		this.circleRadius = mvcArray.toFixed(2)
		let radius = mvcArray.toFixed(2)
		var area = (parseFloat('3.14') * (radius * radius));
		this.circleArea = area.toFixed(2)
	},
	calDistance(mk1, mk2) {
		
		var R = 3958.8; // Radius of the Earth in miles
		var rlat1 = parseFloat(mk1.lat) * (Math.PI / 180); // Convert degrees to radians
		var rlat2 = parseFloat(mk2.lat) * (Math.PI / 180); // Convert degrees to radians
		var difflat = rlat2 - rlat1; // Radian difference (latitudes)
		var difflon = (parseFloat(mk2.lng) - parseFloat(mk1.lng)) * (Math.PI / 180); // Radian difference (longitudes)
		
		var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
		console.log("d = " + d);
		return d;
		
		//console.log('d = '+d)
	},
	cancelSiteSave(){
		this.$store.commit('toggleSaveSiteModal')
		this.changePolygon([])
	},
	async saveSitePath(){
		try{
			this.changeSpinnerStatus(true)
			let site = []
			if(this.newSitePolylinePath.length){
				site.id = this.newSiteID
				site.path = JSON.stringify(this.newSitePolylinePath)
				await new SitesService().updateSiteLineLatLngById(site).then(response => {
					console.log(response)
					this.$notify({ group: 'app', text: 'Site Path Updated Successfully' })
				});
				this.changeLines([])
				this.newSitePolylinePath = []
			} else if(this.newSitePolygonPath.length) {
				site.id = this.newSiteID
				
				site.path = JSON.stringify(this.newSitePolygonPath)
				await new SitesService().updateSitePolyLatLngById(site).then(response => {
					console.log(response)
					this.$notify({ group: 'app', text: 'Site Path Updated Successfully' })
				});
				this.changePolygon([])
				this.newSitePolygonPath = []
			}
			this.changeSpinnerStatus()
			this.$store.commit('toggleSaveSiteModal')
			
			
		} catch(error){
			this.changeSpinnerStatus()
			this.$notify({ group: 'app', type: 'warn', text: error })
		}
	},
	toggleInfoWindow: function(marker, idx) {
		this.infoWindowPos = marker.position;
		this.siteid = marker.siteid;
		//console.log(this.siteid)
		if(this.siteid != undefined){
			this.$refs.history.getHistory(this.siteid.siteid);
			this.shouldRender = true
		} else
		if(marker.content != undefined){
			 this.shouldRender = false
			 this.infoWindowSearch = marker.content
		}
		//check if its the same marker that was selected if yes toggle
		if (this.currentMidx == idx) {
			this.infoWinOpen = !this.infoWinOpen;
		}
		//if different marker set infowindow to open and reset current marker index
		else {
			this.infoWinOpen = true;
			this.currentMidx = idx;

		}
	},
	landingRateModal: function(site){
		this.$refs.landingRate.toggleLandingRateModal(site)
	},
	larvalModal: function(site){
		this.$refs.larval.toggleLarvalModal(site)
	},
	treatmentModal: function(site){
		this.$refs.treatment.toggleTreatmentModal(site)
	},
	trapModal: function(site){
		this.$refs.trap.toggleTrapModal(site)
	},
	otherModal: function(site){
		this.$refs.other.toggleOtherModal(site)
	},
	async uploadData(){
		console.log('Uploading Local Data...')
		let lastSync = localStorage.getItem('sync_timestamp')
		let sites = []
		
		let data = {}
		const country = localStorage.getItem('country')
		const url = `${this.API_URL}/user/upload-data?country=`+country
		data.sites = await new SitesService().getSitesBySync()
		data.taskLandingRate = await new MapService().getSyncLandingRate()
		data.taskLarval = await new MapService().getTaskLarvals()
		data.taskTrap = await new MapService().getTaskTraps()
		data.taskTreatment = await new MapService().getTaskTreatments()
		data.taskOther = await new MapService().getTaskOthers()
		console.log(data)
		let response = await this.$http.post(url, data)
		if(response){ 
			
			new SitesService().updateSiteSync()
			new MapService().updateLRSync()
			new MapService().updateLarvalSync()
			new MapService().updateTrapSync()
			new MapService().updateTreatmentSync()
			new MapService().updateOtherSync()
			
		}
	},
	async downloadData(){
		console.log('Downloading Local Data...')
		const country = localStorage.getItem('country')
		let lastSync = localStorage.getItem('sync_timestamp')
		const url = `${this.API_URL}/user/download-data?country=`+country+`&date=`+lastSync
		let response = await this.$http.get(url)
		if(response.data.status == 200){
			console.log(response.data.data)
			let sites = response.data.data.sites.sites
			let site_types = response.data.data.site_types
			let site_sub_types = response.data.data.site_sub_types
			let site_attrs = response.data.data.site_attributes
			let site_attr_data = response.data.data.site_attr_data
			let products = response.data.data.products
			let species = response.data.data.species
			let sr_details = response.data.data.sr_details
			let taskLandingRate = response.data.taskLandingRate
			let taskLarval = response.data.data.taskLarval
			let taskOther = response.data.data.taskOther
			let taskTrap = response.data.data.taskTrap
			let taskTreatment = response.data.data.taskTreatment
			let task_type = response.data.data.task_type
			let trap_type = response.data.data.trap_type
			if(sites != undefined){
				sites.map(function(value) {
					var siteData = {
						'site_name': value.site_name,
						'siteid': value.siteid,
						'cityId': value.cityid,
						'siteTypeId': value.stypeid,
						'zoneId': value.zoneid,
						'icon': value.icon,
						'site_attr_name': value.site_attr_name,
						'site_type_name': value.site_type_name,
						'address': value.address
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
			}
			if(site_types.length){
				await new SiteTypeService().clearRecords()
				site_types.map(function(value) {
					new SiteTypeService().addSiteType(value)
				});
			}
			if(site_sub_types.length){
				await new SiteSubTypeService().clearRecords()
				site_sub_types.map(function(value) {
					new SiteSubTypeService().addSiteSubType(value)
				});
			}
			if(site_attr_data.length){
				await new SiteAttrDataService().clearRecords()
				site_attr_data.map(function(value){
					new SiteAttrDataService().addSiteAttrData(value)
				});
			}
			if(species.length){
				await new SpeciesService().clearRecords()
				species.map(function(value){
					new SpeciesService().addSpecies(value)
				})
			}
			if(products.length){
				await new ProductService().clearRecords()
				products.map(function(value){
					new ProductService().addProducts(value)
				})
			}
			if(trap_type.length){
				await new TrapTypeService().clearRecords()
				trap_type.map(function(value){
					new TrapTypeService().addTrapType(value)
				})
			}
			if(task_type.length){
				await new TaskTypeService().clearRecords()
				task_type.map(function(value){
					new TaskTypeService().addTaskType(value)
				})
			}
			if(sr_details.length){
				sr_details.map(function(value){
					new SrDetailService().addSrDetail(value)
				})
			}
			if(site_attrs.length){
				await new SiteAttrService().clearRecords()
				site_attrs.map(function(value) {
					new SiteAttrService().addSiteAttr(value)
				});
			}
		}
	}
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
