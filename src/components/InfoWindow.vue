<template>
    <div v-if="shouldRender">
        <div cellpadding="5" cellspacing="5" class="info_box" id="info_box">
        <h5 class="border-bottom pb-2 mb-3">Site Id {{siteid}} {{site_name}}</h5>
        <h6>{{site_type_name}}</h6>
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
        <span class="w-100 d-block  pb-2">
        <a style="display: block;" v-for="(m, index) in taskLandingRate" :key="index" href="javascript:void(0);">{{m.due_date}} Found {{m.tDescription}}</a>
        <a style="display: block;" v-for="(m, index) in taskLarval" :key="index" href="javascript:void(0);">{{m.due_date}} {{m.note}}</a>
        <a style="display: block;" v-for="(m, index) in taskTrap" :key="index" href="javascript:void(0);">{{m.trap_placed}} {{m.trap_type}} Placed</a>
        <a style="display: block;" v-for="(m, index) in taskTreatment" :key="index" href="javascript:void(0);">{{m.date}} Treated {{m.area_treated}} {{m.area}} With {{m.amount_applied}} {{m.amount_unit}} {{m.product}}</a>
        <a style="display: block;" v-for="(m, index) in taskOther" :key="index" href="javascript:void(0);">{{m.date}} {{m.task}}</a>
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
            history: [],
            taskLandingRate: [],
            taskLarval: [],
            taskTrap: [],
            taskTreatment: [],
            taskOther:[]
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
            this.taskLandingRate = await new MapService().getLandingHistory(id)
            this.taskLarval = await new MapService().getLarvalHistory(id)
            this.taskTrap = await new MapService().getTrapHistory(id)
            this.taskTreatment = await new MapService().getTreatmentHistory(id)
            this.taskOther = await new MapService().getOtherHistory(id)
            this.history = records
            console.log(this.taskTrap)
        }
    },
    computed:{
    }
}
</script>