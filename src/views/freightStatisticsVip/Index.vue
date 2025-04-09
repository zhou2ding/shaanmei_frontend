<script setup>
import {ref,onMounted,nextTick} from 'vue'
import PageTitle from "@/components/PageTitle.vue";
import SearchCriteria from "@/views/freightStatisticsVip/components/SearchCriteria.vue";
import LineChart from "@/components/LineChart.vue"
import RadarChart from "@/components/RadarChart.vue"
import RouterMap from "@/components/RouterMap.vue";
import PriceMap from "@/components/PriceMap.vue";
import HeatMapChart from "@/components/HeatMapChart.vue";

const routeMap = ref(null)
const priceMap = ref(null)

const lineChartData = ref(null)
lineChartData.value = generateLineChartData(false)

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



const heatmapData = ref([]);

function generateHeatmapData(){
    const data = [];
    const categories = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const subcategories = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // 生成 9 行数据
    for (let i = 0; i < 9; i++) {
        const row = [];

        // 生成 9 列数据
        for (let j = 0; j < 9; j++) {
            // 生成一个随机的 category 和 subcategories
            const category = categories[j];
            const subcategoriesList = subcategories
            // 生成一个随机值，范围在 0 到 100 之间
            const value = Math.floor(Math.random() * 101);
            row.push({category, subcategories: subcategoriesList, value});
        }

        data.push(row);
    }

    return data;
}

const searchParam = ref({})

/**
 * 点击开始搜索
 * @param param 搜索参数
 */
function  startSearch(param){
    searchParam.value = JSON.parse(JSON.stringify(param))
    console.log(searchParam.value)
    console.log(routeMap)
    //生产折线图庶数据
    lineChartData.value = generateLineChartData(true)
    nextTick(()=>{
        routeMap.value.drewRouteLine()
        priceMap.value.drewRouteSingle()
    })

}


onMounted(()=>{
    heatmapData.value=generateHeatmapData()
})

</script>

<template>
    <div class="freight-vip-index">
        <div class="header">
            <PageTitle>
                <h1>运价统计</h1>
            </PageTitle>
        </div>
        <div class="search">
            <SearchCriteria @onSearch="startSearch"></SearchCriteria>
        </div>
        <div class="container">
            <div class="floor-1">
                <div class="floor-item line-chart">
                    <LineChart :data="lineChartData" :title="'运价指数'"></LineChart>
                </div>
                <div class="floor-item route-map">
                    <RouterMap ref="routeMap" :title="'线路运输单价'" :search-param="searchParam"></RouterMap>
                </div>
                <div class="floor-item route-map">
                    <PriceMap ref="priceMap" :title="'煤矿运价指数'" :search-param="searchParam"></PriceMap>
                </div>
            </div>
            <div class="floor-1">
                <div class="floor-item radar">
                    <RadarChart :title="'线路'"></RadarChart>
                </div>
                <div class="floor-item radar">
                    <RadarChart :title="'承运商'"></RadarChart>
                </div>
                <div class="floor-item heatMap">
                    <HeatMapChart :title="'收货省份'" :data="heatmapData"></HeatMapChart>
                </div>
                <div class="floor-item heatMap">
                    <HeatMapChart :title="'承运商'" :data="heatmapData"></HeatMapChart>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.freight-vip-index {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .header {
        width: 100%;
        height: 60px;

        h1 {
            color: white;
            font-size: 32px;
            margin: 0;
            font-weight: normal;
        }
    }

    .search {
        width: 100%;
        z-index: 200;
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

            .radar {
                width: 400px;
                height: 350px;
            }

            .heatMap {
                width: 400px;
                height: 350px;
            }

        }
    }
}
</style>