<script setup>
import PageTitle from "@/components/PageTitle.vue";
import SearchCriteria from "@/views/freightStatisticsNormal/components/SearchCriteria.vue";
import LineChart from "@/components/LineChart.vue";
import RouterMap from "@/components/RouterMap.vue";
import PriceMap from "@/components/PriceMap.vue";
import ScrollTable from "@/components/ScrollTable.vue";
import BarChart from "@/components/BarChart.vue";
import {ref,nextTick,onMounted} from "vue";
const routeMap = ref(null)
const priceMap = ref(null)

const lineChartData = ref(null)      //折线图数据
lineChartData.value = generateLineChartData(true)
function generateLineChartData(flag) {
    const now = new Date();
    const timestamps = Array.from({length: 60}, (_, idx) => {
        const time = new Date(now - idx * 60000); // 每分钟往前推
        return `${time.getHours()}:${time.getMinutes().toString().padStart(2, "0")}`;
    }).reverse();

    return {
        timestamps, // 横轴时间数据
        values:flag? Array.from({length: 60}, () => Math.random() * 100):[], // 随机数据
    };
};
const getRandomInt = (min, max) => {
    // 使用 Math.random() 生成一个介于 0 和 1 之间的随机数
    // 然后乘以 (max - min + 1) 得到一个介于 0 和 (max - min + 1) 之间的随机数
    // 最后加上 min 得到一个介于 min 和 max 之间的随机数
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const searchParam = ref({mine:[
        {
            name:"西安",
            value:{lng: 108.948024, lat: 34.263161}
        }
    ],
    port:{location:{lat: 39.908909, lng: 116.434143}}})
/**
 * 点击开始搜索
 * @param param 搜索参数
 */
function startSearch(param){
    //生产折线图庶数据
    lineChartData.value = generateLineChartData(true)
}
onMounted(()=>{
   nextTick(()=>{
       routeMap.value.drewRouteLine()
       priceMap.value.drewRouteSingle()
   })
})
</script>

<template>
    <div class="freight-index">
        <div class="header">
            <PageTitle>
                <h1>运价统计1</h1>
            </PageTitle>
        </div>
        <div class="search">
            <SearchCriteria @onSearch="startSearch"></SearchCriteria>
        </div>
        <div class="container">
            <div class="floor-1">
                <div class="floor-item line-chart">
                    <LineChart :data="lineChartData" :title="'综合运价指数'"></LineChart>
                </div>
                <div class="floor-item route-map">
                    <RouterMap :searchParam="searchParam" ref="routeMap" :title="'线路运输单价'"></RouterMap>
                </div>
                <div class="floor-item route-map">
                    <PriceMap :searchParam="searchParam" ref="priceMap" :title="'煤矿运价指数'"></PriceMap>
                </div>
            </div>
            <div class="floor-1">
                <div class="floor-item bar-chart">
                    <BarChart :title="'运价排名'"></BarChart>
                </div>
                <div class="floor-item bar-chart">
                    <BarChart :title="'运量排名'"></BarChart>
                </div>
                <div class="floor-item scroll-table">
                    <ScrollTable :title="'线路运价指数'"></ScrollTable>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.freight-index{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    .header{
        width: 100%;
        height: 60px;
        h1{
            color: white;
            font-size: 32px;
            margin: 0;
            font-weight: normal;
        }
    }
    .search {
        width: 100%;
    }
    .container {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: auto;

        .floor-1 {
            display: flex;
            margin-top: 20px;
            align-items: center;
            justify-content: space-between;


            .floor-item {
                margin: 0 12px;
            }

            .line-chart {
                width: 500px;
                height: 400px;
                margin-right: 16px;
            }

            .route-map {
                width: 500px;
                height: 400px;
            }

            .bar-chart {
                width: 500px;
                height: 350px;
            }

            .scroll-table {
                width: 500px;
                height: 350px;
            }

        }
    }
}
</style>