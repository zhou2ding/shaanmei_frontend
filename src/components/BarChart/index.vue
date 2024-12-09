<template>
    <div class="bar-chart">
        <div class="title">{{ title }}</div>
        <div ref="chart" style="width: 100%; height: 400px;"></div>
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
  
    // 对数据进行从高到低排序
    const sortedData = [...data].sort((a, b) => a.value - b.value);
  
    const option = {
      tooltip: {
        trigger: 'axis', // 提示框触发方式，可以根据需要修改为'item'或'none'等
        axisPointer: { // 提示框坐标轴指示器配置，可以根据需要修改
          type: 'shadow', // 指示器类型，可以根据需要修改为'line'或'shadow'等
        },
      },
      grid: { // 网格配置，可以根据需要修改网格的宽度、高度和间距等属性
        show: false,
        // left: '10%', // 网格左侧间距，可以根据需要修改为其他值或百分比
        // right: '4%', // 网格右侧间距，可以根据需要修改为其他值或百分比
        // bottom: '3%', // 网格底部间距，可以根据需要修改为其他值或百分比
        // containLabel: true, // 网格是否包含标签，可以根据需要修改为false以隐藏标签
      },
      xAxis: { // X轴配置，可以根据需要修改X轴的类型、刻度、标签等属性
        type: 'value', // X轴类型，可以根据需要修改为'category'等其他类型
        min: 0, // 设置X轴的最小值为0，以确保条形图从0开始
        axisLine: { // X轴轴线配置，可以根据需要修改轴线的颜色、宽度等属性。这里设置为false以隐藏轴线。
          show: false, // 是否显示X轴轴线，设置为false以隐藏轴线。
        },
      },
      yAxis: { // Y轴配置，可以根据需要修改Y轴的类型、刻度、标签等属性
        type: 'category', // Y轴类型，可以根据需要修改为'value'等其他类型
        data: sortedData.length > 0 ? sortedData.map(item => item.name) : [], // Y轴数据，可以根据需要修改为实际数据。这里使用排序后的数据。
        splitLine: { // Y轴网格线配置，可以根据需要修改网格线的颜色、宽度等属性。这里设置为false以取消中间的竖条。
          show: false, // 是否显示Y轴网格线，设置为false以取消中间的竖条。
        },
      },
      series: [ // 数据系列配置，可以根据需要修改系列的类型、数据、标签等属性。这里使用条形图类型。
        {
          name: '', // 系列名称，可以根据需要修改为其他名称，如'系列1'等。
          type: 'bar', // 系列类型，可以根据需要修改为其他类型，如'line'等。这里使用条形图类型。
          data: sortedData.length > 0 ? sortedData.map(item => item.value) : [], // 系列数据，可以根据需要修改为实际数据。这里使用排序后的数据。
          barWidth: '50%', // 设置条形的宽度，可以根据需要修改为其他值或百分比。这里设置为40%。
          label: { // 数据标签配置，可以根据需要修改。这里显示数据值。
            show: true, // 显示数据标签。如果需要隐藏，可以设置为false。
            position: 'top', // 数据标签显示位置。可以根据需要修改为其他位置，如'bottom'等。这里设置为顶部。
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: color[9] }, // 渐变开始颜色
                { offset: 1, color: color[7] }, // 渐变结束颜色
            ]),
          },
        },
      ],
    };
  
    myChart.setOption(option);
  };
  </script>
    <style scoped>
    /* 添加一些样式以确保图表容器的尺寸 */
    .bar-chart {
      width: 350px;
      .title {
          font-size: 24px;
          text-align: center;
          color: #3ad9ff;
      }
    }
    </style>