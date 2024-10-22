<template>
  <div class="user-management-page">
    <h2>사용자 통합 관리</h2>
    <!-- 상단 네비게이션 바 -->
    <nav class="top-nav">
      <button :class="{ active: currentView === 'user' }" @click="switchView('user')">사용자 관리</button>
      <button :class="{ active: currentView === 'group' }" @click="switchView('group')">권한 관리</button>
    </nav>

    <!-- 검색과 추가 버튼 -->
    <div class="action-container">
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search" />
        <button @click="searchItem">검색</button>
      </div>
      <button class="add-button" @click="goToAdd">추가</button>
    </div>

    <!-- 사용자 목록 표 -->
    <div v-if="currentView === 'user'">
      <table class="user-table">
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
            <td>{{ user.name }}</td>
            <td>{{ user.employeeNo }}</td>
            <td>{{ user.position }}</td>
            <td>{{ user.lastLogin }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 권한 목록 표 -->
    <div v-if="currentView === 'group'">
      <table class="group-table">
        <thead>
          <tr>
            <th>권한 이름</th>
            <th>권한 설명</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in filteredGroups" :key="group.id">
            <td>{{ group.group_name }}</td>
            <td>{{ group.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import UserList from '@/components/user_management/UserList.vue';
// import GroupList from '@/components/user_management/GroupList.vue';

export default {
  data() {
    return {
      currentView: 'user',
      searchQuery: '',
      users: [], // UserList 데이터를 저장할 배열
      groups: [] // GroupList 데이터를 저장할 배열
    };
  },
  computed: {
    filteredUsers() {
      if (this.searchQuery) {
        return this.users.filter((user) =>
          (user.name && user.name.includes(this.searchQuery)) ||
          (user.employeeNo && user.employeeNo.toString().includes(this.searchQuery)) ||
          (user.role && user.role.includes(this.searchQuery))
        );
      }
      return this.users;
    },
    filteredGroups() {
  if (this.searchQuery) {
    return this.groups.filter((group) =>
      (group.group_name && group.group_name.includes(this.searchQuery)) ||
      (group.description && group.description.includes(this.searchQuery))
    );
  }
  return this.groups;
}

  },
  methods: {
  switchView(view) {
    this.searchQuery = ''; // 검색어 초기화
    this.currentView = view;
    if (view === 'group') {
      this.fetchGroupData(); // 권한 관리 뷰로 전환할 때 권한 데이터 가져오기
    } else {
      this.fetchUserData(); // 사용자 관리 뷰로 전환할 때 사용자 데이터 가져오기
    }
  },
  searchItem() {
    console.log('검색어:', this.searchQuery);
  },
  goToAdd() {
    if (this.currentView === 'user') {
      this.$router.push({ path: '/user-management/user-add' });
    } else {
      this.$router.push({ path: '/user-management/group-add' });
    }
  },
  async fetchUserData() {
    try {
      const response = await UserList.methods.fetchUserList.call(this);
      this.users = response.data.employees;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  },
  async fetchGroupData() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/user-management/group-list');
      console.log("Fetched groups:", response.data.user_groups); // 데이터 로깅
      // 데이터 필드 이름 맞추기
      this.groups = response.data.user_groups.map(group => ({
        id: group[0],              // ID
        group_name: group[1],      // 권한 이름
        description: group[2]      // 권한 설명
      }));
    } catch (error) {
      console.error("Failed to fetch group data:", error);
    }
  }
},

  async created() {
    await this.fetchUserData(); // 컴포넌트가 생성될 때 기본 사용자 데이터를 불러옴
  },
  watch: {
    '$route'(to) {
      if (to.path === '/user-management') {
        this.refreshUserList(); // 사용자 목록 페이지로 돌아올 때 데이터 새로고침
      }
      if (to.path === '/user-management') {
        this.fetchGroupData(); // 권한 목록 페이지로 돌아올 때 데이터 새로고침
      }
    }
  }
};
</script>


<style scoped>
.user-management-page {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
}

.top-nav {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
}

.top-nav button {
  margin-right: 1rem;
  font-size: 1.2rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: #3f51b5;
}

.top-nav .active {
  color: #303f9f;
  border-bottom: 2px solid #303f9f;
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
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
}

button {
  padding: 0.75rem 2rem;
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

.add-button {
  background-color: #4caf50;
}

.add-button:hover {
  background-color: #388e3c;
}

/* 통합된 스타일 */
.user-add-container, .group-add {
  max-width: 600px;
  margin: 80px auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
}

.input-field, .form-container input[type="text"] {
  display: block;
  width: 90%;
  padding: 0.8rem;
  margin: 1rem auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.1rem;
  box-sizing: border-box;
}

.placeholder-selected {
  color: #555;
}

.back-button {
  margin-top: 1rem;
  background-color: #3f51b5;
}

.back-button:hover {
  background-color: #303f9f;
}

/* 표 스타일 */
.user-table, .group-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1.2rem;
  text-align: left;
}

.user-table thead tr, .group-table thead tr {
  background-color: #f2f2f2;
}

.user-table th, .user-table td, .group-table th, .group-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.user-table tbody tr:hover, .group-table tbody tr:hover {
  background-color: #f1f1f1;
}
</style>
