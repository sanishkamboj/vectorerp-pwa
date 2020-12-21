<template>
	<div class="map">
		
		<gmap-map ref="mapRef" :center="center" :zoom="10" style="width: 100%; height: 100%">
			<gmap-polygon :paths="paths" :editable="true" @paths_changed="updateEdited($event)">
			</gmap-polygon>
		</gmap-map>
		<div class="right-bar" :class="sidebarClass" >
			<h5 class="mobile-view">
				<div class="mobile-title mb-3" @click="$store.commit('toggleSidebarMobile')"><i class="fa fa-arrow-left"></i> Main</div>
			</h5>
			
			<div><span><a><i class="uil uil-bars desktop-view"></i><i class="uil uil-arrow-right mobile-view"></i> </a> Tools</span></div>
			<div><span><a><i class="uil uil-bars desktop-view"></i><i class="uil uil-arrow-right mobile-view"></i></a> Filters</span></div>
			<div><span><a><i class="uil uil-bars desktop-view"></i><i class="uil uil-arrow-right mobile-view"></i></a> Layers</span></div>
			<div><span><a><i class="uil uil-bars desktop-view"></i><i class="uil uil-arrow-right mobile-view"></i></a> Search</span></div>
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
		
		<div class="right-section d-none">
			
			<h3 class="popup-title desktop-view">Map Tools <a class="float-right"><i class="uil uil-times"></i></a></h3>
			<h5 class="mobile-view">
				<div class="mobile-title"><i class="fa fa-arrow-left"></i> Map Tools</div>
			</h5>
			
			<div id="accordion">
			<div class="card">
				<div class="card-header" id="headingOne">
				<h5 class="mb-0 pl-4">
					<button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
					<input type="checkbox" class="form-check-input" id="exampleCheck1"> Collapsible Group Item #1 <i class="uil uil-angle-right"></i>
					</button>
				</h5>
				</div>

				<div id="collapseOne" class="collapse show" aria-labelledby="headingOnenew" data-parent="#accordion">
				<div class="card-body pt-1">
					
						<div class="form-check">
							<input type="checkbox" class="form-check-input" id="exampleCheck1">
							<label class="form-check-label" for="exampleCheck1">Check me out</label>
						</div>
						<div class="form-check">
							<input type="checkbox" class="form-check-input" id="exampleCheck1">
							<label class="form-check-label" for="exampleCheck1">Check me out</label>
						</div>
						<div class="form-check">
							<input type="checkbox" class="form-check-input" id="exampleCheck1">
							<label class="form-check-label" for="exampleCheck1">Check me out</label>
						</div>
						
			
						
				

					
				</div>
				</div>
			</div>
			<div class="card">
				<div class="card-header" id="headingTwo">
				<h5 class="mb-0">
					<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
					Collapsible Group Item #2 <i class="uil uil-angle-right"></i>
					</button>
				</h5>
				</div>
				<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
				<div class="card-body pt-1">
						<div class="form-check">
							<input type="checkbox" class="form-check-input" id="exampleCheck1">
							<label class="form-check-label" for="exampleCheck1">Check me out</label>
						</div>
						<button class="accordion-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
						Collapsible Group Item #1
						</button>
						<button class="accordion-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
						Collapsible Group Item #1
						</button>
						<button class="accordion-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
						Collapsible Group Item #1
						</button>
				</div>
				</div>
			</div>
			<div class="card">
				<div class="card-header" id="headingThree">
				<h5 class="mb-0">
					<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
					Collapsible Group Item #3 <i class="uil uil-angle-right"></i>
					</button>
				</h5>
				</div>
				<div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
				<div class="card-body pt-1">
						<div class="form-check">
							<input type="checkbox" class="form-check-input" id="exampleCheck1">
							<label class="form-check-label" for="exampleCheck1">Check me out</label>
						</div>
						<button class="accordion-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
						Collapsible Group Item #1
						</button>
						<button class="accordion-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
						Collapsible Group Item #1
						</button>
						<button class="accordion-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
						Collapsible Group Item #1
						</button>
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
			
		</div>
		
	
	</div>
  
</template>

<script>
import { initJsStore } from "../service/idb_service";
import { SitesService } from "../service/sites_service";
import { SiteTypeService } from "../service/siteType_service";
import { SiteSubTypeService } from "../service/siteSubType_service";
import { SiteAttrService } from "../service/siteAttr_service";
import { CityService } from "../service/city_service";
import { Global } from "../global";
export default {
  name: "Home",
  components: {
    
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
        siteAttribute: ''
      },
    },
  async beforeCreate() {
    try {
      const isDbCreated = await initJsStore();
      if (isDbCreated) {
		console.log("db created");
		// prefill database
		this.changeSpinnerStatus(true)
		await this.getData().then(this.changeSpinnerStatus())
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
  },
  data() {
    return {
	  sites: [],
	  center: {lat: 1.38, lng: 103.8},
	  API_URL: this.$store.state.API_URL,
	  siteModalClass: 'd-none',
	  siteTypeOpt: '',
	  siteSubTypeOpt: '',
	  siteAttributeOpt: '',
	  markers: [],
	  edited: null,
	  paths: [
	  ]
    };
  },
  computed: {
    sidebarClass() {
      return this.$store.state.sidebarClass
    }
  },
  methods: {
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
				this.paths = [
					[ {lat: 1.380, lng: 103.800}, {lat:1.380, lng: 103.810}, {lat: 1.390, lng: 103.810}, {lat: 1.390, lng: 103.800} ],
					[ {lat: 1.382, lng: 103.802}, {lat:1.382, lng: 103.808}, {lat: 1.388, lng: 103.808}, {lat: 1.388, lng: 103.802} ],
				]
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
      }
    /*addStudent(student) {
      this.students.push(student);
    } */
  }
};
</script>

<style>
.show-sidebar {
transition: .3s all ease;
}
.vue-map-container{
	position: absolute !important;
}
</style>
