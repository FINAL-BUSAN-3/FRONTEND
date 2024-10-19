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
export default {
  data() {
    return {
      name: "",
      employeeNo: "",
      role: ""  // 권한 초기값을 빈 문자열로 설정
    };
  },
  methods: {
    addUser() {
      if (!this.name || !this.employeeNo || !this.role) {
        alert("모든 필드를 채워주세요!");
        return;
      }

      const user = {
        id: Date.now(), // 임시 고유 ID
        name: this.name,
        employeeNo: this.employeeNo,
        role: this.role,
        last_login: null
      };
      console.log("추가할 사용자 데이터:", user);

      // 사용자 추가 성공 팝업
      alert("사용자가 성공적으로 추가되었습니다!");

      // 사용자 목록으로 이동
      this.$router.push({ path: '/user-management/user-list' });
    }
  }
};
</script>

<style scoped>
.user-add-container {
  max-width: 500px;
  margin: 80px auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
}

.input-field {
  display: block;
  width: 90%;  /* 입력 필드와 드롭다운 너비 동일 */
  padding: 0.8rem;
  margin: 1rem auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.1rem;
  box-sizing: border-box;  /* 드롭다운 너비가 입력 필드와 일치하도록 설정 */
}

.placeholder-selected {
  color: #555;  /* '권한을 선택하세요' 글씨 색상 조정: 중간 회색 */
}

.add-button {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.add-button:hover {
  background-color: #388e3c;
}
</style>
