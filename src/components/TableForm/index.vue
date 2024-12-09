<template>
    <div class="table-form">
        <div class="title">{{ title }}</div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="route" label="线路" width="180"></el-table-column>
            <el-table-column prop="previous" label="上期 2024-10-18" ></el-table-column>
            <el-table-column prop="current" label="本期 2024-10-25"></el-table-column>
            <el-table-column prop="change" label="与上期比涨跌(%)"></el-table-column>
        </el-table>
    </div>
    
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { ElTable, ElTableColumn } from 'element-plus';
  
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
  
  // 表格数据
  const tableData = ref([]);
  
  // 监听数据变化
  watch(
    () => props.data,
    (newData) => {
      tableData.value = newData;
    },
    { deep: true }
  );
  
  // 组件挂载时初始化数据
  tableData.value = props.data;
  </script>
<style scoped>
    .table-form {
        width: 800px;
        .title {
            font-size: 24px;
            text-align: center;
            color: #3ad9ff;
            margin-bottom: 24px;
        }
    }
    /* 设置表格背景透明 */
    .el-table {
        background-color: transparent;
    }

    /* 根据需要调整其他样式属性，例如边框、字体颜色等 */
    .el-table th,
    .el-table td {
        border-color: #ddd; /* 设置边框颜色 */
        color: #333; /* 设置字体颜色 */
        }

    .el-table th {
        background-color: rgba(0, 0, 0, 0.1); /* 设置表头背景色为半透明黑色 */
    }
</style>