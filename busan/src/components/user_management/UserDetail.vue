<template>
  <div>
    <h1>UserDetail.vue</h1>
  </div>
  <div class="user-detail">
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
import axios from 'axios';

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
    async fetchUser(userId) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/user-management/user-detail/${userId}`);
        console.log("Fetched user:", response.data);  // 데이터 확인을 위한 로깅
        this.user = response.data;
        this.userRoles = [this.user.position];
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        this.user = null;
      }
    },
    goBack() {
      this.$router.push('/user-management/user-list');
    },
    async saveUser() {
      try {
        const updatedUser = {
          id: this.user.employeeNo,
          position: this.userRoles[0]  // 체크된 권한 하나만 저장
        };
        await axios.put(`http://127.0.0.1:8000/user-management/user-detail/${this.user.employeeNo}`, updatedUser);
        alert("사용자 권한이 성공적으로 저장되었습니다!");
      } catch (error) {
        console.error("Failed to save user data:", error);
        alert("사용자 권한 저장에 실패했습니다.");
      }
    }
  }
};
</script>
