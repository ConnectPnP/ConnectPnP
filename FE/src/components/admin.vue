<template>
    <div id="admin">

<!--대분류 카테고리 -->
        <nav class="mainCategoryGroup">
            <br>
            <h3>대분류 카테고리</h3>
            <br>

            <!--대분류카테고리 추가-->
            <div class="createCategory">
                <br>
                <h4>카테고리 추가하기</h4>
                <div class="inputMain">
                    <label for="mainCategory"> 대분류 이름: </label>  &nbsp;
                    <input id="mainCategory" size="sm" type="text" placeholder="입력해주세요." v-model="addCategoryName"></input>
                </div>

                <b-form-group>
                    이미지 업로드 방식:
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
                <button class="plusbtn btn btn-primary" v-on:click="addCategory" >+</button>
            </div>



        <!--대분류카테고리 리스트-->

            <div  v-for="item in mainCategoryList.slice().reverse()" :key="item._id">
                <table class="categoryTable">
                    <tr>
                        <th class="categoryImg"  rowspan="2">
                            <input v-on:click="categoryClicked(item.name,item._id)" type="image" :src="item.img_path"
                                   height="140px" width="140px"/>
                        </th>
                        <th class="mainCategoryTitle">
                            <input class="mainCategoryTitle" name="mainCategoryTitleInput"  type="text" v-model="item.name">
                        </th>
                    </tr>
                    <tr>
                        <td class="tg-0lax">
                            <button class="btn btn-primary" v-on:click="categoryUpdate(item)">수정</button>
                            <button class="btn btn-danger" v-on:click="categoryDelete(item._id)">삭제</button>
                        </td>
                    </tr>
                </table>
            </div>

        </nav>



<!--대분류에 속해있는 소분류 카테고리 -->
        <article class="subCategory">
            <br>

            <div class="subCategoryTitle" v-if="selectedCategoryID==-1">
                <h2> 대분류 카테고리를 선택해주세요</h2>
            </div>



            <div class="subCategoryTitle" v-if="selectedCategoryID!=-1">
                <h2>{{selectedCategoryName}}의 소분류 카테고리입니다.</h2>
            </div>

    <!--소분류 카테고리 추가-->
            <div class="createCategory" v-if="selectedCategoryID!= -1">
                <div class="inputMain">
                    <label for="subCategory"> 소분류 이름: </label>  &nbsp;
                    <input id="subCategory" size="sm" type="text" placeholder="입력해주세요." v-model="addSubCategoryName"></input>
                </div>


                <!--추가 버튼 -->
                <button class="subplusbtn btn btn-primary" v-on:click="addSubCategory" >+</button>
            </div>

            <b-container class="subCategoryGroup" >


    <!--소분류 카테고리 리스트-->
                <div v-for="item in mainCategoryList" :key="item.id">
                    <b-row v-if="selectedCategoryID==item._id">
                        <div  v-for="sub in item.sub_category.slice().reverse()">
                            <b-col class="subCategorySingle">
                                <input class="subCategoryListTitle" name="subCategoryTitleInput"  type="text" v-model="sub.name"> <br>
                                <button class="btn btn-primary" v-on:click="subcategoryUpdate(sub)">수정</button>
                                <button class="btn btn-danger" v-on:click="subCategoryDelete(sub._id)">삭제</button>
                            </b-col>
                        </div >
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
                addSubCategoryName:"",
                imageName:"",
                condition:{
                  imgUpload: "methodFile"
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
            this.getCategory(),
            console.log(this)

        },
        methods:{

            categoryClicked(categoryName, categoryid){
                this.selectedCategoryName= categoryName;
                this.selectedCategoryID=categoryid;
                console.log(categoryid);
            },
            onFileChange(newFile) {
                console.log(newFile);
                this.file = {blob: URL.createObjectURL(newFile[0])};
                //this.imageName=newFile[0].name;
                this.formData.append('categoryFile', newFile[0], newFile[0].name);
            },

            async getCategory(){
                var categoryList  = await this.$http.get('http://localhost:3000/category');
                this.mainCategoryList=categoryList.data;
            },

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
                            adminVue.mainCategoryList[i].sub_category= result.data.sub_category
                        }
                    }
                    //adminVue.mainCategoryList.sub_category=result.data.sub_category;
                   console.log(result.data);

                });
                this.addSubCategoryName=""

            },

            categoryUpdate(data){
                var updateURL='http://localhost:3000/category/edit/'+data._id;
                var updatedCategory = this.$http.post(updateURL,data);
            },

            subcategoryUpdate(data){
                console.log(data._id)
                var updateURL='http://localhost:3000/category/edit/'+data._id;
                var updatedCategory = this.$http.post(updateURL,data);
            },


            categoryDelete(id){
                var deleteURL='http://localhost:3000/category/delete/'+id;
                var deletedData= this.$http.delete(deleteURL);

                for(let i=0;i<this.mainCategoryList.length;i++){
                    if(this.mainCategoryList[i]._id==id){
                        this.mainCategoryList.splice(i,1);
                    }
                }
            },
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

    .mainCategoryGroup{
        padding: 10px;
        background-color: #d2e8ff;
        float:left;
    }

    .mainCategoryTitle{
        font-size: 20px;
        width: 200px;
    }

    .categoryTable{
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
        background-color: white;
        width: 410px;
        border-radius:5px;
        border: 3px solid #007bff;
        padding-top: 5px;
        margin-top: 10px;
        margin-bottom: 30px;
    }

    .inputMain{
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .plusbtn{
        margin-top: 30px;
        width: 407px;
    }

    .subplusbtn{
        margin-top: 30px;
        width: 405px;
    }

    .subCategory{
        padding: 10px;
        float:left;
        alignment: left;
    }

    .subCategoryGroup{
        width: 1000px;
        position: relative;
    }

    .subCategoryTitle{
        text-align: center;
        margin-top: 100px;
        margin-left: 30px;
        margin-bottom: 40px;
    }
    .subCategoryListTitle{
        width:200px;
        margin-top:5px;
        margin-bottom:5px;
    }
    .subCategorySingle{
        background-color: white;

        width: 300px;
        border-radius:10px;
        border: 5px solid #007bff;
        padding-top: 5px;
        margin-left: 20px;
        margin-bottom: 50px;
    }


</style>
