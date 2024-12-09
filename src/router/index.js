import {createRouter, createWebHashHistory} from 'vue-router';
import ShipmentCosts from '@/views/ShipmentCosts.vue';
import ShipmentStatistics from '@/views/ShipmentStatistics.vue';

const routes = [
    {
        path: '/',
        redirect: '/shipment-costs',
    },
    {
        path: '/shipment-costs',
        name: 'ShipmentCosts',
        component: ShipmentCosts,
    },
    {
        path: '/shipment-statistics',
        name: 'ShipmentStatistics',
        component: ShipmentStatistics,
    }
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;