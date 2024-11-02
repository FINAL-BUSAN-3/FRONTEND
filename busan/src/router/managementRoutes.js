// managementRoutes.js
import ManagementPage from '../views/ManagementPage.vue';

export default [
  {
    path: '/management',
    name: 'Management',
    component: ManagementPage,
  },
  {
    path: '/management/stock',
    name: 'StockChart',
    component: () => import('../components/management/StockChart.vue'),
  },
  {
    path: '/management/day-sales',
    name: 'DaySales',
    component: () => import('../components/management/DaySales.vue'),
  },
  {
    path: '/management/month-sales',
    name: 'MonthSales',
    component: () => import('../components/management/MonthSales.vue'),
  },
  {
    path: '/management/year-sales',
    name: 'YearSales',
    component: () => import('../components/management/YearSales.vue'),
  },
  {
    path: '/management/press/day',
    name: 'PressDay',
    component: () => import('../components/management/PressDay.vue'),
  },
  {
    path: '/management/press/week',
    name: 'PressWeek',
    component: () => import('../components/management/PressWeek.vue'),
  },
  {
    path: '/management/press/month',
    name: 'PressMonth',
    component: () => import('../components/management/PressMonth.vue'),
  },
  {
    path: '/management/welding/day',
    name: 'WeldingDay',
    component: () => import('../components/management/WeldingDay.vue'),
  },
  {
    path: '/management/welding/week',
    name: 'WeldingWeek',
    component: () => import('../components/management/WeldingWeek.vue'),
  },
  {
    path: '/management/welding/month',
    name: 'WeldingMonth',
    component: () => import('../components/management/WeldingMonth.vue'),
  },
];
