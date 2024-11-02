<template>
  <div>
    <h1>UserList</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        이름: {{ user.name }}, 사번: {{ user.employeeNo }}, 권한: {{ user.position }},
        최근 기록:
        <span v-if="user.lastLogin && user.lastLogin !== '1970-01-01T00:00:00.000Z'">
  {{ formatDate(user.lastLogin) }}
</span>
<span v-else>최근 기록이 없음</span>


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
        console.log("Fetched users:", response.data.employees);
        this.users = response.data.employees.map(user => ({
          ...user,
          lastLogin: user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '최근 기록이 없음' // null이면 '최근 기록이 없음'으로 설정
}));
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    }
  }
};
</script>
