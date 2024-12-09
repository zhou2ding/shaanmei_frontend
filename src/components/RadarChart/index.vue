<template>
   <div class="radar-chart">
      <div class="title">{{title}}</div>
      <div ref="chart" style="width: 100%; height: 300px;"></div>
   </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import * as echarts from 'echarts';
  
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
  
    // 计算每个指标的最大值
    const maxValues = data.length > 0 ? calculateMaxValues(data) : [];
    console.log('maxValues', maxValues)
  
    const option = {
    //   title: {
    //     text: '综合', // 标题文本，可以根据需要修改
    //     subtext: '', // 子标题文本，可以根据需要修改
    //   },
      radar: {
        // 动态计算的指标名称和最大值数组
        indicator: data.length > 0 ? data[0].indicators.map((indicator, index) => ({
          name: indicator.name,
          max: maxValues,
        })) : [],
        splitNumber: 2, // 设置雷达图的分割段数，可以根据需要修改
        axisLine: {
          lineStyle: {
            width: 1, // 设置轴线的宽度，可以根据需要修改
          },
        },
        splitLine: {
          lineStyle: {
            width: 1, // 设置分割线宽度，可以根据需要修改
          },
        },
        shape: 'circle', // 设置雷达图的形状为圆形，可以根据需要修改为其他形状，如'polygon'或'rect'等。
        name: {
          textStyle: {
            color: '#000', // 指标名称颜色，可以根据需要修改
          },
        },
      },
      series: [
        {
          name: '综合', // 系列名称，可以根据需要修改为其他名称，如'系列1'等。
          type: 'radar', // 图表类型为雷达图，可以根据需要修改为其他类型，如'line'等。
          data: data.length > 0 ? data.map(item => ({
            value: item.value, // 指标值数组，与指标名称数组对应，可以根据需要修改为实际数据。这里使用示例数据。
            label: { // 数据标签配置，可以根据需要修改。这里显示数据值。
              show: true, // 显示数据标签。如果需要隐藏，可以设置为false。
              position: 'top', // 数据标签显示位置。可以根据需要修改为其他位置，如'bottom'等。
              color: '#000', // 数据标签颜色，可以根据需要修改。这里使用黑色。
              fontSize: 12, // 数据标签字体大小，可以根据需要修改。这里使用12像素。
            },
            itemStyle: { // 数据点样式配置，可以根据需要修改。这里设置数据点边框颜色和宽度。
              borderColor: '#FF9999', // 数据点边框颜色，可以根据需要修改。这里使用浅红色。
              borderWidth: 1, // 数据点边框宽度，可以根据需要修改。这里使用2像素。
            },
            lineStyle: { // 数据点之间连线样式配置，可以根据需要修改。这里设置连线宽度和颜色。
              width: 2, // 连线宽度，可以根据需要修改。这里使用2像素。
              color: '#FF9999', // 连线颜色，可以根据需要修改。这里使用浅红色。
            },
            areaStyle: { // 数据点之间区域样式配置，可以根据需要修改。这里设置区域颜色和透明度。
              color: '#FF9999', // 区域颜色，可以根据需要修改。这里使用浅红色。
              opacity: 0.5, // 区域透明度，可以根据需要修改。这里使用50%。
            },
          })) : [],
        },
      ],
    };
  
    myChart.setOption(option);
  };
  
  // 计算每个指标的最大值
  const calculateMaxValues = (data) => {
    console.log(Object.values(data[0].value), Math.max(Object.values(data[0].value)))
    return  Math.max(...Object.values(data[0].value));
  };
  </script>
  
  <style scoped>
  /* 添加一些样式以确保图表容器的尺寸 */
  .radar-chart {
    width: 300px;
    /* height: 300px; */
    .title {
        font-size: 24px;
        text-align: center;
        color: #3ad9ff;
    }
  }
  </style>