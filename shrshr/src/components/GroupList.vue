<template>
  <div class="group-list">
    <h2>권한 관리</h2>

    <!-- 상단 네비게이션 바 -->
    <nav class="top-nav">
      <button @click="goBack" class="nav-button">개인정보</button>
      <router-link to="/user-management/group-list" class="active">권한 관리</router-link>
    </nav>

    <!-- 그룹 검색 및 권한 추가 버튼 -->
    <div class="action-container">
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search" />
        <button @click="searchGroup">검색</button>
      </div>
      <button class="add-group-button" @click="goToAddGroup">권한 추가</button>
    </div>

    <!-- 권한 리스트 테이블 -->
    <table>
      <thead>
        <tr>
          <th>권한 이름</th>
          <th>권한 설명</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in filteredGroups" :key="group.name">
          <td>{{ group.name }}</td>
          <td>{{ group.description }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 처음으로 버튼 -->
    <div class="button-container">
      <button class="home-button" @click="goToHome">처음으로</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      groups: [
        { name: '경영진', description: '회사의 주요 의사 결정 담당' },
        { name: '엔지니어', description: '기술 개발 및 유지보수' },
        { name: '모델 관리자', description: '모델 관련 작업 관리' },
      ]
    };
  },
  computed: {
    filteredGroups() {
      return this.groups.filter(group =>
        group.name.includes(this.searchQuery) || group.description.includes(this.searchQuery)
      );
    }
  },
  methods: {
    searchGroup() {
      console.log('검색어:', this.searchQuery);
    },
    goToAddGroup() {
      this.$router.push({ path: '/user-management/group-add' });
    },
    goBack() {
      this.$router.go(-1);  // 이전 페이지로 돌아가기
    },
    goToHome() {
      // '처음으로' 버튼 클릭 시 경로로 이동
      window.location.href = 'http://localhost:8080/user-management/user-list';
    }
  }
};
</script>

<style scoped>
.group-list {
  font-size: 1.4rem;
  padding: 3rem;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  max-width: 900px;
  height: auto;
  min-height: 600px;
  margin: 3rem auto;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.top-nav {
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
}

.top-nav .nav-button, .top-nav a {
  margin-right: 2rem;
  font-size: 1.2rem;
  text-decoration: none;
  color: #3f51b5;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
}

.top-nav .nav-button:hover, .top-nav a:hover {
  text-decoration: underline;
}

.top-nav a.active {
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
  background-color: #002c5f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #001f4f;
}

.add-group-button {
  background-color: #4caf50;
}

.add-group-button:hover {
  background-color: #388e3c;
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
  background-color: #f4f4f4;
}

/* 처음으로 버튼 스타일 */
.button-container {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.home-button {
  padding: 0.75rem 2rem;
  font-size: 1.2rem;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.home-button:hover {
  background-color: #303f9f;
}
</style>
