<template>
  <div>
    <h1>WeldingSelect.vue</h1>
    <p v-if="lastUpdate">Last update: {{ lastUpdate }}</p>
    <table>
      <thead>
        <tr>
          <th>Prediction</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="predictionData !== null">
          <td>{{ predictionData }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WeldingSelect',
  data() {
    return {
      predictionData: null, // 예측값을 저장할 변수
      lastUpdate: null      // 마지막 업데이트 시간을 표시할 변수
    };
  },
  async created() {
    await this.fetchPrediction(); // 컴포넌트가 생성될 때 첫 예측 데이터를 가져옵니다.
    setInterval(this.fetchPrediction, 5000); // 5초마다 예측 데이터를 자동 갱신
  },
  methods: {
    async fetchPrediction() {
      try {
        const response = await axios.get('http://localhost:8000/engineering/realtime-welding/select');
        this.predictionData = response.data.welding_prediction; // 올바른 키로 예측값 저장
        this.lastUpdate = new Date().toLocaleTimeString(); // 마지막 업데이트 시간 저장
        console.log('Prediction updated:', this.predictionData); // 데이터 확인용 로그
      } catch (error) {
        console.error('Failed to fetch prediction data:', error);
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
  text-align: center;
}
th {
  background-color: #f2f2f2;
}
</style>
