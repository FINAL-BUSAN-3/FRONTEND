<template>
  <div>
    <h1>UserDetail.vue</h1>
  </div>
  <div class="user-detail">
    <!-- 상단 네비게이션 바 -->
    <h2>개인정보</h2>
    <nav class="top-nav">
      <router-link
        :to="`/user-management/user-detail/${$route.params.userId}`"
        active-class="active-link"
      >개인정보</router-link>
      <router-link
        to="/user-management/group-list"
        active-class="active-link"
      >권한 관리</router-link>
    </nav>

    <div v-if="user">
      <p><strong>이름:</strong> {{ user.name }}</p>
      <p><strong>사번:</strong> {{ user.employeeNo }}</p>

      <!-- 권한 체크박스 -->
      <p><strong>권한:</strong>
        <label><input type="checkbox" v-model="userRoles" value="경영진" /> 경영진</label>
        <label><input type="checkbox" v-model="userRoles" value="엔지니어" /> 엔지니어</label>
        <label><input type="checkbox" v-model="userRoles" value="모델관리자" /> 모델 관리자</label>
      </p>
    </div>
    <div v-else>
      <p>사용자 정보를 가져오는 중입니다...</p>
    </div>

    <div class="button-group">
      <button @click="goBack" class="back-button">뒤로가기</button>
      <button @click="saveUser" class="save-button">저장</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      userRoles: []  // 체크된 권한을 저장할 배열
    };
  },
  created() {
    const userId = this.$route.params.userId;
    this.fetchUser(userId);
  },
  methods: {
    fetchUser(userId) {
      const users = [
        { id: 1, name: '한수현', employeeNo: 1, position: '경영진', lastLogin: '2024-10-12', roles: ['경영진'] },
        { id: 2, name: '서희림', employeeNo: 2, position: '엔지니어', lastLogin: '2024-10-13', roles: ['엔지니어'] },
        { id: 3, name: '이규섭', employeeNo: 3, position: '엔지니어', lastLogin: '2024-10-14', roles: ['엔지니어'] },
        { id: 4, name: '김세진', employeeNo: 4, position: '모델관리자', lastLogin: '2024-10-15', roles: ['모델관리자'] }
      ];
      this.user = users.find(user => user.id === parseInt(userId));
      this.userRoles = this.user.roles;  // 기존 권한을 체크박스에 반영
    },
    goBack() {
      this.$router.push('/user-management/user-list');
    },
    saveUser() {
      console.log("저장된 사용자 권한:", this.userRoles);
      alert("사용자 권한이 저장되었습니다!");
    }
  }
};
</script>

<style scoped>
.user-detail {
  font-size: 1.4rem;
  padding: 3rem;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;  /* 전체 너비로 확장 */
  max-width: 900px;  /* 최대 너비를 900px로 확장 */
  height: auto;  /* 자동으로 높이 설정 */
  min-height: 600px;  /* 최소 높이를 설정하여 흰색 배경이 더 커지게 */
  margin: 3rem auto;  /* 화면에서 중앙에 위치 */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);  /* 박스 그림자를 추가하여 더 입체적으로 보이게 */
}

.top-nav {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
}

.top-nav a {
  margin-right: 2rem;
  text-decoration: none;
  color: #3f51b5;
  font-weight: bold;
}

.top-nav a.active-link {
  color: #303f9f;
  border-bottom: 2px solid #303f9f;
}

p label {
  margin-left: 1.5rem;
  display: inline-block;
}

.button-group {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
}

button {
  padding: 0.75rem 2rem;
  font-size: 1.2rem;
  background-color: #002c5f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #001f4f;
}
</style>
