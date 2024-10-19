import { createRouter, createWebHistory } from 'vue-router';
import AdminLayout from '../layouts/AdminLayout.vue';

import UserList from '../components/UserList.vue'; // 사용자 관리
import UserAdd from '../components/UserAdd.vue'; // 사용자 추가
import UserDetail from '../components/UserDetail.vue'; // 개인정보
import GroupList from '../components/GroupList.vue';  // 권한 관리 화면
import GroupAdd from '../components/GroupAdd.vue';  // 권한 추가 화면
import LoginPage from '../components/LoginPage.vue';  // LoginPage

const routes = [
  {
    path: '/',  // 첫 화면을 로그인 페이지로 설정
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/',
    redirect: '/user-management/user-list'
  },
  {
    path: '/user-management/user-list',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'UserList',
        component: UserList
      }
    ]
  },
  {
     path: '/user-management/user-add',
  component: AdminLayout,
  children: [
    {
      path: '',
      name: 'UserAdd',
      component: UserAdd
      }
    ]
  },
  {
    path: '/user-management/user-detail/:userId',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'UserDetail',
        component: UserDetail
      }
    ]
  },
  {
    path: '/user-management/group-list',  // 권한 관리 경로
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'GroupList',
        component: GroupList
      }
    ]
  },
  {
  path: '/user-management/group-add',
  component: AdminLayout,
  children: [
    {
      path: '',
      name: 'GroupAdd',
      component: GroupAdd
    }
  ]
},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

