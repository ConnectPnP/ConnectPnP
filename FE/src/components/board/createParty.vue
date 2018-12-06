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
                    <b-form-input class="input" id="js-party-cost" v-model="party_form.cost" ></b-form-input>
                </b-form-group>
                <b-form-group horizontal
                              label="Condition :"
                              label-class="text-sm-right"
                              label-for="js-party-condition">
                    세부 조건 추가 후, radio와 같은 것으로 고르게 하기 ex ) 성별 / 나이
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
                formData : new FormData(),
                dateFormat: 'YYYY-MM-DD',
                file: null,
                party_form:
                    {
                        title:'',
                        number_of_member: [0, 10],
                        detail: '',
                        recruitment_period_dateOne: '',
                        recruitment_period_dateTwo: '',
                        date: '',
                        file_array: [],
                        selected_category_id:null,
                        cost: ''
                    },
                categoryList: [
                ]
            }
        },
        methods: {
            onFileChange(fileList) {
                // const file = e.target.files[0];
                // this.party_form.file_array.push({blob: URL.createObjectURL(fileList[x]), name: file.name, file : file});
                // First: append file to FormData
                Array.from(Array(fileList.length).keys()).map(x => {
                    this.party_form.file_array.push({blob: URL.createObjectURL(fileList[x])});
                    this.formData.append('file', fileList[x], fileList[x].name);
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
            getCategoryList() {
                var vm = this
                this.$http.get('http://localhost:3000/category/sub')
                .then((result) => {
                    for(var i=0; i<result.data.length; i++) {
                        for(var j=0; j<result.data[i].sub_category.length ; j++){
                            var categoryOption = '{"value" : "' + result.data[i].sub_category[j]._id + '", "text" : "'+ result.data[i].sub_category[j].value+'"}'
                            vm.categoryList.push(JSON.parse(categoryOption))
                        }
                    }
                })
            }
            ,
            onSubmit(evt) {
                evt.preventDefault();
                var boardId;
            //     this.$http.defaults.headers.post['Content-Type'] = 'multipart/form-data'
            //     this.$http.post('http://localhost:3000/board', {
            //         title : this.party_form.title,
            //         due_date : this.party_form.recruitment_period_dateTwo,
            //         start_date : this.party_form.recruitment_period_dateOne,
            //         meeting_date : this.party_form.date,
            //         min_num : this.party_form.number_of_member[0],
            //         max_num : this.party_form.number_of_member[1],
            //         cost : this.party_form.cost,
            //         category_id : this.party_form.selected_category_id,
            //         // condition :,
            //         detail:this.party_form.detail,
            //         // location :,
            //         // host :,
            // })
            // 이미지 업로드
            // .then((result) => {
                // boardId = result.data._id
                boardId = 34
                // var formdata = new FormData()
                // for( var i = 0; i < this.party_form.file_array.length; i++ ){
                //     let file = this.party_form.file_array[i].file
                //     let name = this.party_form.file_array[i].name
                //     formdata.append('file', file, name)
                // }
                console.log(this.formData);
                this.$http.post('http://localhost:3000/board/files/'+ boardId, this.formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            // })
            // .then(()=> {
            //     window.location.href = "http://localhost:8080/party/detail/" + boardId
            // })
            }
        },
        mounted() {
        this.getCategoryList()
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
