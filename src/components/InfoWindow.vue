<template>
    <div v-if="shouldRender">
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
        <a class="btn btn-primary  mr-2 mt-2  text-white btn-sm" :href="editUrl" target="_blank">Edit site</a>
        <!--a class="btn btn-primary  mr-2 mt-2 text-white btn-sm" title="Landing Rate">Insta Treat</a-->
        </div>
        
        <h5 v-if="history" class="border-bottom pb-2 mb-3 mt-3">History</h5>
        <span class="w-100 d-block  pb-2" v-for="(m, index) in history" :key="index">
        <a v-if="index== 'taskLandingRate'" href="javascript:void(0);">{{m[0].due_date}} Found {{m[0].tDescription}}</a>
        <a v-else-if="index== 'taskLarval'" href="javascript:void(0);">{{m[0].due_date}} {{m[0].note}}</a>
        </span>
        </div>
    </div>
    <div v-else>
        <div v-html="infoWindowSearch"></div>
    </div>
</template>
<script>
import { MapService } from '../service/map_service';
export default {
    name: "InfoWindow", 
    data(){
        return {
            editUrl: '',
            history: []
        }
    },
    props: [
        'siteid',
        'site_name',
        'site_type_name',
        'site_attr_name',
        'address',
        'shouldRender',
        'infoWindowSearch'

    ],
    created: function () {
        this.editUrl = "https://lee.vectorcontrolsystem.com/site/edit&amp;mode=Update&amp;iSiteId="+this.siteid
        //this.getHistory()
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
        },
        getHistory: async function(siteid) {
            let id = parseInt(siteid)
            let records = {}
            records.taskLandingRate = await new MapService().getLandingHistory(id)
            records.taskLarval = await new MapService().getLarvalHistory(id)
            this.history = records
            console.log(this.history)
        }
    },
    computed:{
    }
}
</script>