// modelManagementRoutes.js
import ModelManagementPage from '../views/ModelManagementPage.vue';

export default [
  {
    path: '/model-management',
    name: 'ModelManagement',
    component: ModelManagementPage,
  },
//  {
//    path: '/model-management/model-select',
//    name: 'ModelSelectForManagement',
//    component: () => import('../components/model_management/ModelSelect.vue'),
//  },
  {
    path: '/model-management/model-select/detail',
    name: 'ModelDetailForManagement',
    component: () => import('../components/model_management/ModelDetail.vue'),
  },
];
