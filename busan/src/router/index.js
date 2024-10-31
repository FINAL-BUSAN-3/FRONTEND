import { createRouter, createWebHistory } from 'vue-router';
//import HelloWorld from '../components/HelloWorld.vue';
//import TestPage from '../components/TestPage.vue';

// 각 기능별 라우트 파일 불러오기
import engineeringRoutes from './engineeringRoutes';
import managementRoutes from './managementRoutes';
import modelManagementRoutes from './modelManagementRoutes';
import modelDeploymentRoutes from './modelDeploymentRoutes';
import socialAnalysisRoutes from './socialAnalysisRoutes';
import userInfoRoutes from './userInfoRoutes';
import userLogoutRoutes from './userLogoutRoutes';
import userManagementRoutes from './userManagementRoutes';

import Login from '@/views/LoginPage.vue'  // Login.vue가 위치한 경로를 정확히 입력

// 기본 라우트 + 그룹별 라우트 병합
const routes = [

  {
    path: '/',
    name: 'Login',
    component: Login
  },
//  {
//    path: '/',
//    name: 'HelloWorld',
//    component: HelloWorld,
//  },
//  {
//    path: '/test',
//    name: 'TestPage',
//    component: TestPage,
//  },
  ...engineeringRoutes,
  ...managementRoutes,
  ...modelManagementRoutes,
  ...modelDeploymentRoutes,
  ...socialAnalysisRoutes,
  ...userInfoRoutes,
  ...userLogoutRoutes,
  ...userManagementRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
