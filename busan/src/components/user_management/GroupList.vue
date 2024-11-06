<template>
  <div>
    <h1>GroupList</h1>
    <table class="group-table">
      <thead>
        <tr>
          <th>권한 이름</th>
          <th>권한 설명</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groups" :key="group.id">
          <td>{{ group.group_name }}</td>
          <td>{{ group.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      groups: [] // FastAPI로부터 받아온 데이터를 저장할 배열
    };
  },
  async created() {
    await this.fetchGroupList(); // 컴포넌트가 생성될 때 데이터를 불러옴
  },
  methods: {
    async fetchGroupList() {
  try {
    const response = await axios.get('http://localhost:8000/user-management/group-list');
    console.log("Fetched groups:", response.data); // 데이터 응답 구조를 확인합니다.
    // 데이터 필드 이름 맞추기
    this.groups = response.data.map(group => ({
      id: group[0],              // ID
      group_name: group[1],      // 권한 이름
      description: group[2]      // 권한 설명
    }));
  } catch (error) {
    console.error('Failed to fetch groups:', error);
  }
}
  }
};
</script>