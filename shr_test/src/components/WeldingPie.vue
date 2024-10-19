<template>
  <div class="welding-pie">
    <h3 class="chart-title">용접 데이터</h3>
    <div class="button-group">
      <button @click="updateChart('day')">일간</button>
      <button @click="updateChart('week')">주간</button>
      <button @click="updateChart('month')">월간</button>
    </div>
    <canvas id="weldingPieChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: "WeldingPie",
  data() {
    return {
      chart: null,
      chartData: {
        day: [80, 20],
        week: [70, 30],
        month: [75, 25]
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData.day);
  },
  methods: {
    renderChart(data) {
      if (this.chart) {
        this.chart.destroy();
      }
      const ctx = document.getElementById("weldingPieChart").getContext("2d");
      this.chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["양품", "불량품"],
          datasets: [{
            data: data,
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
    },
    updateChart(period) {
      const data = this.chartData[period];
      this.renderChart(data);
    }
  }
};
</script>

<style scoped>
.chart-title {
  font-size: 1.5em; /* 제목 폰트 크기 증가 */
  text-align: center;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.button-group button {
  padding: 10px 20px; /* 크기 증가 */
  font-size: 1.1em; /* 폰트 크기 증가 */
  margin: 0 5px;
  background-color: #eaeaea;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
</style>