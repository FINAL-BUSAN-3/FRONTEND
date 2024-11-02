<template>
  <div class="user-detail card">
    <h1>개인정보</h1>
    <hr class="divider"/>

    <div v-if="user">
      <div class="user-info-inline">
        <p><strong>이름:</strong> {{ user.name }}</p>
        <p><strong>사번:</strong> {{ user.employeeNo }}</p>
      </div>

      <div v-if="availableRoles.length">
        <p class="roles-inline"><strong>권한:</strong>
          <span class="role-radio">
            <label v-for="role in availableRoles" :key="role">
              <!-- 라디오 버튼으로 변경하여 한 가지 권한만 선택 가능 -->
              <input type="radio" v-model="userRole" :value="role" /> {{ role }}
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
      userRole: '', // 하나의 선택된 권한을 저장할 변수
      availableRoles: [] // 전체 권한 목록
    };
  },
  async created() {
    const userId = this.$route.params.userId;
    await this.fetchRoles(); // 권한 목록을 먼저 불러오고
    await this.fetchUser(userId); // 사용자 정보를 불러와 권한 초기화
  },
  methods: {
    async fetchUser(userId) {
      try {
        const response = await axios.get(`http://ec2-18-215-52-54.compute-1.amazonaws.com:8000/user-management/user-detail/${userId}`);
        this.user = response.data;
        // 서버에서 가져온 권한을 설정 (단일 권한만 선택할 수 있도록)
        this.userRole = this.user.position || ''; // 기존 권한을 userRole에 설정
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        this.user = null;
      }
    },
    async fetchRoles() {
      try {
        const response = await axios.get('http://ec2-18-215-52-54.compute-1.amazonaws.com:8000/user-management/group-list');
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
          position: this.userRole // 선택된 단일 권한을 서버로 전송
        };
        await axios.put(`http://ec2-18-215-52-54.compute-1.amazonaws.com:8000/user-management/user-detail/${this.user.employeeNo}`, updatedUser);
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

.role-radio label {
  margin-right: 15px;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 5px;
}

.back-button{
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  background-color: #d0d1d1;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button {
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  background-color: #79c77c;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #9b9b9b;
}

.save-button:hover {
  background-color: #65bd66;
}

.divider {
  border: none;
  border-top: 1px solid #ccc;
  margin: 2rem 0;
}
</style>
