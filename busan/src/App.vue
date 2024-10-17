//App.vue
<template>
  <div id="app">
    <NavigationBar :isSidebarOpen="isSidebarOpen" class="sidebar" :class="{ open: isSidebarOpen }" /> <!-- 네비게이션 바 추가 -->
    <button class="toggle-button" @click.stop="toggleSidebar">{{ isSidebarOpen ? '◁' : '▷' }}</button> <!-- 토글 버튼 추가 -->
    <div class="main-content" :style="{ marginLeft: isSidebarOpen ? '250px' : '0' }" @click="handleMainContentClick"> <!-- 메인 콘텐츠 클릭 시 사이드바 닫기 -->
      <router-view /> <!-- 현재 라우트에 따라 컴포넌트를 표시 -->
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
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.main-content {
  padding: 20px;
  flex: 1;
  transition: margin-left 0.3s ease;
  height: calc(100vh - 40px); /* 화면을 꽉 채우도록 설정, 패딩 보정 */
  overflow: auto;
}

.toggle-button {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 2000;
  background-color: #00aad2;
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
