<template>
    <div>
        <br><vue-daum-map 
            :appKey="daumMap.appKey"
            :center.sync="location.latlng"
            :level.sync="daumMap.level"
            :mapTypeId="daumMap.mapTypeId"
            :libraries="daumMap.libraries"
            @load="onLoad"
            style="width:500px;height:400px;"
        />
    </div>
</template>

<script>
import VueDaumMap from 'vue-daum-map';

export default {
    components:{
        VueDaumMap
    },
    props:{
        location: {}
    },
    data(){
        return {
            daumMap:{
                    appKey: 'a3cfd8f8c44ef55f94f2fa1a99a18558',
                    level: 3,
                    mapTypeId: VueDaumMap.MapTypeId.NORMAL,
                    libraries: ['services'],
                    map: null
            },
        }
    },
    methods:{
        onLoad(map){
                this.daumMap.map = map;

                var iwContent = '<div><pre>' + this.location.title+ ' </pre></div>'
                var iwPosition = new daum.maps.LatLng(this.location.latlng.lat, this.location.latlng.lng);
                var marker = new daum.maps.Marker({
                    position: iwPosition,
                    map: this.daumMap.map
                });
                var infowindow = new daum.maps.InfoWindow({
                    position: iwPosition,
                    content: iwContent
                });
                infowindow.open(this.daumMap.map, marker);
            },
    }
}
</script>

