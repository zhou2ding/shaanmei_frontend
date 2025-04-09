<template>
    <div class="heat-map-chart">
        <div class="title">{{ title }}</div>
        <div ref="chart" class="chart"></div>
    </div>
</template>

<script setup>
import {ref, watch, onMounted} from 'vue';
import * as echarts from 'echarts';

const color = [
    '#FFFFD9', // 非常浅的黄色
    '#EDF8B1', // 柠檬黄色
    '#C7E9B4', // 浅黄绿色
    '#A1DAB4', // 淡绿色
    '#7BCCC4', // 海绿色
    '#41B6C4', // 青绿色
    '#1D91C0', // 中等蓝绿色
    '#225EA8', // 深蓝色
    '#253494', // 深靛蓝色
    '#081D58', // 深海军蓝
    '#F7FCF0', // 非常浅的绿白色
]

// 接收 prop 数据
const props = defineProps({
    data: {
        type: Array,
        default: () => [],
    },
    title: {
        type: String,
        default: ''
    }
});

// 引用图表容器
const chart = ref(null);
let myChart = null

// 监听数据变化
watch(
    () => props.data,
    (newData) => {
        renderChart(newData);
    },
    {deep: true}
);

// 组件挂载时渲染图表
onMounted(() => {
    const chartDom = chart.value;
    myChart = echarts.init(chartDom);
    renderChart(props.data);
});

// 渲染图表的方法
const renderChart = (data) => {

    const option = {
        // title: {
        //   text: '热力图', // 标题文本，可以根据需要修改
        // },
        tooltip: {
            position: 'top',
            trigger: 'item',
            formatter: (params) => {
                return `类别: ${params.name}<br/>数值: ${params.value[2]}`;
            },
        },
        xAxis: {
            type: 'category',
            data: data.length > 0 ? data[0].map(item => item.category) : [],
            axisLabel: {
                rotate: 80, // 旋转横坐标标签
            },
        },
        yAxis: {
            type: 'category',
            data: data.length > 0 ? data[0][0].subcategories : [],
        },
        grid: {
            top: '12%',
            left: '10%',
            bottom: '10%',
            right: '10%',
        },
        visualMap: {
            min: 0,
            max: 100, // 根据数据范围调整
            calculable: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            inRange: {
                color
            },
        },
        series: [
            {
                name: '热力图',
                type: 'heatmap',
                data: data.length > 0 ? data.flatMap((row, rowIndex) =>
                    row.map((item, colIndex) => [colIndex, rowIndex, item.value])
                ) : [],
                label: {
                    show: true, // 显示数值标签
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };

    myChart.setOption(option);
};
</script>

<style scoped lang="less">
.heat-map-chart {
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