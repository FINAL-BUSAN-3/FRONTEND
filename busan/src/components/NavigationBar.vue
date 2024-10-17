<template>
  <div>
    <!-- 사이드바 -->
    <nav :class="['sidebar', { open: isSidebarOpen }]">
      <div class="sidebar-header">
        <h2>CDMS</h2>
      </div>
      <ul class="nav-links">
        <li><router-link to="/management">경영지표</router-link></li>
        <li>
          <span>엔지니어링 지표</span>
          <ul>
            <li><router-link to="/engineering/press">- 프레스</router-link></li>
            <li><router-link to="/engineering/welding">- 용접</router-link></li>
          </ul>
        </li>
        <li>
          <span>모델</span>
          <ul>
            <li><router-link to="/model-management">- 관리 지표</router-link></li>
            <li><router-link to="/model-deployment">- 모델 배포</router-link></li>
          </ul>
        </li>
        <li><router-link to="/user-management">사용자 관리</router-link></li>
      </ul>
      <div class="bottom-links">
        <router-link to="/user-info">아무개 사원</router-link>
        <router-link to="/logout" class="logout-link">로그아웃</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #002c5f;
  color: #fff;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; /* 사이드바가 다른 콘텐츠보다 위에 위치하도록 설정 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 위쪽 콘텐츠와 아래쪽 콘텐츠 간격 */
  transition: transform 0.3s ease; /* 부드러운 열기/닫기 애니메이션 */
}

.sidebar.open {
  transform: translateX(0); /* 열렸을 때 원래 위치로 */
}

.sidebar:not(.open) {
  transform: translateX(-100%); /* 닫혔을 때 왼쪽으로 숨김 */
}

.sidebar-header {
  margin-bottom: 20px;
  font-weight: bold;
  border-bottom: 1px solid #fff;
  padding-bottom: 10px;
}

.nav-links {
  list-style-type: none;
  padding: 0;
  font-size: 1.2em; /* 폰트 크기 통일 (적당히 크게 설정) */
}

.nav-links li {
  margin: 10px 0;
}

.nav-links li a {
  text-decoration: none;
  color: #fff;
  font-size: 1.1em; /* 폰트 크기 통일 */
}

.nav-links li ul {
  list-style-type: none;
  padding-left: 20px;
}

.bottom-links {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* 우측 정렬 */
  margin-top: auto;
  font-size: 1.1em; /* 폰트 크기 통일 */
}

.bottom-links a {
  text-decoration: none;
  color: #fff;
  margin: 10px 0;
}

.logout-link {
  font-weight: bold;
}
</style>
