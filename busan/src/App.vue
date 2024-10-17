<template>
  <div id="app">
    <NavigationBar :isSidebarOpen="isSidebarOpen" class="sidebar" :class="{ open: isSidebarOpen }" /> <!-- 네비게이션 바 추가 -->
    <button class="toggle-button" @click.stop="toggleSidebar">{{ isSidebarOpen ? '◁' : '▷' }}</button> <!-- 토글 버튼 추가 -->
    <div class="main-content" :style="{ marginLeft: isSidebarOpen ? '250px' : '0' }" @click="handleMainContentClick"> <!-- 메인 콘텐츠 클릭 시 사이드바 닫기 -->
      <img alt="Vue logo" src="./assets/logo.png" />
      <router-view /> <!-- 현재 라우트에 따라 컴포넌트를 표시 -->
      <button @click="fetchTest">Fetch Test</button> <!-- Fetch 버튼 -->
      <p>{{ apiMessage }}</p> <!-- API 응답 메시지 표시 -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // import는 가장 상단에 위치해야 합니다.
import NavigationBar from './components/NavigationBar.vue'; // 네비게이션 컴포넌트 import

export default {
  name: 'App',
  components: {
    NavigationBar, // 네비게이션 바 등록
  },
  data() {
    return {
      apiMessage: '', // API 응답 메시지를 저장할 데이터
      isSidebarOpen: localStorage.getItem('isSidebarOpen') === 'true', // 사이드바의 열림/닫힘 상태
    };
  },
  methods: {
    async fetchTest() {
      try {
        const response = await axios.get('http://localhost:8000/test'); // FastAPI의 /test 호출
        this.apiMessage = response.data.message; // 응답 메시지를 저장
      } catch (error) {
        console.error('Error fetching data:', error);
        this.apiMessage = 'Error fetching data'; // 에러 발생 시 메시지
      }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen; // 사이드바 열기/닫기 상태 변경
      localStorage.setItem('isSidebarOpen', this.isSidebarOpen); // 사이드바 상태를 로컬 스토리지에 저장
    },
    handleMainContentClick() {
      if (this.isSidebarOpen) {
        this.isSidebarOpen = false; // 메인 콘텐츠 클릭 시 사이드바 닫기
        localStorage.setItem('isSidebarOpen', this.isSidebarOpen); // 사이드바 상태를 로컬 스토리지에 저장
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  height: 100vh; /* 화면 전체 높이를 차지하도록 설정 */
  position: relative;
}

.main-content {
  padding: 20px;
  flex: 1; /* 컨텐츠 부분이 남은 공간을 차지하도록 */
  transition: margin-left 0.3s ease; /* 사이드바가 접히거나 열릴 때 부드럽게 이동 */
}

.toggle-button {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 2000;
  background-color: #002c5f;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 1.2em;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background-color: #002c5f;
  color: #fff;
  z-index: 1000;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
}

.sidebar.open {
  transform: translateX(0);
}
</style>