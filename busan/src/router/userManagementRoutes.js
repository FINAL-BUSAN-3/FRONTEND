// userManagement.js
import UserManagementPage from '../views/UserManagementPage.vue';
import UserPage from '../views/UserPage.vue';
import GroupPage from '../views/GroupPage.vue';
import UserDetail from '../components/user_management/UserDetail.vue';

export default [
  {
    path: '/user-management',
    name: 'UserManagement',
    component: UserManagementPage,
  },
  {
    path: '/user-management/user',
    name: 'UserPage',
    component: UserPage,
  },
  {
    path: '/user-management/group',
    name: 'GroupPage',
    component: GroupPage,
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
//  {
//    path: '/user-management/user-detail',
//    name: 'UserDetail',
//    component: () => import('../components/user_management/UserDetail.vue'),
//  },
  {
    path: '/user-management/user-detail/:userId',
    name: 'UserDetail',
    component: UserDetail,
    props: true  // URL에서 받은 `userId`를 props로 넘겨줍니다.
  },
  {
    path: '/user-management/user-save',
    name: 'UserSave',
    component: () => import('../components/user_management/UserSave.vue'),
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
  {
    path: '/user-management/user-delete',
    name: 'UserDelete',
    component: () => import('../components/user_management/UserDelete.vue'),
  },
  {
    path: '/user-management/group-delete',
    name: 'GroupDelete',
    component: () => import('../components/user_management/GroupDelete.vue'),
  },
];

