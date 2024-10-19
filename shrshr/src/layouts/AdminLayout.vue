<template>
  <div class="admin-layout">
    <!-- 현재 라우트에 따라 사이드바를 동적으로 변경 -->
    <component :is="currentSidebar" />
    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
// 사이드바 컴포넌트들 import
import AdminSidebar from './AdminSidebar.vue'; // 기본 사이드바
import SidebarUserDetail from './SidebarUserDetail.vue'; // UserDetail 전용 사이드바

export default {
  components: {
    AdminSidebar,
    SidebarUserDetail
  },
  computed: {
    currentSidebar() {
      // 현재 라우트가 'UserDetail'일 경우 SidebarUserDetail을 사용하고, 그렇지 않으면 기본 AdminSidebar를 사용
      return this.$route.name === 'UserDetail' ? 'SidebarUserDetail' : 'AdminSidebar';
    }
  }
};
</script>

<style scoped>
.admin-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100vh;
}

.content {
  padding: 3rem;
  background-color: #f0f2f5;
}
</style>
