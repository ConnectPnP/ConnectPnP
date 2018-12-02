<template>
<div>
    <CreateParty  
        ref="form"
        
        :_title="title" 
        :_number_of_member="number_of_member"
        :_detail="detail"
        :_dateOne="dateOne"
        :_dateTwo="dateTwo"
        :_date="date"
        :_loactionText="locationText"
        :_loaction="location"
        :_cost="cost"
        :_conditions="conditions"
        :_file="file"
        :_categoryId="categoryId" />
</div>
</template>
<script>
import CreateParty from './createParty.vue'

export default {
    components:{
        CreateParty
    },
    data(){
        return {
            // parent: new Vue(),
            // title: '',
            // number_of_member: [],
            // detail: '',
            // dateOne: '',
            // dateTwo: '',
            // date: '',
            // locationText: '',
            // location: {},
            // cost: '',
            // conditions: {},
            // file: [],
            // categoryId: '',
            title: 'kk',
            number_of_member: [1,3],
            detail: 'kkkkkkkkk',
            dateOne: '2018-12-10',
            dateTwo: '2018-12-15',
            date: '2018-12-20',
            locationText: '안농',
            location: {lat:37.566826, lng:126.9786567},
            cost: '1000원',
            conditions: {
                gender: 'female',
                selectAge: 'selectAge',
                age: [30,45]
            },
            file: [],
            categoryId: 2
        }
    },
    created(){

    },
    mounted(){
        this.editor();
        var url = window.location.pathname;
        var boardId = url.split('/')[3]; // 이렇게 해도 되나..?

        this.$http.get('http://localhost:3000/board/details/'+boardId)
            .then((result)=>{
                var data = result.data;
                var age = [];
                var selectAge = 'selectAge';

                this.title = data.title;
                this.number_of_member = [data.min_num, data.max_num];
                this.detail = data.detail;
                this.dateOne = data.start_date;
                this.dateTwo = data.due_date;
                this.date = data.meeting_date;
                this.locationText = data.locationText;
                this.location = data.location;
                this.cost = data.cost;
                
                if(data.conditions.age[0]==0&&data.conditions.age[1]==100){
                    selectAge = 'none';
                    age = [0,100];
                } else {
                    age = [data.conditions.age[0], data.conditions.age[1]];
                }
                this.conditions = {
                    gender: data.contidions.gender,
                    selectAge: selectAge,
                    age: age
                };
                this.file = data.images;
                this.categoryId = data.category_id;
            })
            // .then(()=>{
            //     this.editor();
            // })
    },
    methods:{
        editor(){
            this.$refs.form.editor();
        }
    }
}
</script>
