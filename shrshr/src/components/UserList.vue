<template>
  <div class="user-preview">
    <h2>Fetched Users Preview</h2>
    <!-- 데이터가 없는 경우에 대한 예외 처리 -->
    <div v-if="UserList.length === 0">
      <p>No users fetched. Please check the server or reload the page.</p>
    </div>
    <ul v-else>
      <li v-for="(user, index) in UserList" :key="index">
        이름: {{ user.name }}, 사번: {{ user.employeeNo }}, 권한: {{ user.position }}, 최근 기록: {{ user.lastLogin }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      UserList: [] // FastAPI로부터 받아온 데이터를 저장할 배열
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/user-management/user-list');

        // 서버 응답 데이터 로깅
        console.log("Fetched users:", response.data.employees);

        // 응답 데이터를 UserList에 저장
        this.UserList = response.data.employees;

        // 데이터가 비어 있는 경우 확인
        if (this.UserList.length === 0) {
          console.warn("No users fetched. Check server response.");
        }

      } catch (error) {
        console.error('Failed to fetch users:', error);

        // 네트워크 요청에 대한 상세한 오류 정보 출력
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      }
    }
  },
  mounted() {
    console.log("UserList component mounted.");
    this.fetchUsers(); // 컴포넌트가 마운트될 때 데이터를 불러옴
  }
};
</script>

<style scoped>
.user-preview {
  font-size: 1.2rem;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.user-preview h2 {
  margin-bottom: 10px;
}

.user-preview ul {
  list-style-type: none;
  padding: 0;
}

.user-preview li {
  margin-bottom: 10px;
}

.user-preview p {
  font-size: 1rem;
  color: red;
  text-align: center;
}
</style>
