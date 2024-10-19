<template>
  <div class="press-pie">
    <h3 class="chart-title">프레스 데이터 (일간)</h3>
    <div class="button-group">
      <button @click="$router.push('/press-day')">일간</button>
      <button @click="$router.push('/press-week')">주간</button>
      <button @click="$router.push('/press-month')">월간</button>
    </div>
    <canvas id="pressDayChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: "PressDay",
  data() {
    return {
      chart: null,
      chartData: [85, 15] // 일간 데이터
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById("pressDayChart").getContext("2d");
      this.chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["양품", "불량품"],
          datasets: [{
            data: this.chartData,
            backgroundColor: ["#4CAF50", "#F44336"]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.chart-title {
  font-size: 1.5em;
  text-align: center;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.button-group button {
  padding: 10px 20px;
  font-size: 1.1em;
  margin: 0 5px;
  background-color: #eaeaea;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
</style>
