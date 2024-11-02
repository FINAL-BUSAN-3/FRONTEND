<template>
  <div class="group-add-container">
    <h1>권한 그룹 추가</h1>
    <input type="text" v-model="group_name" placeholder="그룹 이름" class="input-field">
    <textarea v-model="description" placeholder="그룹 설명" class="input-field"></textarea>

    <div class="button-group">
      <button @click="goBack" class="back-button">뒤로가기</button>
      <button @click="addGroup" class="add-button">그룹 추가</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      group_name: "",
      description: ""
    };
  },
  methods: {
    async addGroup() {
      if (!this.group_name || !this.description) {
        alert("모든 필드를 채워주세요!");
        return;
      }

      const group = {
        group_name: this.group_name,
        description: this.description
      };

      try {
        const response = await axios.post('http://ec2-18-215-52-54.compute-1.amazonaws.com:8000/user-management/group-add', group);
        alert(response.data.message || "그룹이 성공적으로 추가되었습니다!");
        // 권한 추가 후 "권한 관리" 탭을 유지하기 위해 query 설정
        this.$router.push({ path: '/user-management', query: { tab: 'group' } });
      } catch (error) {
        console.error("Failed to add group:", error);
        alert("그룹 추가에 실패했습니다.");
      }
    },
    goBack() {
      // 뒤로가기를 눌러도 "권한 관리" 탭을 유지하도록 query 설정
      this.$router.push({ path: '/user-management', query: { tab: 'group' } });
      console.log("Navigating to /user-management with tab: group");
    }
  } // methods 종료
};
</script>

<style scoped>
.group-add-container {
  max-width: 700px;
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

.input-field {
  width: 90%;
  padding: 0.8rem;
  margin: 0.5rem auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.2rem;
  box-sizing: border-box;
}

textarea.input-field {
  height: 100px;
  resize: none;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px; /* 버튼 간 간격을 설정 */
  margin-top: 1.5rem;
}

.back-button {
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  background-color: #d0d1d1;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button {
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

.add-button:hover {
  background-color: #65bd66;
}
</style>
