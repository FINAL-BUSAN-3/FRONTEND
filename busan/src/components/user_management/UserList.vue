<template>
  <div>
    <h1>UserList</h1>
    <ul>
      <!-- 받아온 users 데이터를 리스트로 표시 -->
      <li v-for="user in users" :key="user.id">
        이름: {{ user.name }}, 사번: {{ user.employeeNo }}, 권한: {{ user.role }}, 최근 기록: {{ user.lastLogin }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [] // FastAPI로부터 받아온 데이터를 저장할 배열
    };
  },
  async created() {
    await this.fetchUserList(); // 컴포넌트가 생성될 때 데이터를 불러옴
  },
  methods: {
    async fetchUserList() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/user-management/user-list');
        console.log("Fetched users:", response.data.employees); // 데이터 로깅
        this.users = response.data.employees; // 데이터를 users에 저장
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }
  }
};
</script>