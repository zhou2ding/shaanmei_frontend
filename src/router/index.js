import {createRouter, createWebHistory} from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('../views/layout/Index.vue'),
            redirect:'/freightStatisticsVip',
            children: [
                {
                    path: '/freightStatisticsVip',
                    name: 'freightStatisticsVip',
                    component: () => import('../views/freightStatisticsVip/Index.vue'),
                },
                {
                    path: '/freightStatisticsNormal',
                    name: 'freightStatisticsNormal',
                    component: () => import('../views/freightStatisticsNormal/Index.vue'),
                }
            ]
        },
    ],
})

export default router
