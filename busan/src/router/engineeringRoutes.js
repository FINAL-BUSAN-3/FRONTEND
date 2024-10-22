// engineeringRoutes.js
import EngineeringPage from '../views/EngineeringPage.vue';
import EngineeringPressPage from '../views/EngineeringPressPage.vue'; // 추가
import EngineeringWeldingPage from '../views/EngineeringWeldingPage.vue'; // 추가

export default [
  {
    path: '/engineering',
    name: 'Engineering',
    component: EngineeringPage,
  },
  {
    path: '/engineering/press',
    name: 'EngineeringPress',
    component: EngineeringPressPage,
  },
  {
    path: '/engineering/welding',
    name: 'EngineeringWelding',
    component: EngineeringWeldingPage,
  },
  {
    path: '/engineering/realtime-press/select',
    name: 'RealtimePressSelect',
    component: () => import('../components/engineering/RealtimePressSelect.vue'),
  },
  {
    path: '/engineering/realtime-press/insert',
    name: 'RealtimePressInsert',
    component: () => import('../components/engineering/RealtimePressInsert.vue'),
  },
  {
    path: '/engineering/realtime-welding/select',
    name: 'RealtimeWeldingSelect',
    component: () => import('../components/engineering/RealtimeWeldingSelect.vue'),
  },
  {
    path: '/engineering/realtime-welding/insert',
    name: 'RealtimeWeldingInsert',
    component: () => import('../components/engineering/RealtimeWeldingInsert.vue'),
  },
  {
    path: '/engineering/realtime-press/trend',
    name: 'PressTrend',
    component: () => import('../components/engineering/PressTrend.vue'),
  },
  {
    path: '/engineering/realtime-welding/trend',
    name: 'WeldingTrend',
    component: () => import('../components/engineering/WeldingTrend.vue'),
  },
];
