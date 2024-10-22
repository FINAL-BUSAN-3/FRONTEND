<template>
  <div>
    <line-chart :chart-data="chartData" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default {
  components: {
    LineChart: {
      extends: Line,
      props: ['chartData'],
      mounted() {
        this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false });
      },
    },
  },
  data() {
    return {
      chartData: {
        labels: [], // 시계열 데이터
        datasets: [
          {
            label: '주가 (원)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            data: [], // 주가 데이터
          },
        ],
      },
    };
  },
  methods: {
    async fetchStockHistory() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/stock-history/005380'); // 현대차 주식 코드
        const data = response.data;
        this.chartData.labels = data.map(item => item.time);
        this.chartData.datasets[0].data = data.map(item => item.price);
      } catch (error) {
        console.error("주가 데이터를 불러오는 데 실패했습니다:", error);
      }
    },
  },
  mounted() {
    this.fetchStockHistory();
    setInterval(this.fetchStockHistory, 6000000000000); // 10분마다 데이터 갱신(600000)
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
  width: 800px;
}
</style>