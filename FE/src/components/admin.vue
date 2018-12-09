<template>
    <div id="admin">

        <!--대분류 카테고리 -->
        <nav class="mainCategoryGroup">
            <br>
            <h3>Main Category</h3>
            <br>

            <!--대분류카테고리 추가-->
            <div class="createCategory">
                <br>
                <h4>Add Category</h4>

                <div class="hrLine20">
                    <hr>
                </div>

                <div class="inputMain">
                    <label for="mainCategory"> 카테고리 이름: </label>  &nbsp;
                    <input id="mainCategory" size="sm" type="text" placeholder="입력해주세요." v-model="addCategoryName"></input>
                </div>

                <div class="hrLine20">
                    <hr>
                </div>

                <b-form-group>
                    <h6>이미지 업로드</h6>
                    <br>
                    <b-form-radio-group
                            v-model="condition.imgUpload"
                            :options="uploadMethod">
                    </b-form-radio-group>
                </b-form-group>


                <!--파일 업로드 형식-->
                <div class="imgUpload" v-if="condition.imgUpload=='methodFile'">
                    <b-form-file class="file_input " v-model="file" accept=".jpg, .png" :state="Boolean(file)"
                                 placeholder="Choose a file..."
                                 @change="onFileChange($event.target.files)"></b-form-file>
                    <b-row>
                        <div class="preview" >
                            <b-img v-if="file" :src="file.blob"/>
                        </div>
                    </b-row>
                </div>


                <!--URL 업로드 형식-->
                <div class="imgUpload" v-if="condition.imgUpload=='methodURL'">
                    <input id="imgURL" size="sm" type="text" placeholder="입력해주세요." v-model="addCategoryPath"/>
                </div>


                <!--추가 버튼-->
                <button class="plusbtn btn btn-primary" v-on:click="addCategory" >추가하기</button>
            </div>



            <!--대분류카테고리 리스트-->

            <div  v-for="item in mainCategoryList.slice().reverse()" :key="item._id">
                <!--카테고리 이름-->
                <table class="categoryTable" v-on:click="categoryClicked(item.name,item._id)">
                    <tr>
                        <th class="categoryImg"  rowspan="2">
                            <input  type="image" :src="item.img_path"
                                    height="140px" width="140px"/>
                        </th>
                        <th class="mainCategoryTitle">
                            {{item.name}}
                        </th>
                    </tr>
                    <tr>
                        <td class="tg-0lax">
                            <div class="hrLine20">
                                <hr>
                            </div>
                            <button class="btn btn-primary" v-if="condition.reviseComplete=='revise'" v-on:click="revisebtnChange">수정</button>

                            <button class="btn btn-danger" v-if="condition.reviseComplete=='revise'" v-on:click="categoryDelete(item._id)">삭제</button>
                        </td>
                    </tr>

                    <tr v-if="condition.reviseComplete=='complete'&&item._id==selectedCategoryID">

                        <!--수정 기능 -->
                        <td colspan="2">
                            <label for="reviseCategory"> 이름: </label>  &nbsp;
                            <input  id="reviseCategory" class="mainCategoryTitle" name="mainCategoryTitleInput"  type="text" v-model="item.name">
                            <br>
                            <b-form-radio-group
                                    v-model="condition.reviseimgUpload"
                                    :options="uploadMethod">
                            </b-form-radio-group>

                            <!--파일 업로드 형식-->
                            <div class="imgUpload" v-if="condition.reviseimgUpload=='methodFile'">
                                <b-form-file class="file_input " v-model="file" accept=".jpg, .png" :state="Boolean(file)"
                                             placeholder="Choose a file..."
                                             @change="onFileChange($event.target.files)"></b-form-file>
                                <b-row>
                                    <div class="preview" >
                                        <b-img v-if="file" :src="file.blob"/>
                                    </div>
                                </b-row>
                            </div>

                            <div class="imgUpload" v-if="condition.reviseimgUpload=='methodURL'">
                                <input id="reviseimgURL" size="sm" type="text" placeholder="입력해주세요." v-model="reviseCategoryPath"/>
                            </div>


                            <button class="btn btn-primary" v-if="condition.reviseComplete=='complete'" v-on:click="categoryUpdate(item)">완료</button>
                            <button class="btn btn-danger"  v-on:click="maincancelbtn">취소</button>

                        </td>
                    </tr>
                </table>
            </div>

        </nav>



        <!--대분류에 속해있는 소분류 카테고리 -->
        <article class="subCategory">
            <br>

            <div class="subCategoryTitle" v-if="selectedCategoryID==-1">
                <h2> 메인카테고리를 선택해주세요</h2>
            </div>


            <div class="subCategoryTitle" v-if="selectedCategoryID!=-1">
                <h2>{{selectedCategoryName}}의 세부 카테고리</h2>
            </div>

            <!--소분류 카테고리 추가-->
            <div class="createsubCategoryArea">
                <div class="createsubCategory" v-if="selectedCategoryID!= -1">
                    <br>
                    <h4>Add SubCategory</h4>

                    <div class="hrLine20">
                        <hr>
                    </div>
                    <div class="inputMain">

                        <label for="subCategory"> 소분류 이름: </label>  &nbsp;
                        <input id="subCategory" size="sm" type="text" placeholder="입력해주세요." v-model="addSubCategoryName"/>
                    </div>


                    <!--추가 버튼 -->
                    <button class="subplusbtn btn btn-primary" v-on:click="addSubCategory" >추가하기</button>
                </div>
            </div>
            <b-container class="subCategoryGroup" >


                <!--소분류 카테고리 리스트-->
                <div v-for="item in mainCategoryList" :key="item.id">
                    <b-row v-if="selectedCategoryID==item._id">
                        <div  v-for="sub in item.sub_category.slice().reverse()">
                            <b-col class="subCategorySingle">
                                    <h4>{{sub.name}}</h4>
                                <div class="hrLine20">
                                    <hr>
                                </div>
                                <button class="btn btn-primary" v-if="condition.subreviseComplete=='revise'" v-on:click="subrevisebtnChange(sub._id)">수정</button>
                                <button class="btn btn-danger" v-if="condition.subreviseComplete=='revise'" v-on:click="subCategoryDelete(sub._id)">삭제</button>

                                <div class="revisesubCategory" v-if="condition.subreviseComplete=='complete'&& sub._id==condition.selectedsubCategory">
                                    <input class="subCategoryListTitle" name="subCategoryTitleInput"  type="text" v-model="sub.name"> <br>
                                    <button class="btn btn-primary"  v-on:click="subcategoryUpdate(sub)">완료</button>

                                </div>
                            </b-col>
                        </div >
                        <div>
                        </div>
                    </b-row>
                </div>
            </b-container>




        </article>


    </div>
</template>

<script>
    export default {
        name: "admin",
        components:{

        },
        props: {
            selectedCategoryID:{
                type: Number,
                default : -1
            },
            selectedCategoryName:{
                type:String,
                default:""
            }
        },
        data() {
            return {
                file : null,
                formData : new FormData(),
                addCategoryName:"",
                addCategoryPath:"",
                reviseCategoryPath:"",
                addSubCategoryName:"",
                imageName:"",
                condition:{
                    selectedsubCategory:"",
                    imgUpload: "methodFile",
                    reviseComplete:'revise',
                    reviseimgUpload:"methodFile",
                    subreviseComplete:'revise'
                },
                uploadMethod: [
                    {text: '컴퓨터에서 찾기', value: 'methodFile'},
                    {text: 'URL', value: 'methodURL'}
                ],
                mainCategoryList: [
                    {
                        _id: Number,
                        depth:Number,
                        name: String,
                        img_path: String,
                        sub_category: [
                            {
                                _id:String,
                                name: String
                            }
                        ]

                    }
                ]


            }
        },
        mounted: function () {

            //카테고리 불러오기
            this.getCategory()

        },
        methods:{
            // 상황에 따른 버튼 표시를 위한 함수.
            revisebtnChange(){
                this.condition.reviseComplete='complete'
            },
            subrevisebtnChange(id){
                this.condition.selectedsubCategory= id;
                this.condition.subreviseComplete='complete'
            },
            maincancelbtn(){
                this.condition.reviseComplete='revise'

            },
            subcancelbtn(){
                this.condition.subreviseComplete='revise'
            },



            //대분류 카테고리 클릭시
            categoryClicked(categoryName, categoryid){
                this.selectedCategoryName= categoryName;
                this.selectedCategoryID=categoryid;
                console.log(categoryid);
            },
            //이미지 업로드
            onFileChange(newFile) {
                console.log(newFile);
                this.file = {blob: URL.createObjectURL(newFile[0])};
                //this.imageName=newFile[0].name;
                this.formData.append('categoryFile', newFile[0], newFile[0].name);
            },

            //전체카테고리 리스트 가져오기
            async getCategory(){
                var categoryList  = await this.$http.get('http://localhost:3000/category');
                console.log(categoryList.data);
                this.mainCategoryList=categoryList.data;
            },

            //메인카테고리 추가
            async addCategory(){
                var adminVue= this;
                //https://picsum.photos/250/250/?image=54
                var categoryData ={
                    name:this.addCategoryName,
                    img_path: this.addCategoryPath
                };
                var categoryDataUpload = await this.$http.post('http://localhost:3000/category', categoryData)
                if(this.condition.imgUpload=='methodFile'){
                    var imgFileUpload = await adminVue.$http.post('http://localhost:3000/category/files/'+categoryDataUpload.data._id, adminVue.formData,{ headers: { 'Content-Type': 'multipart/form-data' } })
                    adminVue.mainCategoryList.push(imgFileUpload.data);
                } else {
                    console.log("methodURL!")
                    adminVue.mainCategoryList.push(categoryDataUpload.data);
                }
                this.addCategoryName="";
                this.addCategoryPath="";


                /*
               this.$http.post('http://localhost:3000/category', categoryData)
               .then((result) => {
                   console.log(adminVue.formData.keys())
                   return adminVue.$http.post('http://localhost:3000/category/files/'+result.data._id, adminVue.formData,{ headers: { 'Content-Type': 'multipart/form-data' } })
               })
               .then((result) => {
                   //result.data.img_path=tmpImgPath
                   adminVue.mainCategoryList.push(result.data);
               })
*/
            },

            //세부 카테고리 추가
            addSubCategory(){
                var adminVue= this;
                var subcategoryData ={
                    name:this.addSubCategoryName
                };
                var addsubURL='http://localhost:3000/category/'+this.selectedCategoryID+'/sub';
                var addedData= this.$http.post(addsubURL, subcategoryData);
                addedData.then(function (result) {
                    for(let i=0;i<adminVue.mainCategoryList.length;i++){
                        if(adminVue.mainCategoryList[i]._id==adminVue.selectedCategoryID){
                            console.log(result.data.sub_category);
                            adminVue.mainCategoryList[i].sub_category= result.data.sub_category
                        }
                    }
                    //adminVue.mainCategoryList.sub_category=result.data.sub_category;
                    console.log(result.data);

                });
                this.addSubCategoryName=""

            },

            //메인카테고리 수정
            async categoryUpdate(data){
                var adminVue= this;
                this.selectedCategoryName=data.name;
                var categoryData ={
                    name:data.name,
                    img_path: this.reviseCategoryPath
                };

                var updateURL='http://localhost:3000/category/edit/'+data._id;
                var updatedCategory = await this.$http.post(updateURL,categoryData);
                if(this.condition.reviseimgUpload=='methodFile'){
                    var imgFileUpload = await adminVue.$http.post('http://localhost:3000/category/files/'+data._id, adminVue.formData,{ headers: { 'Content-Type': 'multipart/form-data' } })
                    console.log(imgFileUpload.data);
                    for(let i=0;i<this.mainCategoryList.length;i++){
                        if(this.mainCategoryList[i]._id==data._id){
                            adminVue.mainCategoryList[i].img_path=imgFileUpload.data.img_path
                        }}

                } else {
                    console.log("Updated CategoryPath>>>"+this.reviseCategoryPath)
                    for(let i=0;i<this.mainCategoryList.length;i++){
                        if(this.mainCategoryList[i]._id==data._id){
                            this.mainCategoryList[i].img_path = this.reviseCategoryPath;
                        }}
                    //adminVue.mainCategoryList.push(categoryDataUpload.data);
                }

                this.reviseCategoryPath="";
                this.condition.reviseComplete='revise';
            },

            //세부카테고리 수정
            subcategoryUpdate(data){
                console.log(data._id)
                var updateURL='http://localhost:3000/category/edit/'+data._id;
                var updatedCategory = this.$http.post(updateURL,data);
                this.condition.subreviseComplete='revise';

            },

            //메인카테고리 삭제
            categoryDelete(id){
                for(let i=0;i<this.mainCategoryList.length;i++){
                    if(this.mainCategoryList[i]._id==id){
                        if(this.mainCategoryList[i].sub_category.length==0){
                            var deleteURL='http://localhost:3000/category/delete/'+id;
                            this.$http.delete(deleteURL);
                            this.mainCategoryList.splice(i,1);
                        } else{
                            alert("세부 카테고리가 존재합니다.")
                        }

                    }
                }

                /*
                                for(let i=0;i<this.mainCategoryList.length;i++){
                                    if(this.mainCategoryList[i]._id==id){

                                        this.mainCategoryList.splice(i,1);
                                    }
                                }*/
            },


            //세부카테고리 삭제
            subCategoryDelete(id){
                var subdeleteURL='http://localhost:3000/category/'+this.selectedCategoryID+'/sub/delete/'+id;
                var deleteResult = this.$http.post(subdeleteURL);

                for(let i=0;i<this.mainCategoryList.length;i++){
                    if(this.mainCategoryList[i]._id==this.selectedCategoryID){
                        for(let j=0;j<this.mainCategoryList[i].sub_category.length;j++){
                            if(this.mainCategoryList[i].sub_category[j]._id==id){
                                this.mainCategoryList[i].sub_category.splice(j,1);
                            }
                        }
                    }
                }
            }

        }
    }
</script>

<style scoped>
    .hrLine20{
        padding-left:10%;
        padding-right:10%;
    }
    .mainCategoryGroup{
        color: #706f76;
        padding: 10px;
        background-color: #d2e8ff;
        float:left;
    }

    .mainCategoryTitle{
        font-size: 20px;
        width: 200px;
        margin-bottom: 5%;
    }

    .categoryTable{

        width: 90%;
        margin-bottom: 15px;
        background-color: white;


    }

    .categoryImg{
        width: 160px;
        background-color: white;
        margin: 20px 20px;
        padding:15px;
        text-align: center;
        color:white;
    }

    .createCategory{
        color: #706f76;
        background-color: white;
        width: 100%;
        border-radius:5px;
        padding-top: 5px;
        margin-top: 10px;
        margin-bottom: 30px;
    }

    .inputMain{
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .plusbtn{
        margin-top: 10px;
        width: 100%
    }

    .subplusbtn{
        margin-top: 30px;
        width: 405px;
    }
    .revisesubCategory{
        margin-top: 10px;
    }
    .subCategory{
        padding: 10px;
        float:left;
        alignment: left;
    }
    .createsubCategoryArea{
        color: #706f76;
        padding-top: 20px;
        padding-bottom: 20px;

    }
    .createsubCategory{
        background-color: white;
        width: 410px;
        border-radius:5px;
        border: 3px solid #007bff;
        padding-top: 5px;
        margin-top: 10px;
        margin-bottom: 30px;
        margin-left: 20%;
    }
    .subCategoryGroup{
        margin-left: 15%;
        width: 700px;
        position: relative;
    }

    .subCategoryTitle{
        text-align: center;
        color: #706f76;
        margin-left: 20%;
        margin-bottom: 40px;
    }
    .subCategoryListTitle{
        width:80%;
        margin-top:5px;
        margin-bottom:5px;
    }
    .subCategorySingle{
        background-color: #d2e8ff;
        width: 300px;
        border-radius:10px;
        padding:8px;

        margin-left: 20px;
        margin-bottom: 50px;
    }


</style>