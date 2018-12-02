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
                                 @change="onFileChange"></b-form-file>
                    <b-row>
                        <div class="preview" v-for="(file,index) in party_form.file_array" v-bind:key="index">
                            <b-img v-bind:id="`js-file_preview${index}`" v-if="file" :src="file.path"/>
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
                    This is for the map
                    <!--API이용한 map 필요-->
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
                    <b-form-select v-model="party_form.selected_category_id" :options="categoryList" class="mb-3"></b-form-select>
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
    import format from 'date-fns/format'
    import vueSlider from 'vue-slider-component';

    export default {
        name: "createParty",
        components: {
            vueSlider,
        },
        data() {
            return {
                dateFormat: 'YYYY-MM-DD',
                file: null,
                checkList: [
                    'Title','Detail', 'Start Date', 'End Date', 'Meeting Date', 'Cost', 'Image', 'Category'
                ],
                party_form:
                    {
                        title:'',
                        number_of_member: [0, 10],
                        detail: '',
                        recruitment_period_dateOne: '',
                        recruitment_period_dateTwo: '',
                        todayDate: '',
                        date: '',
                        cost: '',
                        conditions: {
                            gender: 'none',
                            selectAge: 'none',
                            age: [0,100],
                        },
                        file_array: [],
                        selected_category_id:null
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
                categoryList: [
                    {
                        value: null,
                        text: "select Category"
                    },
                    {
                        value: 1, //category_id 넣으면될듯
                        text: "sports"
                    },
                    {
                        value: 2,
                        text: "game"
                    },
                    {
                        value: 3,
                        text: "travel"
                    }
                ]
            }
        },
        mounted(){
            this.todayDate = new Date();
            this.todayDate = this.formatDates(this.todayDate);
            // console.log("today: "+today);
        },
        methods: {
            onFileChange(e) {
                const file = e.target.files[0];
                this.party_form.file_array.push({path: URL.createObjectURL(file), name: file.name});
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
            onSubmit(evt) { // 서버로 데이터 넘겨주기
                evt.preventDefault();

                var party = this.party_form;
                var checkList = this.checkList;
                var alertString = '';
                var validationCheck = [
                    party.title,
                    party.detail,
                    party.recruitment_period_dateOne,
                    party.recruitment_period_dateTwo,
                    party.date,
                    party.cost,
                    party.file_array,
                    party.selected_category_id
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
                   alert(JSON.stringify(party));

                    this.$http.post('http://localhost:3000/board/',{
                        title: party.title,
                        detail: party.detail,
                        //images_array: party.file_array,
                        start_date: party.recruitment_period_dateOne,
                        due_date: party.recruitment_period_dateTwo,
                        meeting_date: party.date,
                        //location: ,
                        cost: partym.cost,
                        conditions: {
                            gender: party.conditions.gender,
                            age: party.conditions.age
                         },
                        category_id: party.selected_category_id,
                        min_num: party.number_of_member[0],
                        max_num: party.number_of_member[1]
                    }).then((result)=>{
                        console.log(result); // result : 그룹 ID
                        // 디테일 파티 페이지로 가기
                    }); 
                }
                
            },
            changeAgeCondition(){
                if(this.party_form.conditions.selectAge == 'none'){
                    this.party_form.conditions.age = [20,30];
                } else {
                    this.party_form.conditions.age = [0,100];
                }
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
