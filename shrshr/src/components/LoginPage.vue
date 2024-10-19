<template>
  <div class="login-container">
    <h2>로그인</h2>
    <div class="login-form">
      <input type="text" v-model="username" placeholder="사용자 이름" />
      <input type="text" v-model="employeeNo" placeholder="사번" />
      <button @click="login">로그인</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      employeeNo: '',
      users: [
        { name: '한수현', employeeNo: '1' },
        { name: '서희림', employeeNo: '2' },
        { name: '이규섭', employeeNo: '3' },
        { name: '김세진', employeeNo: '4' }
      ]
    };
  },
  methods: {
    login() {
      const foundUser = this.users.find(user =>
        user.name === this.username && user.employeeNo === this.employeeNo
      );
      if (foundUser) {
        this.$router.push('/user-management/user-list');
      } else {
        alert('잘못된 사용자 이름 또는 사번입니다.');
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 600px;  /* 너비를 600px로 조정 */
  margin: 100px auto;
  padding: 3rem;  /* 패딩을 크게 해서 더 넓게 보이도록 조정 */
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
}

.login-form input {
  display: block;
  width: 100%;
  padding: 1rem;  /* 인풋 필드 패딩 증가 */
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.2rem;  /* 글자 크기를 키움 */
}

button {
  padding: 0.75rem 1.5rem;  /* 버튼 크기 증가 */
  font-size: 1.2rem;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #303f9f;
}
</style>
