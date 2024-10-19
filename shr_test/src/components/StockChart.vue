<template>
  <div class="chart-container">
    <canvas id="stockChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  data() {
    return {
      stockLabels: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
      stockData: [150, 155, 160, 158, 162, 160] // 샘플 주가 데이터
    };
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      new Chart(document.getElementById('stockChart'), {
        type: 'line',
        data: {
          labels: this.stockLabels,
          datasets: [{
            label: '주가',
            data: this.stockData,
            borderColor: '#3e95cd',
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // 차트 비율 고정 해제
          scales: {
            x: { title: { display: true, text: '시간' }},
            y: { title: { display: true, text: '가격 (₩)' }}
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.chart-container {
  width: 300px; /* 차트 크기 통일 */
  height: 300px; /* 차트 크기 통일 */
  margin: 10px;
}
</style>
