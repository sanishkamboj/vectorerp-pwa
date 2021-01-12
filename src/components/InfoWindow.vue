<template>
    <div>
        <div cellpadding="5" cellspacing="5" class="info_box" id="info_box">
        <h5 class="border-bottom pb-2 mb-3">Site Id {{site.siteid}} {{site.site_name}}</h5>
        <h6>Mosquito Source Ditch (2018 Pool Survey,WOTUS)</h6>
        <strong>37 Shepard Road ,West Hartford ,Connecticut</strong>
        <div class="button mt-3">
        <a class="btn btn-primary  mr-2 text-white btn-sm" title="Landing Rate" @click="showLandingRate()">Landing Rate</a>
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
    
</template>
<script>
export default {
    name: "InfoWindow", 
    props: {
        site: {
            type: Object,
            default: function () {
                return { siteid: 0, site_name: null }
            }
        }
    },
     mounted: function () {
        console.log(this.site)
    },
    methods:{
        showLandingRate(){
            
            console.log(this.site)
            this.$emit('landingRateModal', this.site)
        }
    }
}
</script>