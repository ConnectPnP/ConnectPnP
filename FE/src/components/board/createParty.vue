<template>
    <div id="createParty">
        <modals-container @getResult="getResult"/>
        <link rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
              integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
              crossorigin="anonymous">
        <b-form @submit="onSubmit" class="form">
            <b-form-group>
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
                                     @keypress="onEnter"
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
                            class="calendarPosition"
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
                            class="calendarPosition"
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
                        <b-form-input readonly
                                      id="location"
                                      v-model="party_form.location.title"
                                      type="text"
                                      placeholder="장소를 검색해주세요"/>
                        <b-input-group-append>
                            <b-button variant="primary" @click="showSearchMap">장소 검색</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <br>

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
                    <div v-if="isEdit"> 수정 전 카테고리 : {{detailEdit.category.name}} > {{detailEdit.subCategory.name}}</div>
                    <b-input-group>
                        <br>
                        <b-form-select v-model="party_form.selected_category_id" :options="categoryList1" class="mb-3"
                                       @change="showSubCategory"></b-form-select>
                        <b-form-select v-model="party_form.selected_subcategory_id" :options="categoryList2"
                                       class="mb-3"></b-form-select>
                    </b-input-group>
                </b-form-group>
                <b-form-group horizontal
                              label="Min&Max Number of Member :"
                              label-class="text-sm-right"
                              label-for="js-party-number-of-member"
                              style="padding-top: 10px">
                    <vueSlider v-model="party_form.number_of_member" id="js-party-number-of-member" min=1></vueSlider>
                </b-form-group>
                <b-button v-if="isEdit" type="submit" variant="primary">Edit</b-button>
                <b-button v-if="!isEdit" type="submit" variant="primary">Submit</b-button>
                <b-button variant="danger">Cancel</b-button>
            </b-form-group>

        </b-form>
    </div>
</template>

<script>
    import format from 'date-fns/format';
    import vueSlider from 'vue-slider-component';
    import SearchMap from './searchMap.vue';
    const config = require('../../server.config');
    export default {
        name: "createParty",
        components: {
            vueSlider,
            SearchMap
        },
        props: {
            currentGroupId: '',
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                currentUser: '',
                detailEdit: {},
                formData: new FormData(),
                dateFormat: 'YYYY-MM-DD',
                todayDate: '',
                file: null,
                checkList: [
                    'Title', 'Detail', 'Start Date', 'End Date', 'Meeting Date', 'Location', 'Cost', 'Image'
                ],
                party_form:
                    {
                        title: '',
                        number_of_member: [1, 10],
                        detail: '',
                        recruitment_period_dateOne: '',
                        recruitment_period_dateTwo: '',
                        date: '',
                        location: {},
                        cost: '',
                        conditions: {
                            gender: 'none',
                            selectAge: 'none',
                            age: [0, 100],
                        },
                        file_array: [],
                        selected_category_id: {},
                        selected_subcategory_id: null
                    },
                gender: [
                    {text: '상관 없음', value: 'none'},
                    {text: 'Female', value: 'female'},
                    {text: 'Male', value: 'male'}
                ],
                age: [
                    {text: '상관 없음', value: 'none'},
                    {text: '직접 설정', value: 'selectAge'}
                ],
                categoryList1: [{value: {}, text: '--- 대분류 ---', disabled: true}],
                categoryList2: [],
                subCategoryList: [],
            }
        },
        created() {
            this.getCategoryList();

            if (this.isEdit == true) {
                this.editor();
            }

            this.currentUser = this.$session.get('id');

            this.todayDate = new Date();
            this.todayDate = this.formatDates(this.todayDate);


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
            onEnter(event){

                if(event.which ==13){
                    event.preventDefault();
                    this.party_form.detail = this.party_form.detail+'\n'
                    console.log(this.party_form.detail)
                }

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
                var vm = this
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
                    party.location.title,
                    party.cost,
                    party.file_array
                ];

                // 빈칸 체크
                for (var i = 0; i < validationCheck.length; i++) {
                    if (validationCheck[i] == null || validationCheck[i] == '') {
                        alertString += checkList[i] + ', ';
                    }
                }
                //카테고리 체크
                if (party.selected_subcategory_id == null) {
                    if (this.categoryList2.length != 1) {
                        alertString += 'Category';
                    }
                }

                if (alertString != '') {
                    alert(alertString + " 칸을 채워주세요!");
                } else if (party.date < party.recruitment_period_dateTwo) {
                    alert("모임 날짜가 모집 날짜보다 이릅니다! 다시 선택해주세요.");
                } else {
                    var mainImage =''
                    this.$http.defaults.headers.post['Content-Type'] = 'multipart/form-data'
                    if (this.isEdit == false) {
                        this.$http.post(config.serverUrl()+'board', {
                            title: party.title,
                            due_date: party.recruitment_period_dateTwo,
                            start_date: party.recruitment_period_dateOne,
                            meeting_date: party.date,
                            min_num: party.number_of_member[0],
                            max_num: party.number_of_member[1],
                            cost: party.cost,
                            category: party.selected_category_id.id,
                            subCategory: party.selected_subcategory_id,
                            conditions: {gender: party.conditions.gender, age: party.conditions.age},
                            detail: party.detail,
                            location: party.location,
                            host: this.currentUser
                        })
                        // 이미지 업로드
                            .then((result) => {
                                boardId = result.data._id
                                this.$http.post( config.serverUrl()+'board/files/' + boardId, this.formData, {headers: {'Content-Type': 'multipart/form-data'}})
                                    .then(() => {
                                        vm.$socket.emit('group', {
                                            command: 'create',
                                            id:boardId
                                        })
                                        window.location.href = config.serverFE() + "party/detail/" + boardId
                                    })
                                this.$http.post( config.serverUrl()+'board/join', {
                                    group: boardId,
                                    user: this.currentUser
                                });
                            })

                    } else if (this.isEdit == true) { // 수정
                        this.$http.post(config.serverUrl() + 'board/edit/' + this.currentGroupId, {
                            title: party.title,
                            due_date: party.recruitment_period_dateTwo,
                            start_date: party.recruitment_period_dateOne,
                            meeting_date: party.date,
                            min_num: party.number_of_member[0],
                            max_num: party.number_of_member[1],
                            cost: party.cost,
                            category: party.selected_category_id.id,
                            subCategory: party.selected_subcategory_id,
                            conditions: {gender: party.conditions.gender, age: party.conditions.age},
                            detail: party.detail,
                            location: party.location
                        })
                            .then(() => {
                                this.$http.post( config.serverUrl()+'board/files/' + this.currentGroupId, this.formData, {headers: {'Content-Type': 'multipart/form-data'}})
                            })
                            .then(() => {
                                window.location.href =  config.serverFE()+"party/detail/" + this.currentGroupId;
                            });
                    }

                }
            },
            changeAgeCondition() {
                if (this.party_form.conditions.selectAge == 'none') {
                    this.party_form.conditions.age = [20, 30];
                } else {
                    this.party_form.conditions.age = [0, 100];
                }
            }
            ,
            async editor() {
                var vm = this
                var result = await vm.$http.get( config.serverUrl() + 'board/details/' + vm.currentGroupId)
                vm.detailEdit = result.data;
                var age = [];
                var selectAge = 'selectAge';
                var gender = vm.detailEdit.conditions.gender;

                vm.party_form.title = vm.detailEdit.title;
                vm.party_form.number_of_member = [vm.detailEdit.min_num, vm.detailEdit.max_num];
                vm.party_form.detail = vm.detailEdit.detail;
                vm.party_form.recruitment_period_dateOne = vm.detailEdit.start_date;
                vm.party_form.recruitment_period_dateTwo = vm.detailEdit.due_date;
                vm.party_form.date = vm.detailEdit.meeting_date;
                vm.party_form.location = vm.detailEdit.location;
                vm.party_form.cost = vm.detailEdit.cost;
                vm.party_form.conditions.gender = gender;

                // 조건-나이 세팅
                if (vm.detailEdit.conditions.age[0] == 0 && vm.detailEdit.conditions.age[1] == 100) {
                    selectAge = 'none';
                    age = [0, 100];
                } else {
                    age = [vm.detailEdit.conditions.age[0], vm.detailEdit.conditions.age[1]];
                }
                vm.party_form.conditions.selectAge = selectAge;
                vm.party_form.conditions.age = age;
                for (var i = 0; i < vm.detailEdit.images.length; i++) {
                    vm.party_form.file_array.push({blob: vm.detailEdit.images[i]});
                }
            },
            getCategoryList() {
                var vm = this
                this.$http.get(config.serverUrl() +'category')
                    .then((result) => {
                        // get category list
                        for (var i = 0; i < result.data.length; i++) {
                            var categoryOption = '{"value" : { "index": "' + i + '", "id": "' + result.data[i]._id + '"}, "text" : "' + result.data[i].name + '"}';
                            vm.categoryList1.push(JSON.parse(categoryOption));
                        }

                        // get sub category list
                        for (var i = 0; i < result.data.length; i++) {
                            var categoryOption = [{value: null, text: '--- 소분류 ---', disabled: true}];
                            for (var j = 0; j < result.data[i].sub_category.length; j++) {
                                var option = '{"value" : "' + result.data[i].sub_category[j]._id + '", "text" : "' + result.data[i].sub_category[j].name + '"}';
                                categoryOption.push(JSON.parse(option));
                            }
                            vm.subCategoryList.push(categoryOption);
                        }
                    });
            }
            ,
            showSubCategory(select) {
                this.party_form.selected_subcategory_id = null;
                // this.party_form.selected_category_id = select.id;
                this.categoryList2 = this.subCategoryList[select.index];
            }
            ,
            showSearchMap() {
                this.$modal.show(SearchMap, {}, {
                    name: 'searchMap',
                    width: '950px',
                    height: 'auto',
                    draggable: false,
                    clickToClose: false
                },);
            }
            ,
            getResult(result) {
                this.party_form.location = result;
            }
        }
    }

</script>

<style scoped>
    body {
        background-color: #e2e2e2;
    }
    .calendarPosition{
        position: unset !important;
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

