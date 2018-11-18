<template>
    <div id="container" style="width: 100%; height:400px;"></div>
</template>

<script>
    export default{
        name: 'Chart',
        props: {
            name: String,
            ratingResult: []
        },
        mounted(){
            Highcharts.chart('container', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: '나의 평가 지수'
                },
                xAxis: {
                    categories: ['매너', '잘생김', '시간약속']
                },
                yAxis: {
                    title: {
                        text: '수치 (10점 만점)'
                    }
                },
                series: [{
                    name: this.name,
                    data: this.ratingResult
                }]
            });
        }
    }

</script>