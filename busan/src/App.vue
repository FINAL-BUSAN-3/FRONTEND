<template>
  <div id="app">
    <!-- 현재 라우트가 /가 아닌 경우에만 NavigationBar를 표시 -->
    <NavigationBar
      v-if="$route.path !== '/'"
      :isSidebarOpen="isSidebarOpen"
      class="sidebar"
      :class="{ open: isSidebarOpen }"
    />
    <button
      v-if="$route.path !== '/'"
      class="toggle-button"
      @click.stop="toggleSidebar"
    >
      {{ isSidebarOpen ? '◁' : '▷' }}
    </button>

    <!-- 메인 콘텐츠 -->
    <div class="main-content" :style="{ marginLeft: isSidebarOpen && $route.path !== '/' ? '250px' : '0' }">
      <router-view />
      <p>{{ apiMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavigationBar from './components/NavigationBar.vue';

export default {
  name: 'App',
  components: {
    NavigationBar,
  },
  data() {
    return {
      apiMessage: '',
      isSidebarOpen: localStorage.getItem('isSidebarOpen') === 'true',
    };
  },
  methods: {
    async fetchTest() {
      try {
        const response = await axios.get('http://localhost:8000/test');
        this.apiMessage = response.data.message;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.apiMessage = 'Error fetching data';
      }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      localStorage.setItem('isSidebarOpen', this.isSidebarOpen);
    },
  },
};
</script>



<style>

body, #app {
  margin: 0; /* 여백 제거 */
  padding: 0;
  font-family: 'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  width: 100vw;
  min-height: 100vh;
  background-color: #F2F2F2;
}

.sidebar {
  width: 250px;
  min-height: 100vh;
  background-color: #2e2e2e;
  color: #fff;
  z-index: 1000;
  transition: transform 0.3s ease;
}

.sidebar.open {
  transform: translateX(0);
}

.main-content {
  padding: 20px;
  flex: 1;
  transition: margin-left 0.3s ease;
  overflow: auto;
}


.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  min-height: 100vh; /* 사이드바도 화면 전체 높이로 설정 */
  background-color: #00aad2;
  color: #fff;
  z-index: 1000;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
}

.sidebar.open {
  transform: translateX(0);
}

</style>
