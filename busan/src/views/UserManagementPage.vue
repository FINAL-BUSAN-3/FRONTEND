<template>
  <div class="user-list">
    <h2>사용자 관리</h2>
    <div class="action-container">
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="사용자 검색">
        <button @click="searchUser">검색</button>
      </div>
      <button class="add-user-button" @click="goToAddUser">사용자 추가</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>사번</th>
          <th>권한</th>
          <th>최근 기록</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>
            <router-link :to="`/user-management/user-detail/${user.id}`">{{ user.name }}</router-link>
          </td>
          <td>{{ user.employeeNo }}</td>
          <td>{{ user.position }}</td>
          <td>{{ user.lastLogin }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserList from '../components/user_management/UserList.vue';

export default {
  data() {
    return {
      searchQuery: '',
      users: UserList.users // 이제 {} 없이 불러올 수 있습니다.
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user =>
        user.name.includes(this.searchQuery)
      );
    }
  },
  methods: {
    // searchUser() {
      // alert(`검색한 사용자: ${this.searchQuery}`);
    //},
    goToAddUser() {
      this.$router.push({ path: '/user-management/user-add' });
    }
  }
};
</script>


<style scoped>
.user-list {
  font-size: 1.4rem;
}

.action-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.search-container {
  display: flex;
  align-items: center;
}

input[type="text"] {
  padding: 0.5rem;
  font-size: 1rem;
  margin-right: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #303f9f;
}

.add-user-button {
  background-color: #a36b4f;
}

.add-user-button:hover {
  background-color: #e4dcd3;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f6f3f2;
}

router-link {
  color: #3f51b5;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>
