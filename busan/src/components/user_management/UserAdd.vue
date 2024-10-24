<template>
  <div class="user-add-container">
    <h1>사용자 추가</h1>
    <input type="text" v-model="name" placeholder="이름" class="input-field">
    <input type="number" v-model.number="employeeNo" placeholder="사번" class="input-field">

    <!-- 권한 선택 드롭다운 -->
    <select v-model="role" :class="{'placeholder-selected': role === ''}" class="input-field">
      <option disabled value="">권한을 선택하세요</option>
      <option value="경영진">경영진</option>
      <option value="엔지니어">엔지니어</option>
      <option value="모델관리자">모델 관리자</option>
    </select>

    <div class="button-group">
      <button @click="goBack" class="back-button">뒤로가기</button>
      <button @click="addUser" class="add-button">추가</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: "",
      employeeNo: "",
      role: ""  // 권한 초기값을 빈 문자열로 설정
    };
  },
  methods: {
    async addUser() {
      if (!this.name || !this.employeeNo || !this.role) {
        alert("모든 필드를 채워주세요!");
        return;
      }

      const user = {
        name: this.name,
        employeeNo: this.employeeNo,
        role: this.role,
      };

      try {
        const response = await axios.post('http://127.0.0.1:8000/user-management/user-add', user);
        alert(response.data.message || "사용자가 성공적으로 추가되었습니다!");
        this.$router.push({ path: '/user-management' });
      } catch (error) {
        console.error("Failed to add user:", error);
        alert("사용자 추가에 실패했습니다.");
      }
    },
    goBack() {
      this.$router.push('/user-management'); // 사용자 목록 화면으로 이동
    }
  }
};
</script>

<style scoped>
.user-add-container {
  max-width: 800px;
  margin: 80px auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f5f5f5;
  text-align: center;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.input-field {
  width: 30%;
  padding: 0.8rem;
  margin: 0.2rem ;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.2rem;
  box-sizing: border-box;
}

.placeholder-selected {
  color: #555;  /* '권한을 선택하세요' 글씨 색상 조정: 중간 회색 */
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 5px; /* 버튼 사이 간격 제거 */
}

.back-button, .add-button {
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover, .add-button:hover {
  background-color: #388e3c;
}
</style>