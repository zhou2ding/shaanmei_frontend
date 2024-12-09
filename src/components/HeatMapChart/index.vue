<template>
    <div class="heat-map-chart">
        <div class="title">{{title}}</div>
        <div ref="chart" style="width: 100%; height: 600px;"></div>
    </div>
</template>
  
<script setup>
import { ref, watch, onMounted } from 'vue';
import * as echarts from 'echarts';
import color from '@/config/color';

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

// 监听数据变化
watch(
  () => props.data,
  (newData) => {
    renderChart(newData);
  },
  { deep: true }
);

// 组件挂载时渲染图表
onMounted(() => {
  renderChart(props.data);
});

// 渲染图表的方法
const renderChart = (data) => {
  const chartDom = chart.value;
  const myChart = echarts.init(chartDom);

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
      height: '50%',
      top: '10%',
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
  
  <style scoped>
  /* 添加一些样式以确保图表容器的尺寸 */
  .heat-map-chart {
    width: 500px;
    .title {
        font-size: 24px;
        text-align: center;
        color: #3ad9ff;
    }
  }
  </style>