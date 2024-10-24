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
            <th><input type="checkbox" @change="toggleSelectAll('user', $event)" /></th> <!-- 전체 선택 체크박스 -->
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
            <th><input type="checkbox" @change="toggleSelectAll('group', $event)" /></th> <!-- 전체 선택 체크박스 -->
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
      users: [], // UserList 데이터를 저장할 배열
      groups: [], // GroupList 데이터를 저장할 배열
      selectedUsers: [], // 선택된 사용자 ID를 배열로 관리
      selectedGroups: [] // 선택된 그룹 ID를 배열로 관리
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
        console.log("Fetched groups:", response.data); // 데이터 응답 구조를 확인합니다.
        this.groups = response.data.user_groups.map(group => ({
          id: group[0],              // ID
          group_name: group[1],      // 권한 이름
          description: group[2]      // 권한 설명
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
        const userIdsToDelete = this.selectedUsers;
        for (const employeeNo of userIdsToDelete) {
          await this.deleteUser(employeeNo);
        }
        await this.fetchUserData();
        if (userIdsToDelete.length > 0) {
          alert("선택한 사용자가 성공적으로 삭제되었습니다!"); // 삭제 완료 메시지 추가
        }
      } else if (this.currentView === 'group') {
        const groupIdsToDelete = this.selectedGroups;
        for (const groupId of groupIdsToDelete) {
          await this.deleteGroup(groupId);
        }
        await this.fetchGroupData();
        if (groupIdsToDelete.length > 0) {
          alert("선택한 권한 그룹이 성공적으로 삭제되었습니다!"); // 삭제 완료 메시지 추가
        }
      } else {
        alert("삭제할 항목을 선택하세요.");
      }
      this.selectedUsers = [];
      this.selectedGroups = [];
    },
    async deleteUser(employeeNo) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/user-management/user-delete/${employeeNo}`);
        console.log(response.data.message);
      } catch (error) {
        console.error(`Failed to delete user ${employeeNo}:`, error);
        alert("사용자 삭제에 실패했습니다.");
      }
    },
    async deleteGroup(groupId) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/user-management/group-delete/${groupId}`);
        console.log(response.data.message);
      } catch (error) {
        console.error(`Failed to delete group ${groupId}:`, error);
        alert("권한 그룹 삭제에 실패했습니다.");
      }
    }
  },
  async created() {
    const tab = this.$route.query.tab;
    this.currentView = tab === 'group' ? 'group' : 'user';

    await this.fetchUserData(); // 컴포넌트가 생성될 때 기본 사용자 데이터를 불러옴
    await this.fetchGroupData(); // 그룹 데이터를 함께 불러옴
  },
  watch: {
    '$route'(to) {
      const tab = to.query.tab;
      this.currentView = tab === 'group' ? 'group' : 'user';

      if (this.currentView === 'user') {
        this.fetchUserData();
      } else {
        this.fetchGroupData();
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
  background-color: #4caf50;
}

.add-button:hover {
  background-color: #388e3c;
}

.delete-button {
  background-color: #f44336;
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

/* 사용자 이름 클릭 가능하도록 스타일 추가 */
.user-table .clickable {
  cursor: pointer;
  color: #3f51b5;
  text-decoration: underline;
}


</style>