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
export default {
    name: "Search", 
    data(){
       return {
        siteId: null, 
       }
   },
   computed: {
	searchSidebar(){
		return this.$store.state.searchSidebar
	}
  },
}
</script>