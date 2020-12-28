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
							<input type="checkbox" class="form-check-input" id="exampleCheck1">
							<label class="form-check-label" for="exampleCheck1">Draw Polyline</label>
						</div>
						<input type="text" class="form-control accordion-link" placeholder="Length in ft" />
						<input type="text" class="form-control accordion-link" placeholder="Length in mile" />		
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
							<input type="checkbox" class="form-check-input" id="exampleCheck1">
							<label class="form-check-label" for="exampleCheck1">Draw polygon</label>
						</div>
						<input type="text" class="form-control accordion-link" placeholder="Area in sq. ft" />
						<input type="text" class="form-control accordion-link" placeholder="Area in sq. mile" />	
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
							<input type="checkbox" class="form-check-input" id="exampleCheck1">
							<label class="form-check-label" for="exampleCheck1">Draw Circle</label>
						</div>
						<input type="text" class="form-control accordion-link" placeholder="Radius of circle" />
						<input type="text" class="form-control accordion-link" placeholder="Area of circle" />
				</div>
				</div>
			</div>
			</div>
		</div>
</template>
<script>
export default {
   name: "Tools", 
   computed: {
	toolsSideBar(){
		return this.$store.state.toolsSideBar
	}
  },
}
</script>