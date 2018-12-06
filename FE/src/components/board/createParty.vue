<template>
    <div id="createParty">
        <link rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
              integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
              crossorigin="anonymous">
        <b-form @submit="onSubmit" class="form" >
            <b-form-group >
                <h1><b>Party Registration</b></h1>
                <b-form-group horizontal
                              label="Party Title :"
                              label-class="text-sm-right"
                              label-for="js-party-title">
                    <b-form-input class="input"
                                  id="js-party-title"
                                  v-model="party_form.title"></b-form-input>
                </b-form-group>
                <b-form-group horizontal
                              label="Detail:"
                              label-class="text-sm-right"
                              label-for="js-party-detail">
                    <!--emoji  추가할수도 있을듯 -->
                    <b-form-textarea id="js-party-detail"
                                     v-model="party_form.detail"
                                     placeholder="Enter something"
                                     :rows="3"
                                     :max-rows="6">
                    </b-form-textarea>
                </b-form-group>
                <b-form-group horizontal
                              label="Party Picture File:"
                              label-class="text-sm-right"
                              class="mb-0 file_input">
                    <b-form-file class="file_input " v-model="file" accept=".jpg, .png" :state="Boolean(file)"
                                 placeholder="Choose a file..."
                                 @change="onFileChange($event.target.files)"></b-form-file>
                    <b-row>
                        <div class="preview" v-for="(file,index) in party_form.file_array" v-bind:key="index">
                            <b-img v-bind:id="`js-file_preview${index}`" v-if="file" :src="file.blob"/>
                            <div class="mt-3"><b>Selected file:</b><br> {{file.name}}</div>
                            <b-button class="js-delete-file" v-bind:id="`js-delete_file${index}`"
                                      @click="onDeleteButtonClick(index)">
                                <i class="fas fa-trash-alt"></i>
                            </b-button>
                        </div>
                    </b-row>
                </b-form-group>
                <b-form-group horizontal
                              label="Party Recruitment Period :"
                              label-class="input text-sm-right "
                              label-for="nestedState">
                    <input
                            type="text"
                            id="party-recruitment-period"
                            placeholder="Select dates"
                            :value="formatDates(party_form.recruitment_period_dateOne, party_form.recruitment_period_dateTwo)"
                    >
                    <AirbnbStyleDatepicker
                            :trigger-element-id="'party-recruitment-period'"
                            :mode="'range'"
                            :fullscreen-mobile="true"
                            :min-date="todayDate"
                            :date-one="party_form.recruitment_period_dateOne"
                            :date-two="party_form.recruitment_period_dateTwo"
                            @date-one-selected="val => { party_form.recruitment_period_dateOne = val }"
                            @date-two-selected="val => { party_form.recruitment_period_dateTwo = val }"
                    />
                </b-form-group>
                <b-form-group horizontal
                              label="Party Date :"
                              label-class="text-sm-right"
                              label-for="party-date">
                    <input
                            type="text"
                            id="party-date"
                            placeholder="Select dates"
                            :value="formatDates(party_form.date)"
                    >
                    <AirbnbStyleDatepicker
                            :trigger-element-id="'party-date'"
                            :mode="'single'"
                            :min-date="party_form.recruitment_period_dateTwo"
                            :fullscreen-mobile="true"
                            :date-one="party_form.date"
                            @date-one-selected="val => { party_form.date = val }"
                    />
                </b-form-group>
                <b-form-group horizontal
                              label="Location :"
                              label-class="text-sm-right"
                              class="mb-0">
                    <!--API이용한 map 필요-->
                    <b-input-group>
                        <b-form-input id="location"
                                    v-model="party_form.locationText" 
                                    type="text"
                                    placeholder="장소를 검색해주세요" />
                            <b-input-group-append>
                                <b-button variant="primary" @click="searchPlace">장소 검색</b-button>
                            </b-input-group-append>
                    </b-input-group>
                    <br>
                    <vue-daum-map :appKey="daumMap.appKey"
                                :center.sync="party_form.location"
                                :level.sync="daumMap.level"
                                :mapTypeId="daumMap.mapTypeId"
                                :libraries="daumMap.libraries"
                                @load="onLoad"

                                style="width:500px;height:400px;"

                            /><br>

                </b-form-group>
                <b-form-group horizontal
                              label="Cost :"
                              label-class="text-sm-right"
                              label-for="js-party-cost">
                    <b-form-input class="input"
                                id="js-party-cost"
                                placeholder="ex) 1회 5만원 / 재료비 30000원 / 가입비 오천원"
                                v-model="party_form.cost"></b-form-input>
                </b-form-group>
                <b-form-group horizontal
                              label="Gender :"
                              label-class="text-sm-right"
                              label-for="js-party-Gender">
                            <b-form-radio-group v-model="party_form.conditions.gender"
                                    :options="gender"
                                    id="js-party-Gender">
                            </b-form-radio-group>
                </b-form-group>
                <b-form-group horizontal
                              label="Age :"
                              label-class="text-sm-right"
                              label-for="js-party-Age">
                              <b-form-radio-group 
                                    v-model="party_form.conditions.selectAge"
                                    :options="age"
                                    @change="changeAgeCondition">
                            </b-form-radio-group>
                </b-form-group>
                <b-form-group horizontal
                              v-if="party_form.conditions.selectAge =='selectAge'"
                              style="padding-top: 10px">
                    <vueSlider v-model="party_form.conditions.age" id="js-party-conditions-age"></vueSlider>
                </b-form-group>
                <b-form-group horizontal
                              label="Category :"
                              label-class="text-sm-right"
                              label-for="js-party-category">
                              <b-input-group>
                    <b-form-select v-model="party_form.selected_category_id" :options="categoryList1" class="mb-3" @change="showSubCategory"></b-form-select>
                    <b-form-select v-model="party_form.selected_subcategory_id" :options="categoryList2" class="mb-3"></b-form-select>
                              </b-input-group>
                </b-form-group>
                <b-form-group horizontal
                              label="Min&Max Number of Member :"
                              label-class="text-sm-right"
                              label-for="js-party-number-of-member"
                              style="padding-top: 10px">
                    <vueSlider v-model="party_form.number_of_member" id="js-party-number-of-member"></vueSlider>
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button variant="danger" >Cancel</b-button>
            </b-form-group>

        </b-form>
    </div>
</template>

<script>
    import format from 'date-fns/format';
    import vueSlider from 'vue-slider-component';
    import VueDaumMap from 'vue-daum-map';

    export default {
        name: "createParty",
        components: {
            vueSlider,
            VueDaumMap
        },
        props:[
            '_title','_number_of_member','_detail','_dateOne','_dateTwo','_date',
            '_locationText','_location','_cost','_conditions','_file','_categoryId'],
        data() {
            return {
                formData : new FormData(),
                dateFormat: 'YYYY-MM-DD',
                todayDate: '',
                file: null,
                checkList: [
                    'Title','Detail', 'Start Date', 'End Date', 'Meeting Date', 'Location', 'Cost', 'Image', 'Category'
                ],
                party_form:
                    {
                        title:'',
                        number_of_member: [0, 10],
                        detail: '',
                        recruitment_period_dateOne: '',
                        recruitment_period_dateTwo: '',
                        date: '',
                        locationText: '',
                        location:{lat:37.282908, lng:127.046402},
                        cost: '',
                        conditions: {
                            gender: 'none',
                            selectAge: 'none',
                            age: [0,100],
                        },
                        file_array: [],
                        selected_category_id:null,
                        selected_subcategory_id:null
                    },
                    gender: [
                        { text: '상관 없음', value: 'none' },
                        { text: 'Female', value: 'female' },
                        { text: 'Male', value: 'male' }
                    ],
                    age: [
                        {text: '상관 없음', value: 'none'},
                        {text: '직접 설정', value: 'selectAge'}
                    ],
                categoryList1: [{ value: null, text: '--- 대분류 ---', disabled:true}],
                categoryList2: [],
                subCategoryList: [],
                // categoryList1: [
                //     { value: null, text: '--- 대분류 ---', disabled:true},
                //     { value: 0, text: '게임'},
                //     { value: 1, text: '운동'},
                // ],
                // subCategoryList: [
                //     [
                //         { value: null, text: '--- 소분류 ---', disabled:true},
                //         { value: 0, text: '오버워치'},
                //         { value: 1, text: '배그'},
                //         { value: 2, text: '피파'},
                //         { value: 3, text: '닌텐도'},
                //         { value: 4, text: '보드게임'},
                //     ],
                //     [
                //         { value: null, text: '--소분류--', disabled:true},
                //         { value: 0, text: '축구'},
                //         { value: 1, text: '야구'},
                //         { value: 2, text: '테니스'},
                //         { value: 3, text: '춤'},
                //     ],
                // ],
                daumMap:{
                    appKey: 'a3cfd8f8c44ef55f94f2fa1a99a18558',
                    // center: {lat:37.282908, lng:127.046402},
                    level: 4,
                    mapTypeId: VueDaumMap.MapTypeId.NORMAL,
                    libraries: ['services'],
                    map: null
                }
            }
        },
        mounted(){
            this.todayDate = new Date();
            this.todayDate = this.formatDates(this.todayDate);

            this.getCategoryList();

        },
        methods: {
            onFileChange(fileList) {
                Array.from(Array(fileList.length).keys()).map(x => {
                    this.party_form.file_array.push({blob: URL.createObjectURL(fileList[x])});
                    this.formData.append('postFile', fileList[x], fileList[x].name);
                });
            },
            onDeleteButtonClick(index) {
                this.$delete(this.party_form.file_array, index)
            },
            formatDates(dateOne, dateTwo) {
                let formattedDates = ''
                if (dateOne) {
                    formattedDates = format(dateOne, this.dateFormat)
                }
                if (dateTwo) {
                    formattedDates += ' - ' + format(dateTwo, this.dateFormat)
                }
                return formattedDates
            },
            onSubmit(evt) {
                evt.preventDefault();
                var boardId;
                var party = this.party_form;
                var checkList = this.checkList;
                var alertString = '';
                var validationCheck = [
                    party.title,
                    party.detail,
                    party.recruitment_period_dateOne,
                    party.recruitment_period_dateTwo,
                    party.date,
                    party.locationText,
                    party.cost,
                    party.file_array,
                    party.selected_subcategory_id
                ];

                for(var i=0;i<validationCheck.length;i++){
                    if(validationCheck[i]==null||validationCheck[i]==''){
                        alertString += checkList[i] + ', ';
                    }
                }
                if(alertString != ''){
                    alert(alertString+" 칸을 채워주세요!");
                }
                else if(party.date < party.recruitment_period_dateTwo){
                    alert("모임 날짜가 모집 날짜보다 이릅니다! 다시 선택해주세요.");
                }
                else {
                this.$http.defaults.headers.post['Content-Type'] = 'multipart/form-data'
                this.$http.post('http://localhost:3000/board', {
                    title : this.party_form.title,
                    due_date : this.party_form.recruitment_period_dateTwo,
                    start_date : this.party_form.recruitment_period_dateOne,
                    meeting_date : this.party_form.date,
                    min_num : this.party_form.number_of_member[0],
                    max_num : this.party_form.number_of_member[1],
                    cost : this.party_form.cost,
                    category_id : this.party_form.selected_category_id,
                    conditions : { gender : this.party_form.conditions.gender, age : this.party_form.conditions.age},
                    detail:this.party_form.detail,
                    location : this.party_form.location,
                    locationText : this.party_form.locationText,
                    // host :,
            })
            // 이미지 업로드
            .then((result) => {
                boardId = result.data._id
                this.$http.post('http://localhost:3000/board/files/'+ boardId, this.formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            })
            .then(()=> {
                window.location.href = "http://localhost:8080/party/detail/" + boardId
            })
                }
            },
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
                var keyword = this.party_form.locationText;
                var ps = new daum.maps.services.Places();
                var iwPosition = new daum.maps.LatLng(33,126);
                var infowindow = new daum.maps.infowindow({
                    zIndex:1
                });

                if (!keyword.replace(/^\s+|\s+$/g, '')) {
                    alert('키워드를 입력해주세요!');
                }
                else {
                    ps.keywordSearch(keyword,
                        (data,status,pagination)=>{
                            if(status == daum.maps.services.Status.OK){
                                // 마커 표출
                                // 페이지 번호 표출
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
            changeAgeCondition(){
                if(this.party_form.conditions.selectAge == 'none'){
                    this.party_form.conditions.age = [20,30];
                } else {
                    this.party_form.conditions.age = [0,100];
                }
            },
            editor(){
                var party = this.party_form;
                party.title = this._title;
                party.number_of_member = this._number_of_member;
                party.detail =this._detail;
                party.recruitment_period_dateOne = this._dateOne;
                party.recruitment_period_dateTwo = this._dateTwo;
                party.date = this._date;
                party.locationText = this._locationText;
                party.location = this._location;
                party.cost = this._cost;
                party.conditions = this._conditions;
                party.file_array = this._file;
                party.selected_category_id = this._categoryId;
                // alert(party.title);
            },
            getCategoryList() {
                var vm = this
                this.$http.get('http://localhost:3000/category')
                .then((result) => {
                    // get category list
                    for(var i=0; i<result.data.length; i++) {
                            var categoryOption = '{"value" : "' + i + '", "text" : "'+ result.data[i].name+'"}';
                            vm.categoryList1.push(JSON.parse(categoryOption));

                    }

                    // get sub category list
                    for(var i=0; i<result.data.length; i++) {
                        var categoryOption = [{ value: null, text: '--- 소분류 ---', disabled:true}];
                        for(var j=0; j<result.data[i].sub_category.length ; j++){
                            var option = '{"value" : "' + result.data[i].sub_category[j]._id + '", "text" : "'+ result.data[i].sub_category[j].name+'"}';
                            categoryOption.push(JSON.parse(option));
                        }
                        vm.subCategoryList.push(categoryOption);
                    }
                });
            },
            showSubCategory(select){
                this.party_form.selected_subcategory_id = null;
                this.categoryList2 = this.subCategoryList[select];
            }
        }
    }

</script>

<style scoped>
    body {
        background-color: #e2e2e2;
    }

    .preview {
        display: inline;
        justify-content: center;
        align-items: center;
        padding: 10px 10px 10px 20px;
    }

    .preview img {
        width: 250px;
        height: 300px;
        max-width: 100%;
        max-height: 500px;
    }

    .input
    .file_input {
        alignment: left;
        width: 80%;
    }

    .file_input {
        alignment: left;
        padding-bottom: 15px;
    }

    .form {
        width: 50%;
        margin: 0 auto;
    }

    h1 {
        padding-bottom: 30px;
    }
</style>
