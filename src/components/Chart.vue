<template>
    <div id="container" style="width: 100%; height:400px;"></div>
</template>

<script>
    export default{
        name: 'Chart',
        props: {
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
                    name: '홍길동',
                    data: this.ratingResult
                }]
            });
        }
    }

</script>