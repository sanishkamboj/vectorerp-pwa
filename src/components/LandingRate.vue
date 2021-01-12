<template>
    <div>
        <div class="popup-overlay" :class="landingRateModal">
			<div class="popup-wrapper">
				<h3 class="popup-title desktop-view">Add Landing Rate <a class="float-right"><i class="uil uil-times"></i></a></h3>
				<h5 class="mobile-view">
					<div class="mobile-title mb-3" @click="createSiteModel()"><i class="fa fa-arrow-left"></i> Add Landing Rate</div>
				</h5>
				
				<form >
				<div class="form-group">
					<label for="exampleInputEmail1">Site Name</label>
					<input type="text" class="form-control" v-model="createSite.siteName" id="site_name" aria-describedby="ste_name" placeholder="Enter site name">
				</div>
				
				<div class="row pt-2">
					<div class="col">
						<button class="btn btn-blue w-100">Submit</button>
					</div>
					<div class="col">
						<a class="btn btn-red w-100">Cancel</a>
					</div>
				</div>
				</form>
				
			</div>
		</div>
    </div>
</template>
<script>
export default {
    name: "LandingRate",
}
</script>