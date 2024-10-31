<template>
  <div>
    <h1>RealtimeWeldingInsert.vue</h1>
    <p v-if="lastUpdate">Last update: {{ lastUpdate }}</p>
    <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>Machine Name</th>
          <th>Item No</th>
          <th>Working Time</th>
          <th>Thickness 1 (mm)</th>
          <th>Thickness 2 (mm)</th>
          <th>Welding Force Bar</th>
          <th>Welding Current (ka)</th>
          <th>Weld Voltage (v)</th>
          <th>Weld Time (ms)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in welding_raw_data" :key="item.idx">
          <td>{{ index + 1 }}</td>
          <td>{{ item.machine_name }}</td>
          <td>{{ item.item_no }}</td>
          <td>{{ item.working_time }}</td>
          <td>{{ item.thickness_1_mm }}</td> 
          <td>{{ item.thickness_2_mm }}</td>
          <td>{{ item.welding_force_bar }}</td>
          <td>{{ item.welding_current_ka }}</td>
          <td>{{ item.weld_voltage_v }}</td>
          <td>{{ item.weld_time_ms }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RealtimeWeldingInsertComponents',
  data() {
    return {
      welding_raw_data: [], // FastAPI로부터 받아온 데이터를 저장할 배열
      lastUpdate: null // 마지막 업데이트 시간을 저장할 변수
    };
  },
  async created() {
    await this.fetchRealtimeWeldingInsert(); // 컴포넌트가 생성될 때 첫 데이터를 가져옴
    setInterval(this.fetchRealtimeWeldingInsert, 5000); // 5초마다 데이터를 자동 갱신
  },
  methods: {
    async fetchRealtimeWeldingInsert() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/engineering/realtime-welding/insert');
        this.welding_raw_data = response.data.welding_raw_data; // 데이터를 welding_raw_data에 저장
        this.lastUpdate = new Date().toLocaleTimeString(); // 마지막 업데이트 시간 저장
        console.log('Welding data updated:', this.welding_raw_data); // 데이터 확인용 로그
      } catch (error) {
        console.error('Failed to fetch welding_raw_data:', error);
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
