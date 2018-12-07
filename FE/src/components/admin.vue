<template>
    <div id="admin">


<!--대분류 카테고리 -->
        <nav class="mainCategoryGroup">
            <h3>대분류 카테고리</h3>
            <br>

        <div  v-for="item in mainCategoryList" :key="item._id">
            <table class="categoryTable">
                <tr>
                    <th class="categoryImg"  rowspan="2">
                        <input v-on:click="categoryClicked(item.name,item._id)" type="image" :src="item.img_path"
                               height="140px" width="140px"/>
                    </th>
                    <th class="mainCategoryTitle">{{item.name}}</th>
                </tr>
                <tr>
                    <td class="tg-0lax">
                        <button class="btn btn-danger" v-on:click="categoryDelete(item._id)">삭제</button>
                    </td>
                </tr>
            </table>
        </div>


            <div class="createCategory">
                <div class="inputMain">
                    <label for="mainCategory"> 대분류 이름: </label>  &nbsp;
                    <input id="mainCategory" size="sm" type="text" placeholder="입력해주세요." v-model="addCategoryName"></input>
                </div>
                <b-form-file class="file_input " v-model="file" accept=".jpg, .png" :state="Boolean(file)"
                                placeholder="Choose a file..."
                                @change="onFileChange($event.target.files)"></b-form-file>
                <b-row>
                    <div class="preview" >
                        <b-img v-if="file" :src="file.blob"/>
                    </div>
                </b-row>

                <button class="plusbtn btn btn-primary" v-on:click="addCategory" >+</button>
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


            <b-container class="subCategoryGroup" >
                <div v-for="item in mainCategoryList" :key="item.id">
                    <b-row v-if="selectedCategoryID==item._id">
                        <div  v-for="sub in item.sub_category">
                            <b-col class="subCategorySingle">
                                <h3>{{sub.name}}</h3>
                                <button class="btn btn-danger" v-on:click="subCategoryDelete(sub._id)">삭제</button>
                            </b-col>
                        </div >
                    </b-row>
                </div>
            </b-container>


            <div class="createCategory" v-if="selectedCategoryID!= -1">
                <div class="inputMain">
                    <label for="subCategory"> 소분류 이름: </label>  &nbsp;
                    <input id="subCategory" size="sm" type="text" placeholder="입력해주세요." v-model="addSubCategoryName"></input>
                </div>
                <button class="subplusbtn btn btn-primary" v-on:click="addSubCategory" >+</button>
            </div>

        </article>


    </div>
</template>

<script>
    var tempimg = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyMS4xNDUgMzIxLjE0NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIxLjE0NSAzMjEuMTQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzIwLjk3MywyMDAuOTgxYy0wLjgtMTguNC00LTM4LjgtOC44LTU4Yy00LjgtMTguNC0xMC44LTM1LjYtMTgtNDguOGMtMjgtNDkuMi01OC40LTQxLjYtOTQuOC0zMiAgICBjLTExLjYsMi44LTI0LDYtMzYuOCw3LjJoLTRjLTEyLjgtMS4yLTI1LjItNC40LTM2LjgtNy4yYy0zNi40LTkuMi02Ni44LTE3LjItOTQuOCwzMi40Yy03LjIsMTMuMi0xMy42LDMwLjQtMTgsNDguOCAgICBjLTQuOCwxOS4yLTgsMzkuNi04LjgsNThjLTAuOCwyMC40LDEuMiwzNS4yLDUuNiw0NS42YzQuNCw5LjYsMTAuOCwxNS42LDE5LjIsMThjNy42LDIsMTYuNCwxLjIsMjUuNi0yLjggICAgYzE1LjYtNi40LDMzLjYtMjAsNTEuMi0zNi40YzEyLjQtMTIsMzUuNi0xOCw1OC44LTE4czQ2LjQsNiw1OC44LDE4YzE3LjYsMTYuNCwzNS42LDMwLDUxLjIsMzYuNGM5LjIsMy42LDE4LDQuOCwyNS42LDIuOCAgICBjOC0yLjQsMTQuOC04LDE5LjItMTguNEMzMTkuNzczLDIzNi41ODEsMzIxLjc3MywyMjEuNzgxLDMyMC45NzMsMjAwLjk4MXogTTMwMS43NzMsMjQwLjk4MWMtMi40LDUuNi01LjYsOC44LTkuNiwxMCAgICBjLTQuNCwxLjItMTAsMC40LTE2LjQtMmMtMTQtNS42LTMwLjQtMTgtNDYuNC0zMy4yYy0xNS4yLTE1LjItNDItMjIuOC02OC44LTIyLjhzLTUzLjYsNy42LTY5LjIsMjJjLTE2LjQsMTUuMi0zMi44LDI4LTQ2LjQsMzMuMiAgICBjLTYuNCwyLjQtMTIsMy42LTE2LjQsMmMtNC0xLjItNy4yLTQuNC05LjYtMTBjLTMuMi03LjYtNC44LTIwLTQtMzguNGMwLjgtMTcuMiwzLjYtMzYuOCw4LjQtNTUuMmM0LjQtMTcuMiwxMC0zMy4yLDE2LjgtNDUuMiAgICBjMjItMzkuNiw0Ny42LTMzLjIsNzgtMjUuMmMxMi40LDMuMiwyNS4yLDYuNCwzOS4yLDcuNmMwLjQsMCwwLjQsMCwwLjgsMGg0LjRjMC40LDAsMC40LDAsMC44LDBjMTQuNC0xLjIsMjcuMi00LjQsMzkuNi03LjYgICAgYzMwLjQtNy42LDU2LTE0LjQsNzgsMjUuMmM2LjgsMTIsMTIuNCwyNy42LDE2LjgsNDUuMmM0LjQsMTguNCw3LjYsMzcuNiw4LjQsNTUuMiAgICBDMzA2Ljk3MywyMjAuMTgxLDMwNS4zNzMsMjMyLjU4MSwzMDEuNzczLDI0MC45ODF6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTIzLjc3MywxMjIuOTgxYy00LTMuNi04LjgtNi40LTE0LjQtNi44Yy0wLjQtNS4yLTIuOC0xMC40LTYuNC0xNGwtMC40LTAuNGMtNC40LTQuNC0xMC02LjgtMTYuNC02LjggICAgYy02LjQsMC0xMi40LDIuOC0xNi40LDYuOGMtMy42LDMuNi02LjQsOC44LTYuOCwxNC40Yy01LjYsMC40LTEwLjQsMi44LTE0LjQsNi40bC0wLjQsMC40Yy00LjQsNC40LTYuOCwxMC02LjgsMTYuNCAgICBjMCw2LjQsMi44LDEyLjQsNi44LDE2LjRjNCw0LDguOCw2LjQsMTQuOCw2LjhjMC40LDUuNiwyLjgsMTAuOCw2LjgsMTQuNGM0LjQsNC40LDEwLDYuOCwxNi40LDYuOGM2LjQsMCwxMi40LTIuOCwxNi40LTYuOCAgICBjMy42LTQsNi40LTguOCw2LjgtMTQuNGM1LjYtMC40LDEwLjgtMi44LDE0LjQtNi44YzQuNC00LjQsNi44LTEwLDYuOC0xNi40QzEzMC41NzMsMTMyLjk4MSwxMjcuNzczLDEyNi45ODEsMTIzLjc3MywxMjIuOTgxeiAgICAgTTExMy43NzMsMTQ1LjM4MWMtMS42LDEuNi0zLjYsMi40LTYsMi40aC01LjZjLTQsMC03LjYsMy4yLTcuNiw3LjZ2NS4yYzAsMi40LTAuOCw0LjQtMi40LDZjLTEuNiwxLjYtMy42LDIuNC02LDIuNCAgICBjLTIuNCwwLTQuNC0wLjgtNi0yLjRjLTEuNi0xLjYtMi40LTMuNi0yLjQtNnYtNS42YzAtNC0zLjItNy42LTcuNi03LjZoLTUuNmMtMi40LDAtNC40LTAuOC02LTIuNGMtMS4yLTEuMi0yLjQtMy4yLTIuNC01LjYgICAgYzAtMi40LDAuOC00LjQsMi40LTZjMCwwLDAsMCwwLjQtMC40YzEuNi0xLjIsMy42LTIsNS42LTJoNS42YzQsMCw3LjYtMy4yLDcuNi03LjZ2LTUuNmMwLTIuNCwwLjgtNC40LDIuNC02ICAgIGMxLjYtMS42LDMuNi0yLjQsNi0yLjRjMi40LDAsNC40LDAuOCw2LDIuNGMwLDAsMCwwLDAuNCwwLjRjMS4yLDEuNiwyLDMuNiwyLDUuNnY1LjZjMCw0LDMuMiw3LjYsNy42LDcuNmg1LjYgICAgYzIuNCwwLDQuNCwwLjgsNiwyLjRjMS42LDEuNiwyLjQsMy42LDIuNCw2QzExNi4xNzMsMTQxLjc4MSwxMTUuMzczLDE0My43ODEsMTEzLjc3MywxNDUuMzgxeiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPGNpcmNsZSBjeD0iMjMwLjE3MyIgY3k9IjExMC45ODEiIHI9IjE0IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8Y2lyY2xlIGN4PSIyMzAuMTczIiBjeT0iMTY3Ljc4MSIgcj0iMTQiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxjaXJjbGUgY3g9IjIwMS43NzMiIGN5PSIxMzkuMzgxIiByPSIxNCIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPGNpcmNsZSBjeD0iMjU4LjU3MyIgY3k9IjEzOS4zODEiIHI9IjE0IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="

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

                mainCategoryList: [
                    {
                        _id: Number,
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
                this.file = {blob: URL.createObjectURL(newFile[0])};
                this.formData.append('categoryFile', newFile[0], newFile[0].name);
            },
            async getCategory(){
                var categoryList  = await this.$http.get('http://localhost:3000/category');
                console.log(categoryList.data);
                this.mainCategoryList=categoryList.data;
            },

            addCategory(){
                var adminVue= this;
                //https://picsum.photos/250/250/?image=54
                var categoryData ={
                    name:this.addCategoryName,
                    img_path: this.addCategoryPath
                };
                var addedData = this.$http.post('http://localhost:3000/category', categoryData);
                addedData.then(function (result) {
                    adminVue.mainCategoryList.push(result.data);
                    adminVue.$http.post('http://localhost:3000/category/files/'+result.data._id, adminVue.formData,{ headers: { 'Content-Type': 'multipart/form-data' } })
                })
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
                });
            },

            categoryDelete(id){

                var deleteURL='http://localhost:3000/category/delete/'+id;
                var deletedData= this.$http.delete(deleteURL);

                for(let i=0;i<this.mainCategoryList.length;i++){
                    if(this.mainCategoryList[i]._id==id){
                        console.log(this.mainCategoryList[i].name)
                        this.mainCategoryList.splice(i,1);
                    }
                }
            },
            subCategoryDelete(id){
                var subdeleteURL='http://localhost:3000/category/'+this.selectedCategoryID+'/sub/delete/'+id;
                this.$http.delete(subdeleteURL);
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
        padding-right:15px;
        border-right: 5px solid #d2e8ff;
        float:left;
    }

    .mainCategoryTitle{
        font-size: 30px;
    }

    .categoryTable{
        margin-left: 20px;
        margin-bottom: 15px;

        border: 5px solid #007bff;
    }

    .categoryImg{
        width: 160px;
        background-color: #007bff;
        margin: 20px 20px;
        text-align: center;
        color:white;
    }

    .createCategory{
        background-color: white;
        width: 410px;
        border-radius:10px;
        border: 5px solid #007bff;
        padding-top: 5px;
        margin-top: 30px;
        margin-left: 20px;
        margin-bottom: 100px;
    }

    .inputMain{
        margin-top: 15px;
    }

    .plusbtn{
        margin-top: 20px;
        width: 400px;
    }

    .subplusbtn{
        margin-top: 20px;
        width: 405px;
    }

    .subCategory{
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