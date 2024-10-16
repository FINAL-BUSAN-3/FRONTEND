import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';  // '../'로 경로를 수정
import TestPage from '../components/TestPage.vue';      // '../'로 경로를 수정
import ManagementPage from '../views/ManagementPage.vue';         // 경영지표 관련 페이지
import EngineeringPage from '../views/EngineeringPage.vue';       // 엔지니어링 지표 관련 페이지
import ModelManagementPage from '../views/ModelManagementPage.vue'; // 모델 관리 관련 페이지
import ModelDeploymentPage from '../views/ModelDeploymentPage.vue'; // 모델 배포 관련 페이지
import SocialAnalysisPage from '../views/SocialAnalysisPage.vue';   // 소셜 분석 관련 페이지
import UserManagementPage from '../views/UserManagementPage.vue';   // 사용자 관리 관련 페이지

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '/test',
    name: 'TestPage',
    component: TestPage,
  },
  {
    path: '/management',
    name: 'Management',
    component: ManagementPage,
  },
  {
    path: '/engineering/press',
    name: 'EngineeringPress',
    component: EngineeringPage,
  },
  {
    path: '/engineering/welding',
    name: 'EngineeringWelding',
    component: EngineeringPage,
  },
  {
    path: '/model-management',
    name: 'ModelManagement',
    component: ModelManagementPage,
  },
  {
    path: '/model-deployment',
    name: 'ModelDeployment',
    component: ModelDeploymentPage,
  },
  {
    path: '/social',
    name: 'SocialAnalysis',
    component: SocialAnalysisPage,
  },
  {
    path: '/user-management',
    name: 'UserManagement',
    component: UserManagementPage,
  },
  // 추가 라우트는 아래에 정의할 수 있습니다.
  // 예: {
  //   path: '/management/stock',
  //   name: 'Stock',
  //   component: Stock, // 해당 컴포넌트를 가져와야 합니다.
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;