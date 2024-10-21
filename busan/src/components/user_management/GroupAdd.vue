<template>
  <div>
    <h1>GroupAdd.vue</h1>
  </div>
  <div class="group-add">
    <h2>권한 추가</h2>

    <div class="form-container">
      <input type="text" v-model="groupName" placeholder="권한 이름" />
      <input type="text" v-model="groupDescription" placeholder="권한 설명" />
      <button @click="addGroup">권한 추가</button>
    </div>

    <!-- 뒤로가기 버튼 -->
    <button @click="goBack" class="back-button">뒤로가기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupName: '',
      groupDescription: ''
    };
  },
  methods: {
    addGroup() {
      console.log('추가할 권한:', this.groupName, this.groupDescription);
      alert('권한이 추가되었습니다.');
      this.$router.push({ path: '/user-management/group-list' });  // 권한 목록으로 이동
    },
    goBack() {
      this.$router.go(-1);  // 뒤로가기 (이전 페이지로)
    }
  }
};
</script>

<style scoped>
.group-add {
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 600px;
  margin: 2rem auto;
  font-size: 1.4rem;
}

.form-container {
  display: flex;
  flex-direction: column;
}

input[type="text"] {
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #388e3c;
}

/* 뒤로가기 버튼 스타일 */
.back-button {
  margin-top: 1rem;
  background-color: #3f51b5;
}

.back-button:hover {
  background-color: #303f9f;
}
</style>
