// userManagement.js
import UserManagementPage from '../views/UserManagementPage.vue';

export default [
  {
    path: '/user-management',
    name: 'UserManagement',
    component: UserManagementPage,
  },
  {
    path: '/user-management/user',
    name: 'UserProfile',
    component: () => import('../components/user_management/UserProfile.vue'),
  },
  {
    path: '/user-management/user-list',
    name: 'UserList',
    component: () => import('../components/user_management/UserList.vue'),
  },
  {
    path: '/user-management/user-search',
    name: 'UserSearch',
    component: () => import('../components/user_management/UserSearch.vue'),
  },
  {
    path: '/user-management/user-add',
    name: 'UserAdd',
    component: () => import('../components/user_management/UserAdd.vue'),
  },
  {
    path: '/user-management/user-detail',
    name: 'UserDetail',
    component: () => import('../components/user_management/UserDetail.vue'),
  },
  {
    path: '/user-management/user-save',
    name: 'UserSave',
    component: () => import('../components/user_management/UserSave.vue'),
  },
  {
    path: '/user-management/group',
    name: 'UserGroup',
    component: () => import('../components/user_management/UserGroup.vue'),
  },
  {
    path: '/user-management/group-search',
    name: 'GroupSearch',
    component: () => import('../components/user_management/GroupSearch.vue'),
  },
  {
    path: '/user-management/group-add',
    name: 'GroupAdd',
    component: () => import('../components/user_management/GroupAdd.vue'),
  },
  {
    path: '/user-management/group-list',
    name: 'GroupList',
    component: () => import('../components/user_management/GroupList.vue'),
  },
];

