<template>
  <div>
    <!-- 사이드바 -->
    <nav :class="['sidebar', { open: isSidebarOpen }]">
      <div class="sidebar-header">
        <h2>CDMS</h2>
      </div>
      <ul class="nav-links">
        <li>
          <router-link to="/management">
            <i class="fas fa-chart-line"></i> <span>경영지표</span>
          </router-link>
        </li>
        <li>
          <router-link to="/social"> <!-- 소셜지표 링크 추가 -->
            <i class="fas fa-comments"></i> <span>소셜지표</span> <!-- 아이콘으로 댓글 아이콘 사용 -->
          </router-link>
        </li>
        <li>
          <span><i class="fas fa-tools"></i> <span>엔지니어링 지표</span></span>
          <ul>
            <li><router-link to="/engineering/press"><i class="fas fa-cogs"></i> <span> 프레스</span></router-link></li>
            <li><router-link to="/engineering/welding"><i class="fas fa-wrench"></i> <span> 용접</span></router-link></li>
          </ul>
        </li>
        <li>
          <span><i class="fas fa-car"></i> <span>모델</span></span>
          <ul>
            <li><router-link to="/model-management"><i class="fas fa-tasks"></i> <span> 관리 지표</span></router-link></li>
            <li><router-link to="/model-deployment"><i class="fas fa-rocket"></i> <span> 모델 배포</span></router-link></li>
          </ul>
        </li>
        <li>
          <router-link to="/user-management">
            <i class="fas fa-users"></i> <span>사용자 관리</span>
          </router-link>
        </li>
      </ul>
      <div class="bottom-links">
        <router-link to="/user-info"><i class="fas fa-user-circle"></i> <span>{{ username }} 사원</span></router-link>
        <a href="#" @click.prevent="logout" class="logout-link"><i class="fas fa-sign-out-alt"></i> <span>로그아웃</span></a>
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
  data() {
    return {
      username: '', // 사용자 이름 저장
    };
  },
  created() {
    // 로컬 스토리지에서 사용자 이름을 가져옴
    this.username = localStorage.getItem('username') || '아무개';
  },
  methods: {
    logout() {
      fetch('http://ec2-18-215-52-54.compute-1.amazonaws.com:8080/logout', {
        method: 'POST',
        credentials: 'include'
      })
        .then(() => {
          // 로그아웃 시 로컬 스토리지에서 사용자 이름 제거
          localStorage.removeItem('username');
          window.location.href = 'http://ec2-18-215-52-54.compute-1.amazonaws.com:8080';
        })
        .catch((error) => {
          console.error("로그아웃 에러:", error);
        });
    }
  }
};
</script>

<style scoped>
/* 스타일은 이전과 동일 */
.sidebar {
  width: 250px;
  background-color: #2E2E2E;
  color: #fff;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease;
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar:not(.open) {
  transform: translateX(-100%);
}

.sidebar-header {
  margin-bottom: 20px;
  font-weight: bold;
  border-bottom: 1px solid #fff;
  padding-bottom: 10px;
  font-size: 1.5em; /* 글씨 크기 증가 */
}

.nav-links {
  list-style-type: none;
  padding: 0;
  font-size: 1.3em;
}

.nav-links li {
  margin: 17px 0;
}

.nav-links li > a,
.nav-links li > span {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
}

.nav-links li i {
  margin-right: 10px; /* 아이콘과 텍스트 간격 */
  min-width: 20px;    /* 아이콘 크기 통일 */
  text-align: center;
}

.nav-links li ul {
  list-style-type: none;
  padding-left: 30px; /* 서브 메뉴 들여쓰기 */
}

.bottom-links {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: auto;
  font-size: 1.1em;
}

.bottom-links a {
  text-decoration: none;
  color: #fff;
  margin: 10px 0;
  display: flex;
  align-items: center;
}

.bottom-links i {
  margin-right: 8px;
}

.logout-link {
  font-weight: bold;
}
</style>
