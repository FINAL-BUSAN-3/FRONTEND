<template>
  <div class="user-detail card">
    <h1>개인정보</h1>
    <hr class="divider"/>

    <div v-if="user">
      <!-- 이름과 사번을 한 줄로 배치 -->
      <div class="user-info-inline">
        <p><strong>이름:</strong> {{ user.name }}</p>
        <p><strong>사번:</strong> {{ user.employeeNo }}</p>
      </div>

      <div v-if="availableRoles.length">
        <!-- 권한: 옆에 체크박스 배치 -->
        <p class="roles-inline"><strong>권한:</strong>
          <span class="role-checkbox">
            <label v-for="role in availableRoles" :key="role">
              <input type="checkbox" v-model="userRoles" :value="role" /> {{ role }}
            </label>
          </span>
        </p>
      </div>
      <div v-else>
        <p>권한 목록을 불러오는 중입니다...</p>
      </div>
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
      userRoles: [],
      availableRoles: []  // DB에서 가져온 권한 목록 저장
    };
  },
  created() {
    const userId = this.$route.params.userId;
    this.fetchUser(userId);
    this.fetchRoles();  // 권한 목록 가져오기
  },
  methods: {
    async fetchUser(userId) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/user-management/user-detail/${userId}`);
        this.user = response.data;
        this.userRoles = this.user.roles || [];
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        this.user = null;
      }
    },
    async fetchRoles() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/user-management/group-list');
        if (response.data && Array.isArray(response.data.user_groups)) {
          this.availableRoles = response.data.user_groups.map(group => group[1]);
        } else {
          console.error("Invalid roles data structure:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    },
    goBack() {
      this.$router.push('/user-management');
    },
    async saveUser() {
      try {
        const updatedUser = {
          id: this.user.employeeNo,
          roles: this.userRoles
        };
        await axios.put(`http://127.0.0.1:8000/user-management/user-detail/${this.user.employeeNo}`, updatedUser);
        alert("사용자 권한이 성공적으로 저장되었습니다!");
        this.$router.push('/user-management');
      } catch (error) {
        console.error("Failed to save user data:", error);
        alert("사용자 권한 저장에 실패했습니다.");
      }
    }
  }
};
</script>

<style scoped>
.user-detail {
  max-width: 600px;
  min-height: 250px;
  margin: 80px auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f5f5f5;
  text-align: center;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.user-info-inline {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
}

.roles-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.role-checkbox label {
  margin-right: 15px;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 5px;
}

.back-button, .save-button {
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover, .save-button:hover {
  background-color: #388e3c;
}

.divider {
  border: none;
  border-top: 1px solid #ccc;
  margin: 2rem 0;
}
</style>