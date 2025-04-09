<script setup>
import {onMounted, ref} from "vue";
let map = null;
const mapDom = ref(null);
const props = defineProps({
    title:{
        type: String,
        default:''
    },
    searchParam:{
        type:Object,
        default:{}
    }
})
defineExpose({ drewRouteSingle })

/**
 * 地图上绘制标记
 */
function drewRouteSingle(){
    map.clearOverlays()
    let startList = props.searchParam.mine
    startList.forEach(point=>{
        const start = new BMapGL.Point(point.value.lng, point.value.lat);
        // 使用路线规划服务
        var markerStart = new BMapGL.Marker(start);
        map.addOverlay(markerStart);

        var labelStart = new BMapGL.Label('运价指数:'+getRandomNumber(), {position: start});
        labelStart.setStyle({
            color: 'red',
            fontSize: '16px',
            backgroundColor: 'transparent',
            border: 'none'
        });
        map.addOverlay(labelStart);
    })
}
function getRandomNumber() {
    // 生成一个介于 0 和 1 之间的随机数
    const random = Math.random();

    // 将随机数转换为 50 到 800 之间的随机数，并保留两位小数
    const result = (random * (800 - 50) + 50).toFixed(0);

    return result;
}



onMounted(()=>{
    // 初始化地图
    map = new BMapGL.Map(mapDom.value);
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
})
</script>

<template>
    <div class="routerMap">
        <div class="title">{{title}}</div>
        <div class="map" id="map-route" ref="mapDom"></div>
    </div>
</template>

<style scoped lang="less">
.routerMap {
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

    .map {
        width: 96%;
        height: 88%;
        z-index: 10;
        position: absolute;
        top: 10%;
        left: 2%;
    }
}

</style>