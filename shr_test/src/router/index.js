import { createRouter, createWebHistory } from 'vue-router';
import ManagementView from '../views/ManagementView.vue';

const routes = [
  {
    path: '/',
    name: 'Management',
    component: ManagementView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
