<script setup>
import * as echarts from "echarts";
import {onMounted, ref, watch} from "vue";

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    title: {
        type: String,
        default: ""
    }
});

const chart = ref(null);
let chartInstance = null;

const initChart = () => {
    if (!chart.value) return;

    // 初始化图表
    chartInstance = echarts.init(chart.value);

    // 设置图表选项
    chartInstance.setOption({
        backgroundColor: 'transparent',
        grid:{
            top:'14%',
            left:'10%',
            right:'2%',
            bottom:'10%',
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                lineStyle: {
                    color: '#57617B'
                }
            },
        },
        xAxis: {
            type: "category",
            data: props.data.timestamps, // X轴标签
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(255,255,255,.6)'
                }
            },
        },
        yAxis: {
            type: "value",
            axisLabel: {
                show: true,
                color: 'rgba(255,255,255,.6)'
            },
            axisLine: {
                show: false,

            },
            splitLine: {
                lineStyle: {
                    type:'dotted',
                    color: 'rgba(255,255,255,.1)'
                }
            }
        },
        series: [
            {
                name: "运价指数",
                type: "line",
                smooth: false,
                data: props.data.values, // 数据数组
                showSymbol: false,
                lineStyle: {
                    color: "rgba(58, 145, 255, 0.7)", // 更柔和的线条颜色
                    width: 2,
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(98, 201, 141, 0.5)'
                    }, {
                        offset: 1,
                        color: 'rgba(98, 201, 141, 0.1)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                },
                itemStyle: {
                    color: '#4cb9cf',
                    borderColor: 'rgba(98, 201, 141,0.27)',
                    borderWidth: 12
                },
            },
        ],
    });
};

onMounted(initChart);

watch(
    () => props.data,
    (newData) => {
        if (chartInstance) {
            chartInstance.setOption({
                xAxis: {
                    data: newData.timestamps,
                },
                series: [
                    {
                        data: newData.values,
                    },
                ],
            });
        }
    },
    {deep: true}
);
</script>

<template>
  <div class="chart-index">
      <div class="title">{{ title }}</div>
      <div class="chart" ref="chart"></div>
  </div>
</template>

<style scoped lang="less">
.chart-index{
    width: 100%;
    height: 100%;
    background: url("../assets/kuang4.png") no-repeat;
    background-size: 100% 100%;
    position: relative;

    .title {
        position: absolute;
        top: 0;
        left: 12px;
        text-align: left;
        color: #2b8fff;
        font-size: 18px;
        z-index: 1;
    }

    .chart {
        width: 100%;
        height: 100%;
        z-index: 10;
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>