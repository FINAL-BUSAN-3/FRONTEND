<template>
  <div class="user-management-page">
    <h2>사용자 통합 관리</h2>
    <!-- 상단 네비게이션 바 -->
    <nav class="top-nav">
      <button :class="{ active: currentView === 'user' }" @click="switchView('user')">사용자 관리</button>
      <button :class="{ active: currentView === 'group' }" @click="switchView('group')">권한 관리</button>
    </nav>

    <!-- 검색과 추가/삭제 버튼 -->
    <div class="action-container">
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search" />
        <button @click="searchItem">검색</button>
      </div>
      <!-- 오른쪽으로 붙어 있는 버튼 그룹 -->
      <div class="button-group">
        <button class="add-button" @click="goToAdd">추가</button>
        <button class="delete-button" @click="deleteSelectedItems">삭제</button>
      </div>
    </div>

    <!-- 사용자 목록 표 -->
    <div v-if="currentView === 'user'">
      <table class="user-table">
        <thead>
          <tr>
            <th><input type="checkbox" @change="toggleSelectAll('user', $event)" /></th>
            <th>이름</th>
            <th>사번</th>
            <th>권한</th>
            <th>최근 기록</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.employeeNo">
            <td>
              <input
                type="checkbox"
                :checked="selectedUsers.includes(user.employeeNo)"
                @change="toggleUserSelection(user.employeeNo)"
              />
            </td>
            <td @click="goToUserDetail(user.employeeNo)" class="clickable">{{ user.name }}</td>
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
            <th><input type="checkbox" @change="toggleSelectAll('group', $event)" /></th>
            <th>권한 이름</th>
            <th>권한 설명</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in filteredGroups" :key="group.id">
            <td>
              <input
                type="checkbox"
                :checked="selectedGroups.includes(group.id)"
                @change="toggleGroupSelection(group.id)"
              />
            </td>
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

export default {
  data() {
    return {
      currentView: 'user',
      searchQuery: '',
      users: [],
      groups: [],
      selectedUsers: [],
      selectedGroups: []
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
      if (this.currentView === view) return; // 현재 탭과 같다면 아무 동작 안 함
      this.searchQuery = ''; // 검색어 초기화
      this.currentView = view;

      // URL 쿼리를 필요한 경우에만 업데이트
      const newQuery = view === 'group' ? { tab: 'group' } : { tab: 'user' };
      if (this.$route.query.tab !== newQuery.tab) {
        this.$router.replace({ path: '/user-management', query: newQuery }); // replace를 사용해 URL을 덮어씀
      }

      // 데이터 로드
      if (view === 'group') {
        this.fetchGroupData();
      } else {
        this.fetchUserData();
      }
    },
    searchItem() {
      console.log('검색어:', this.searchQuery);
    },
    goToAdd() {
  console.log("추가 버튼 클릭됨");
  if (this.currentView === 'user') {
    this.$router.push({ path: '/user-management/user-add' });
  } else {
    // 권한 추가 후 "권한 관리" 탭을 유지하기 위해 query 설정
    this.$router.push({ path: '/user-management/group-add', query: { tab: 'group' } });
      }
    },
    goToUserDetail(employeeNo) {
      this.$router.push({ path: `/user-management/user-detail/${employeeNo}` });
    },
    async fetchUserData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/user-management/user-list');
        console.log("Fetched users:", response.data.employees);
        this.users = response.data.employees;
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    },
    async fetchGroupData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/user-management/group-list');
        console.log("Fetched groups:", response.data);
        this.groups = response.data.user_groups.map(group => ({
          id: group[0],
          group_name: group[1],
          description: group[2]
        }));
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      }
    },
    toggleUserSelection(employeeNo) {
      const index = this.selectedUsers.indexOf(employeeNo);
      if (index === -1) {
        this.selectedUsers.push(employeeNo);
      } else {
        this.selectedUsers.splice(index, 1);
      }
    },
    toggleGroupSelection(groupId) {
      const index = this.selectedGroups.indexOf(groupId);
      if (index === -1) {
        this.selectedGroups.push(groupId);
      } else {
        this.selectedGroups.splice(index, 1);
      }
    },
    toggleSelectAll(type, event) {
      if (type === 'user') {
        if (event.target.checked) {
          this.selectedUsers = this.filteredUsers.map(user => user.employeeNo);
        } else {
          this.selectedUsers = [];
        }
      } else if (type === 'group') {
        if (event.target.checked) {
          this.selectedGroups = this.filteredGroups.map(group => group.id);
        } else {
          this.selectedGroups = [];
        }
      }
    },
    async deleteSelectedItems() {
      if (this.currentView === 'user') {
        const userIdsToDelete = [...this.selectedUsers];
        for (const employeeNo of userIdsToDelete) {
          try {
            await this.deleteUser(employeeNo);
          } catch (error) {
            console.error(`Failed to delete user ${employeeNo}:`, error);
          }
        }
        await this.fetchUserData(); // 삭제 후 사용자 데이터 새로 고침
      } else if (this.currentView === 'group') {
        const groupIdsToDelete = [...this.selectedGroups];
        for (const groupId of groupIdsToDelete) {
          try {
            await this.deleteGroup(groupId);
          } catch (error) {
            console.error(`Failed to delete group ${groupId}:`, error);
          }
        }
        await this.fetchGroupData(); // 삭제 후 그룹 데이터 새로 고침
      } else {
        alert("삭제할 항목을 선택하세요.");
      }
      this.selectedUsers = [];
      this.selectedGroups = [];
    },
    async deleteUser(employeeNo) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/user-management/user-delete/${employeeNo}`);
        console.log(response.data.message || "사용자 삭제 성공");
      } catch (error) {
        console.error(`Failed to delete user ${employeeNo}:`, error);
        alert(`사용자 삭제 실패: ${error.message}`);
      }
    },
    async deleteGroup(groupId) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/user-management/group-delete/${groupId}`);
        console.log(response.data.message || "그룹 삭제 성공");
      } catch (error) {
        console.error(`Failed to delete group ${groupId}:`, error);
        alert(`그룹 삭제 실패: ${error.message}`);
      }
    }
  },
  async created() {
    const initialTab = this.$route.query.tab || 'user';
    this.currentView = initialTab;
    if (initialTab === 'group') {
      await this.fetchGroupData();
    } else {
      await this.fetchUserData();
    }
  },
  watch: {
    '$route.query.tab': {
      handler(newTab) {
        this.currentView = newTab || 'user';
        if (newTab === 'group') {
          this.fetchGroupData();
        } else {
          this.fetchUserData();
        }
      },
      immediate: true
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

.button-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

input[type="text"] {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
}

input[type="checkbox"] {
  width: 15px;
  height: 15px;
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
  background-color: #31B404;
}

.add-button:hover {
  background-color: #388e3c;
}

.delete-button {
  background-color: #DF0101;
}

.delete-button:hover {
  background-color: #d32f2f;
}

/* 체크박스가 있는 셀의 크기 줄이기 */
.user-table th:first-child, .user-table td:first-child,
.group-table th:first-child, .group-table td:first-child {
  width: 40px; /* 체크박스 셀 너비 */
  text-align: center; /* 가운데 정렬 */
}

.user-table, .group-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1.2rem;
  text-align: left;
  background-color: #FAFAFA;
}

.user-table thead tr, .group-table thead tr {
  background-color: #e4e5eb;
}

.user-table th, .user-table td, .group-table th, .group-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.user-table tbody tr:hover, .group-table tbody tr:hover {
  background-color: #f1f1f1;
}

/* 사용자 이름 클릭 가능하도록 스타일 추가 */
.user-table .clickable {
  cursor: pointer;
  color: #3f51b5;
  text-decoration: underline;
}


</style>