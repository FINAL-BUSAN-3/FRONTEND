<template>
  <div class="user-add-container">
    <h1>사용자 추가</h1>
    <input type="text" v-model="name" placeholder="이름" class="input-field">

    <!-- 사번 입력 필드 수정 -->
    <input
      type="number"
      v-model.number="employeeNo"
      placeholder="사번"
      class="input-field"
      min="1"
      @input="handleEmployeeNoInput"
      @keydown="disableScroll"
      />

    <!-- 권한 선택 드롭다운 -->
    <select v-model="role" :class="{'placeholder-selected': role === ''}" class="input-field">
      <option disabled value="">권한을 선택하세요</option>
      <option v-for="role in availableRoles" :key="role" :value="role">{{ role }}</option>
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
      role: "",
      availableRoles: []
    };
  },
  async created() {
    await this.fetchRoles();
  },
  methods: {
    async fetchRoles() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/user-management/group-list');
        this.availableRoles = response.data.user_groups.map(group => group[1]);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    },

    disableScroll(event) {
      // 마우스 스크롤로 값이 변경되지 않도록 방지
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
      }
    },
    async addUser() {
      if (!this.name || !this.employeeNo || !this.role) {
        alert("모든 필드를 채워주세요!");
        return;
      }

      const user = {
        name: this.name,
        employeeNo: this.employeeNo,
        position: this.role,
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
      this.$router.push('/user-management');
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
  margin: 0.2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.2rem;
  box-sizing: border-box;
  -moz-appearance: textfield; /* 화살표 없애기 */
}

.input-field::-webkit-outer-spin-button,
.input-field::-webkit-inner-spin-button {
  -webkit-appearance: none; /* 화살표 없애기 */
  margin: 0;
}

.placeholder-selected {
  color: #555;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 5px;
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
