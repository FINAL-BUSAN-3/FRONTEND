<template>
  <div class="group-add-container">
    <h1>권한 그룹 추가</h1>
    <input type="text" v-model="group_name" placeholder="그룹 이름" class="input-field">
    <textarea v-model="description" placeholder="그룹 설명" class="input-field"></textarea>

    <button @click="addGroup" class="add-button">그룹 추가</button>
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
        group_name: this.group_name,  // 수정: `this.groupName` -> `this.group_name`
        description: this.description
      };

      try {
        const response = await axios.post('http://127.0.0.1:8000/user-management/group-add', group);
        alert(response.data.message || "그룹이 성공적으로 추가되었습니다!");
        this.$router.push({ path: '/user-management/group-list' });
      } catch (error) {
        console.error("Failed to add group:", error);
        alert("그룹 추가에 실패했습니다.");
      }
    }
  }
};
</script>
s