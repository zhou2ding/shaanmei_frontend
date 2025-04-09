<template>
    <div class="radarChart">
        <div class="title">{{title}}</div>
        <div ref="chart" class="chart"></div>
    </div>
</template>

<script setup>
import * as echarts from "echarts";
import {onMounted, ref} from "vue";
defineProps({
    title: {
        type:String,
        default:''
    }
})

const chart = ref(null);
let chartInstance = null;

function setOption() {
    let option;
    var data = [
        {title: "**省"},
        ["本周"],
        [{
            name: "承运商1",
            max: 150
        }, {
            name: "承运商2",
            max: 150
        }, {
            name: "承运商3",
            max: 150
        }, {
            name: "承运商4",
            max: 150
        }, {
            name: "承运商5",
            max: 150
        }],
        [43, 100, 28, 3, 150]
    ];
    option = {

        color: ["#9DD060", "#35C96E", "#4DCEF8"],
        tooltip: {},

        radar: {
            center: ["50%", "60%"],
            radius: ["25%", "75%"],

            axisName: {
                textStyle: {
                    color: "#72ACD1"
                }
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.0",
                    width: 2
                }

            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,0.2)",
                    width: 1,
                    type: "dotted"
                }
            },
            splitArea: {
                areaStyle: {
                    color: ["rgba(255,255,255,.1)", "rgba(255,255,255,0)"]
                }
            },
            indicator: data[2]
        },
        series: [{
            name: "",
            type: "radar",
            data: [{
                areaStyle: {
                    opacity: 0.3
                },
                value: data[3],
                name: data[1][0]
            },
                {
                    areaStyle: {
                        opacity: 0.3
                    },
                    value: data[4],
                    name: data[1][1]
                },
                {
                    areaStyle: {
                        opacity: 0.3
                    },
                    value: data[5],
                    name: data[1][2]
                }
            ]
        }]
    };
    chartInstance.setOption(option);
}

onMounted(() => {
    chartInstance = echarts.init(chart.value);
    setOption();
});
</script>

<style scoped lang="less">
.radarChart {
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