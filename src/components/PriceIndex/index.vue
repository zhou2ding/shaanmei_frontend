<template>
    <div class="map-price-container">
      <div class="animate-border">
        <div class="content-wrapper">
          <div class="map-price-form-wrapper">
            <h2 class="map-price-form-title">煤矿运价指数</h2>
            <div class="map-price-form-row" v-if="vip">
                <el-config-provider :locale="zhCn">
                    <el-date-picker
                        v-model="selectedDate"
                        type="date"
                        placeholder="选择日期"
                        class="form-input"
                        :locale="zhCn"
                    />
                </el-config-provider>
                <el-button type="primary" class="search-button" @click="searchStart">查询</el-button>
            </div>
          </div>
          <!-- Baidu Map added below -->
          <div id="map1" style="width: 100%; height: 250px; margin-top: 20px;"></div>
        </div>
        <i></i>
        <i></i>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, defineEmits } from "vue";
  import "@vueform/multiselect/themes/default.scss";
  import "element-plus/dist/index.css";
  import {ElDatePicker, ElButton, ElConfigProvider} from "element-plus";
  import zhCn from 'element-plus/es/locale/lang/zh-cn';
  
  const selectedMine = ref(null);
  const searchUnloadPoint = ref('');
  const emit = defineEmits(["onSearch"]);
  
  const mineOptions = [
    { name: "西安", value: { lng: 108.948024, lat: 34.263161 } },
    { name: "宝鸡", value: { lng: 107.237974, lat: 34.361979 } },
    { name: "咸阳", value: { lng: 108.708991, lat: 34.329605 } },
  ];

  // 接收 prop 数据
  const props = defineProps({
    vip: {
        type: Boolean,
        default: true
    }
  });
  const selectedDate = ref(null);
  
  let map = null;
  let autocomplete = null;
  
  const searchStart = () => {
    if (!selectedMine.value || !searchUnloadPoint.value) {
      alert("请选择起点和终点");
      return;
    }
    const startPoint = selectedMine.value.value;
    const endPointName = searchUnloadPoint.value;
  
    // 使用百度地图API获取终点坐标
    const myGeo = new BMapGL.Geocoder();
    myGeo.getPoint(endPointName, function(point) {
      if (point) {
        console.log("终点坐标解析成功:", point);
  
        // 将 point 赋值给外部作用域的变量 endPoint
        const endPoint = new BMapGL.Point(point.lng, point.lat);
        const start = new BMapGL.Point(startPoint.lng, startPoint.lat);
  
        const driving = new BMapGL.DrivingRoute(map, {
          onSearchComplete: function(results) {
            if (driving.getStatus() === BMAP_STATUS_SUCCESS && results) {
              const plan = results.getPlan(0);
              const distance = plan.getDistance(true); // 获取距离
              console.log("起点坐标:", startPoint);
              console.log("终点坐标:", { lng: endPoint.lng, lat: endPoint.lat });
              console.log("距离:", distance);
              emit("onSearch", { startPoint, endPoint: { lng: endPoint.lng, lat: endPoint.lat }, distance });
            } else {
              console.error("DrivingRoute 搜索失败:", driving.getStatus());
              alert("未找到合适的路线");
            }
          }
        });
        driving.search(start, endPoint);
      } else {
        alert("终点地址解析失败");
      }
    });
  };
  
  onMounted(() => {
    // 初始化地图
    map = new BMapGL.Map("map1");
    const centerPoint = new BMapGL.Point(108.948024, 34.263161); // 中心点设置为西安
    map.centerAndZoom(centerPoint, 8);
  
    // 启用滚轮缩放
    map.enableScrollWheelZoom(true);
  
    // 添加比例尺控件
    const scaleControl = new BMapGL.ScaleControl();
    map.addControl(scaleControl);
  
    // 添加导航控件
    const navControl = new BMapGL.NavigationControl();
    map.addControl(navControl);
  
    // 初始化自动完成控件
    autocomplete = new BMapGL.Autocomplete({
      input: "endPointInput",
      location: map,
    });
  
    autocomplete.addEventListener("onconfirm", function (e) {
      const _value = e.item.value;
      searchUnloadPoint.value = _value.province + _value.city + _value.district + _value.street + _value.business;
    });
  });
  </script>
  
  <style lang="scss" scoped>
  @import '@/styles/variables/variables.module';
  
  .map-price-container {
    width: 400px;
    height: auto;
    overflow: hidden;
    // padding: 16px;
    border: 2px solid rgba(91, 166, 255, 0.4);
  
    .multiselect {
      z-index: 2000;
    }
  
    .animate-border {
      position: relative;
      width: 100%;
      // height: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
  
      &::before,
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
      }
  
      i {
        position: absolute;
        display: inline-block;
        height: 100%;
        width: 2px;
      }
  
      &::before {
        top: 0;
        left: -100%;
        background-image: linear-gradient(
                90deg,
                transparent,
                #6ec8ff,
                transparent
        );
        animation: one 4s linear infinite;
      }
  
      i:nth-child(1) {
        top: -100%;
        right: 0;
        background-image: linear-gradient(
                180deg,
                transparent,
                #6ec8ff,
                transparent
        );
        animation: two 4s linear 1s infinite;
      }
  
      &::after {
        bottom: 0;
        right: -100%;
        background-image: linear-gradient(
                -90deg,
                transparent,
                #6ec8ff,
                transparent
        );
        animation: three 4s linear 2s infinite;
      }
  
      i:nth-child(2) {
        bottom: -100%;
        left: 0;
        background-image: linear-gradient(
                360deg,
                transparent,
                #6ec8ff,
                transparent
        );
        animation: four 4s linear 3s infinite;
      }
  
      .content-wrapper {
        width: 90%;
        padding-bottom: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
  
  @keyframes one {
    0% {
      left: -100%;
    }
    50%,
    100% {
      left: 100%;
    }
  }
  
  @keyframes two {
    0% {
      top: -100%;
    }
    50%,
    100% {
      top: 100%;
    }
  }
  
  @keyframes three {
    0% {
      right: -100%;
    }
    50%,
    100% {
      right: 100%;
    }
  }
  
  @keyframes four {
    0% {
      bottom: -100%;
    }
    50%,
    100% {
      bottom: 100%;
    }
  }
  
  .map-price-form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .map-price-form-title {
    color: #3ad9ff;
    font-size: 24px;
    margin-top: 20px;
    text-align: center;
  }
  
  .map-price-form-row {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .start-point-input {
    width: 120px;
    margin-right: 10px;
    height: calc(var(--ms-border-width, 1px) + var(--ms-font-size, 1rem) * var(--ms-line-height, 1.375) + 2 * var(--ms-py, 0.5rem));
  }
  
  .end-point-input {
    width: 120px;
    margin-right: 10px;
    height: calc(var(--ms-border-width, 1px) + var(--ms-font-size, 1rem) * var(--ms-line-height, 1.375) + 2 * var(--ms-py, 0.5rem));
    border-radius: var(--ms-radius, 4px);
    background-color: var(--ms-bg, #FFFFFF);
    border: var(--ms-border-width, 1px) solid var(--ms-border-color, #D1D5DB);
    box-sizing: border-box;
    padding-left: var(--ms-px, 0.875rem);
    font-size: var(--ms-font-size, 1rem);
    line-height: var(--ms-line-height, 1.375);
    outline: none;
  
    &:focus {
      border: var(--ms-border-width-active, var(--ms-border-width, 1px)) solid var(--ms-border-color-active, #10B981);
      box-shadow: 0 0 0 var(--ms-ring-width, 3px) var(--ms-ring-color, #10B98130);
    }
  
    &::placeholder {
      color: var(--ms-placeholder-color, #9CA3AF);
    }
  }
  
  .search-button {
    white-space: nowrap;
    padding: 8px 20px;
    margin-left: 16px;
  }
  </style>