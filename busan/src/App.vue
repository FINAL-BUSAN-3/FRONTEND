<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <router-view /> <!-- 현재 라우트에 따라 컴포넌트를 표시 -->
    <button @click="fetchTest">Fetch Test</button> <!-- Fetch 버튼 -->
    <p>{{ apiMessage }}</p> <!-- API 응답 메시지 표시 -->
  </div>
</template>

<script>
import axios from 'axios'; // import는 가장 상단에 위치해야 합니다.

export default {
  name: 'App',
  data() {
    return {
      apiMessage: '', // API 응답 메시지를 저장할 데이터
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
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
