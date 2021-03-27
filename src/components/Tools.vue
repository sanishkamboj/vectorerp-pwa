<template>
    <div class="right-section" :class="toolsSideBar">
			
			<h3 class="popup-title desktop-view">Map Tools <a class="float-right" @click="$store.commit('toggleToolsSideBar')"><i class="uil uil-times"></i></a></h3>
			<h5 class="mobile-view">
				<div class="mobile-title" @click="$store.commit('toggleToolsSideBar')"><i class="fa fa-arrow-left"></i> Map Tools</div>
			</h5>
			<div id="accordion">
			<div class="card">
				<div class="card-header" id="headingOne">
				<h5 class="mb-0">
					<button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
					Distance <i class="uil uil-angle-right"></i>
					</button>
				</h5>
				</div>
				<div id="collapseOne" class="collapse show" aria-labelledby="headingOnenew" data-parent="#accordion">
				<div class="card-body pt-1">
					
						<div class="form-check">
							<input type="checkbox" class="form-check-input" v-model="polylineCheckbox" @click="drawPolylineShape" id="drawLine">
							<label class="form-check-label" for="exampleCheck1">Draw Polyline</label>
						</div>
						<input type="text" class="form-control accordion-link" :value="lineDistance || ''" placeholder="Length in ft" />
						<input type="text" class="form-control accordion-link" :value="polylineDistanceInFt || ''" placeholder="Length in mile" />		
				</div>
				</div>
			</div>
			<div class="card">
				<div class="card-header" id="headingTwo">
				<h5 class="mb-0">
					<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
					Area <i class="uil uil-angle-right"></i>
					</button>
				</h5>
				</div>
				<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
				<div class="card-body pt-1">
						<div class="form-check">
							<input type="checkbox" class="form-check-input" v-model="polygonCheckbox" @click="drawPolygonShape" id="drawPolygon">
							<label class="form-check-label" for="exampleCheck1">Draw polygon</label>
						</div>
						<input type="text" class="form-control accordion-link" :value="polyAreaFt || ''" placeholder="Area in sq. ft" />
						<input type="text" class="form-control accordion-link" :value="polyAreaMile || ''" placeholder="Area in sq. mile" />	
				</div>
				</div>
			</div>
			<div class="card">
				<div class="card-header" id="headingThree">
				<h5 class="mb-0">
					<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
					Circle <i class="uil uil-angle-right"></i>
					</button>
				</h5>
				</div>
				<div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
				<div class="card-body pt-1">
						<div class="form-check">
							<input type="checkbox" class="form-check-input" v-model="circleCheckbox" @click="drawCircleShape" id="drawCircle">
							<label class="form-check-label" for="exampleCheck1">Draw Circle</label>
						</div>
						<input type="text" class="form-control accordion-link" :value="circleRadius || ''"  placeholder="Radius of circle" />
						<input type="text" class="form-control accordion-link"  :value="circleArea || ''" placeholder="Area of circle" />
				</div>
				</div>
			</div>
			</div>
		</div>
</template>
<script>
export default {
   name: "Tools", 
   props: [
	   'lineDistance',
	   'polylineDistanceInFt',
	   'circleRadius',
	   'circleArea',
	   'polyAreaFt',
	   'polyAreaMile',
   ],
   data(){
       return {
		drawPolygon: false,
		drawCircle: false,
		drawLine: false,
		polylineCheckbox: false,
		polygonCheckbox: false,
		circleCheckbox: false,
		polygonPath: [],
		paths: [],
		lines: []
        
       }
   },
   computed: {
	toolsSideBar(){
		return this.$store.state.toolsSideBar
	},
  },
  methods: {
	  drawPolygonShape(){
		 
		  if(!this.drawPolygon){
			this.$store.commit('toggleToolsSideBar')
			this.drawCircle = this.drawCircle?false:false;
			this.drawLine = this.drawLine?false:false;
			this.polylineCheckbox = false
			this.circleCheckbox = false
			this.drawPolygon = true
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

			//this.paths.push(path)
			this.$emit('changeLines', [])
			this.$emit('changeCircle', { lng: 0, lat: 0 })
			this.$emit('changePolygon', path)
			this.$store.dispatch('changePolygonEditable', true)
			//console.log(this.paths)
		  } else{
			   this.drawPolygon = false
			   this.paths = []
			   this.$emit('changePolygon', this.paths)
				this.$store.dispatch('changePolygonEditable', false)
		  }
	  },
	  drawCircleShape(){
		  
		  if(!this.drawCircle){
			this.$store.commit('toggleToolsSideBar')
			this.drawPolygon = this.drawPolygon?false:false;
			this.drawLine = this.drawLine?false:false;
			this.polylineCheckbox = false
			this.polygonCheckbox = false
			this.drawCircle = true
			var bounds = this.$store.state.map.$mapObject.getBounds()
            var northEast = bounds.getNorthEast()
            var southWest = bounds.getSouthWest()
            var center = bounds.getCenter()
            var degree = this.paths.length + 1;
            var f = Math.pow(0.66, degree)
            var path = { lng: center.lng(), lat: (1-f) * center.lat() + (f) * northEast.lat() }
			//this.paths.push(path)
			this.$emit('changePolygon', [])
			this.$emit('changeLines', [])
			this.$emit('changeCircle', path)
		  } else{
			   this.drawCircle = false
			   var path = { lng: 0, lat: 0 }
			   this.$emit('changeCircle', path)
		  }
	  },
	  drawPolylineShape(){
		   if(!this.drawLine){
			this.$store.commit('toggleToolsSideBar')
			this.drawCircle = this.drawCircle?false:false;
			this.drawPolygon = this.drawPolygon?false:false;
			this.circleCheckbox = false
			this.polygonCheckbox = false
			this.drawLine = true
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
			console.log(path)
			
			this.$emit('changePolygon', [])
			this.$emit('changeCircle', { lng: 0, lat: 0 })
			this.$emit('changeLines', path)
			this.$store.dispatch('changeLineEditable', true)
		  } else{
			   this.drawLine = false
			   this.paths = []
			   this.$emit('changeLines', this.paths)
			   this.$store.dispatch('changeLineEditable', false)
		  }
	  }
  },
}
</script>