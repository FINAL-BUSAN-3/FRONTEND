// modelDeploymentRoutes.js
import ModelDeploymentPage from '../views/ModelDeploymentPage.vue';

export default [
  {
    path: '/model-deployment',
    name: 'ModelDeployment',
    component: ModelDeploymentPage,
  },
  {
    path: '/model-deployment/process-select',
    name: 'ProcessSelect',
    component: () => import('../components/model_deployment/ProcessSelect.vue'),
  },
  {
    path: '/model-deployment/model-insert',
    name: 'ModelInsert',
    component: () => import('../components/model_deployment/ModelInsert.vue'),
  },
  {
    path: '/model-deployment/model-select',
    name: 'ModelSelect',
    component: () => import('../components/model_deployment/ModelSelect.vue'),
  },
  {
    path: '/model-deployment/model-detail',
    name: 'ModelDetail',
    component: () => import('../components/model_deployment/ModelDetail.vue'),
  },
  {
    path: '/model-deployment/model-apply',
    name: 'ModelApply',
    component: () => import('../components/model_deployment/ModelApply.vue'),
  },
];
