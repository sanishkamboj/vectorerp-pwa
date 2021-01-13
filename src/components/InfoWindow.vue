<template>
    <div>
        <div cellpadding="5" cellspacing="5" class="info_box" id="info_box">
        <h5 class="border-bottom pb-2 mb-3">Site Id {{siteid}} {{site_name}}</h5>
        <h6>{{site_type_name}} ({{site_attr_name}})</h6>
        <strong>{{address}}</strong>
        <div class="button mt-3">
        <a class="btn btn-primary  mr-2 mt-2  text-white btn-sm" title="Landing Rate" @click="showLandingRate()">Landing Rate</a>
        <a class="btn btn-primary  mr-2 mt-2  text-white btn-sm" title="Larval Surveillance" @click="toggleLarval()" >Larval Surveillance</a>
        <a class="btn btn-primary  mr-2 mt-2  text-white btn-sm" title="Treatment Task" @click="toggleTreatment()">Treatment</a>
        <a class="btn btn-primary  mr-2 mt-2  text-white btn-sm" title="Trap" @click="toggleTrap()">Trap Place</a>
        <a class="btn btn-primary  mr-2 mt-2  text-white btn-sm" title="Other Task" @click="toggleOther()">Other</a>
        <a class="btn btn-primary  mr-2 mt-2  text-white btn-sm" href="https://lee.vectorcontrolsystem.com/site/edit&amp;mode=Update&amp;iSiteId=1" target="_blank">Edit site</a>
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
    data(){
        return {
        }
    },
    props: [
        'siteid',
        'site_name',
        'site_type_name',
        'site_attr_name',
        'address'

    ],
    mounted: function () {
        
    },
    methods:{
        showLandingRate(){
            this.$emit('landingRateModal', this.siteid)
        },
        toggleLarval(){
            this.$emit('larvalModal', this.siteid)
        },
        toggleTreatment(){
            this.$emit('treatmentModal', this.siteid)
        },
        toggleTrap(){
            this.$emit('trapModal', this.siteid)
        },
        toggleOther(){
            this.$emit('otherModal', this.siteid)
        }
    }
}
</script>