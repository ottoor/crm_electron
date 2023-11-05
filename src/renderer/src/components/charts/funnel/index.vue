
<template>
    <div class="echarts-box">
      <div id="myEcharts" :style="{ width: this.width, height: this.height }"></div>
    </div>
  </template>
  
<script>
import * as echarts from "echarts";
import {onMounted, onUnmounted} from "vue";
  
export default {
    name: "App",
    props: ["width", "height"],
    setup() {
      let myEcharts = echarts;
  
      onMounted(() => {
        initChart();
      });
  
      onUnmounted(() => {
        myEcharts.dispose;
      });
  
      function initChart() {
        let chart = myEcharts.init(document.getElementById("myEcharts"), "purple-passion");
        chart.setOption({
            legend: {
                data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
            },
            series: [
                {
                name: 'Funnel',
                type: 'funnel',
                left: '10%',
                top: 60,
                bottom: 60,
                width: '80%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    show: true,
                    position: 'inside'
                },
                labelLine: {
                    length: 10,
                    lineStyle: {
                    width: 1,
                    type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                    fontSize: 20
                    }
                },
                data: [
                    { value: 60, name: 'Visit' },
                    { value: 40, name: 'Inquiry' },
                    { value: 20, name: 'Order' },
                    { value: 80, name: 'Click' },
                    { value: 100, name: 'Show' }
                ]
                }
            ]
         });
        window.onresize = function () {
          chart.resize();
        };
      }
      return {
        initChart
      };
    }
};
</script>