<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h2>로그인</h2>
      <form @submit.prevent="submitLogin">
        <div class="input-group">
          <label>사용자 이름:</label>
          <input v-model="name" type="text" required />
        </div>
        <div class="input-group">
          <label>사번:</label>
          <input v-model="employee_no" type="text" required />
        </div>
        <button type="submit" class="login-button">로그인</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      employee_no: '',
      errorMessage: '',
    };
  },
  methods: {
  async submitLogin() {
    try {
      const response = await axios.post('http://localhost:8000/', {
        username: this.name,
        employee_no: this.employee_no,
      });

      const { role } = response.data; // FastAPI로부터 권한 정보 받아오기
      console.log(`로그인 성공: ${response.data.message}, 역할: ${role}`);

      // 로그인 성공 시 사용자 이름과 권한을 로컬 스토리지에 저장
      localStorage.setItem('username', this.name);
      localStorage.setItem('role', role);

      // 권한에 따른 리다이렉션
      if (role === '경영진') {
        this.$router.push('/management'); // 경영진 대시보드
      } else if (role === '엔지니어') {
        this.$router.push('/engineering/press'); // 엔지니어 대시보드
      } else if (role === '모델 관리자') {
        this.$router.push('/model-management'); // 모델 관리 대시보드
      } else {
        this.$router.push('/user-management'); // 기본 페이지
      }
    } catch (error) {
      this.errorMessage = "잘못된 사용자 이름 또는 사번입니다.";
      }
    }
  }
};
</script>



<style scoped>
/* 화면 중앙에 배치하기 위한 래퍼 스타일 */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;  /* 전체 화면 중앙에 위치 */
  background-color: #f2f2f2;
}

.login-container {
  width: 100%;
  max-width: 500px;
  padding: 3rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h2 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1rem;
  text-align: left;
}

.input-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555;
}

.input-group input {
  width: 100%;  /* 입력 필드 너비 100%로 설정 */
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-group input:focus {
  border-color: #007bff;
}

.login-button {
  width: 100%;  /* 버튼 너비 100%로 설정 */
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #3104B4;
}

.error {
  color: red;
  margin-top: 1rem;
  font-weight: bold;
}
</style>
