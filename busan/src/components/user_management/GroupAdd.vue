<template>
  <div class="group-add">
    <h2>권한 추가</h2>

    <div class="form-container">
      <input type="text" v-model="groupName" placeholder="권한 이름" />
      <input type="text" v-model="groupDescription" placeholder="권한 설명" />
      <button @click="addGroup">권한 추가</button>
    </div>

    <!-- 뒤로가기 버튼 -->
    <button @click="goBack" class="back-button">뒤로가기</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      groupName: '',
      groupDescription: ''
    };
  },
  methods: {
    async addGroup() {
      const group = {
        groupName: this.groupName,
        groupDescription: this.groupDescription
      };

      try {
        const response = await axios.post('http://127.0.0.1:8000/user-management/group-add', group);
        alert(response.data.message || "권한이 성공적으로 추가되었습니다.");
        this.$router.push({ path: '/user-management/group-list' });
      } catch (error) {
        console.error("Failed to add group:", error);
        alert("권한 추가에 실패했습니다.");
      }
    },
    goBack() {
      this.$router.go(-1);  // 뒤로가기 (이전 페이지로)
    }
  }
};
</script>
