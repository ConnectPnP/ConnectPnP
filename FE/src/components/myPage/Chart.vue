<template>
    <div id="container" style="width: 100%; height:400px;"></div>
</template>

<script>
    export default{
        name: 'Chart',
        props: {
            eventMonth: Array
        },
        data(){
            return {
                joinHistory: [0,0,0]
            }
        },
        watch:{
            eventMonth : function(newVal, oldVal){
                this.please();
            }
        },
        methods:{
           please(){
                var date = new Date();
                var monthNow = date.getMonth()+1;
                
                for(var i = 0;i<this.eventMonth.length;i++){
                    switch(this.eventMonth[i]){
                    case (monthNow):
                        this.joinHistory[0]++;
                        break;
                    case (monthNow - 1):
                        this.joinHistory[1]++;
                        break;
                    case (monthNow - 2):
                        this.joinHistory[2]++;
                        break;
                    }
                }
                
                Highcharts.chart('container', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: '최근 활동 기록'
                    },
                    xAxis: {
                        categories: [monthNow+'월', (monthNow-1)+'월', (monthNow-2)+'월']
                    },
                    yAxis: {
                        title: {
                            text: '모임 참여 횟수'
                        }
                    },
                    series: [{
                        name: '모임',
                        data: this.joinHistory
                    }]
            });
           }
        },
    }

</script>