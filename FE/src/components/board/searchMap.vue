<template>
<div id="searchMap">
    <b-container>
        <b-row>
            <b-col>
                <vue-daum-map
                    :appKey="daumMap.appKey"
                    :center.sync="daumMap.center"
                    :level.sync="daumMap.level"
                    :mapTypeId="daumMap.mapTypeId"
                    :libraries="daumMap.libraries"
                    @load="onLoad"
                    style="width:500px;height:400px;"
                /> <br>
            </b-col>
            <b-col>
                <b-input-group>
                        <b-form-input id="location"
                                    v-model="keyword" 
                                    type="text"
                                    placeholder="장소를 검색해주세요" />
                            <b-input-group-append>
                                <b-button variant="primary" @click="searchPlace">장소 검색</b-button>
                            </b-input-group-append>
                </b-input-group><br>
                <b-list-group id="placeList">
                    <b-list-group-item v-for="place in daumMap.placeList">
                        <p> <span id="placeText" @click="showPlace(place.title,place.location)"> {{place.id}} : {{ place.title }} </span> <br>
                            <span id="placeAddress">{{place.road_address}}</span>
                        </p>
                    </b-list-group-item>
                </b-list-group>
                <br>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-input readonly
                            v-model="result" 
                            type="text" />
            </b-col>
            <b-col>
                <b-pagination align="center" :total-rows=totalPage :per-page="1">
                </b-pagination>
            </b-col>
        </b-row>
    </b-container>
    <b-button-group class="mapBtn">
        <b-button class="btn btn-info">취소</b-button>
        <b-button class="btn btn-info">확인</b-button>
    </b-button-group>
</div>
    
</template>

<script>
import VueDaumMap from 'vue-daum-map';

export default {
    name: "searchMap",
    components:{
        VueDaumMap
    },
    data(){
        return {
            keyword: '',
            result: '',
            totalPage: 0,
            daumMap:{
                    appKey: 'a3cfd8f8c44ef55f94f2fa1a99a18558',
                    center: {lat:37.282908, lng:127.046402},
                    level: 4,
                    mapTypeId: VueDaumMap.MapTypeId.NORMAL,
                    libraries: ['services'],
                    map: null,
                    markers:[],
                    placeList:[]
            }
        }
    },
    methods:{
        onLoad(map){
                this.daumMap.map = map;
                // var bounds = map.getBounds();
                // var boundsStr = bounds.toString();

                // var iwContent = '<br><pre> 아주대학교 </pre>'
                // var iwPosition = new daum.maps.LatLng(this.party_form.location["lat"], this.party_form.location["lng"]);
                // var marker = new daum.maps.Marker({
                //     position: iwPosition,
                //     map: map
                // });
                // var infowindow = new daum.maps.InfoWindow({
                //     position: iwPosition,
                //     content: iwContent
                // });
                // infowindow.open(map, marker)
                

            },
            searchPlace(){
                // 장소 찾기....
                this.removeMarker();
                this.daumMap.placeList = [];

                var keyword = this.keyword;
                var ps = new daum.maps.services.Places();
                // var iwPosition = new daum.maps.LatLng(33,126);
                // var infowindow = new daum.maps.infowindow({
                //     zIndex:1
                // });

                if (!keyword.replace(/^\s+|\s+$/g, '')) {
                    alert('키워드를 입력해주세요!');
                }
                else {
                    ps.keywordSearch(keyword,
                        (result,status,pagination)=>{
                            if(status == daum.maps.services.Status.OK){
                                // 마커 표출
                                this.displayPlaces(result);
                                // 페이지 번호 표출
                                this.displayPagination(pagination);
                            }
                            else if(status == daum.maps.services.Status.ZERO_RESULT){
                                alert('검색 결과가 존재하지 않습니다.');
                            }
                            else if(status == daum.maps.services.Status.ERROR){
                                alert('검색 중 오류가 발생했습니다.');
                            }
                        });
                }
             },
             displayPlaces(places){
                 var bounds = new daum.maps.LatLngBounds();
                //  var infowindow = new daum.maps.InfoWindow({
                //     zIndex:1
                // });

                 for(var i=0;i<places.length;i++){
                    console.log("place "+i+" : "+places[i].place_name);
                    var placePosition = new daum.maps.LatLng(places[i].y, places[i].x);
                    var marker = this.addMarker(placePosition, i);

                    bounds.extend(placePosition);

                    this.daumMap.placeList.push({
                        id: i+1,
                        title: places[i].place_name,
                        url: places[i].place_url,
                        road_address: places[i].road_address_name,
                        location: {
                            lat: places[i].y,
                            lng: places[i].x
                        }
                    });
                    
                    // this.controlInfowindow(marker, places[i].place_name);
                 }
                 this.daumMap.map.setBounds(bounds);
            },
            addMarker(position, idx, title){
                var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'; // 마커 이미지 url, 스프라이트 이미지를 씁니다
                var imageSize = new daum.maps.Size(36,37);
                var imgOptions = {
                    spriteSize : new daum.maps.Size(36, 691), // 스프라이트 이미지의 크기
                    spriteOrigin : new daum.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                    offset: new daum.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                };
                var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imgOptions);
                var marker = new daum.maps.Marker({
                    position: position, // 마커의 위치
                    image: markerImage 
                });

                marker.setMap(this.daumMap.map);
                this.daumMap.markers.push(marker);

                return marker;
            },
            // controlInfowindow(marker, title) {
            //     var infowindow = new daum.maps.InfoWindow();
            //     daum.maps.event.addListener(marker, 'mouseover', 
            //         this.displayInfowindow(infowindow,marker,title)
            //     );
            //     daum.maps.event.addListener(marker, 'mouseout', function() {
            //         infowindow.close();
            //     });
            // },
            // displayInfowindow(infowindow, marker, title){
            //     var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
            //     infowindow.setContent(content);
            //     infowindow.open(this.daumMap.map, marker);
            //     console.log('mouseover');
            // },
            removeMarker(){
                for ( var i = 0; i < this.daumMap.markers.length; i++ ) {
                    this.daumMap.markers[i].setMap(null);
                }   
                this.daumMap.markers = [];
            },
            displayPagination(pagination){
                this.totalPage = pagination.last;
                 for (var i=1; i<=pagination.last; i++){
                     console.log(i + " : "+pagination)
                 }
            },
            showPlace(title,location){
                this.result = title;
            }
    }
}
</script>

<style>
#searchMap {
    margin: 20px;
}

#placeList {
    height: 350px;
    overflow-y:scroll;
}

#placeText {
    cursor: pointer;
    font-size: 18px;
}

#placeAddress {
    color: rgb(126, 126, 126);
}

.mapBtn {
    text-align: center;
    margin: 20px;
}
</style>
