<template>
  <div>
    <h1>RealtimePressInsert.vue</h1>
    <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>Machine Name</th>
          <th>Item No</th>
          <th>Working Time</th>
          <th>Press Time (ms)</th>
          <th>Pressure 1</th>
          <th>Pressure 2</th>
          <th>Pressure 5</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in press_raw_data" :key="item.idx">
          <td>{{ index + 1 }}</td>
          <td>{{ item.machine_name }}</td>
          <td>{{ item.item_no }}</td>
          <td>{{ item.working_time }}</td>
          <td>{{ item.press_time_ms }}</td> 
          <td>{{ item.pressure_1 }}</td>
          <td>{{ item.pressure_2 }}</td>
          <td>{{ item.pressure_5 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RealtimePressInsertComponents',
  data() {
    return {
      press_raw_data: [] // FastAPI로부터 받아온 데이터를 저장할 배열
    };
  },
  async created() {
    await this.fetchRealtimePressInsert(); // 컴포넌트가 생성될 때 데이터를 불러옴
    setInterval(this.fetchRealtimePressInsert, 5000); // 5초마다 데이터를 가져옴
  },
  methods: {
    async fetchRealtimePressInsert() {
      try {
        const response = await axios.get('http://ec2-18-215-52-54.compute-1.amazonaws.com:8000/engineering/realtime-press/insert');
        this.press_raw_data = response.data.press_raw_data; // 데이터를 press_raw_data에 저장
        this.$emit('update:press_raw_data', this.press_raw_data); // 부모 컴포넌트에 데이터 전달
      } catch (error) {
        console.error('Failed to fetch press_raw_data:', error);
      }
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
</style>
