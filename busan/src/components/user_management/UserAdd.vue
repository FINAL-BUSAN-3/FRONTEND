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

    <button @click="addUser" class="add-button">사용자 추가</button>
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
    }
  }
};
</script>
