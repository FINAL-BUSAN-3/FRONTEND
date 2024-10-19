<template>
  <div class="welding-pie">
    <h3 class="chart-title">용접 데이터 (주간)</h3>
    <canvas id="weldingWeekPieChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: "WeldingWeek",
  data() {
    return {
      chart: null,
      weekData: [70, 30]
    };
  },
  mounted() {
    this.renderChart(this.weekData);
  },
  methods: {
    renderChart(data) {
      if (this.chart) {
        this.chart.destroy();
      }
      const ctx = document.getElementById("weldingWeekPieChart").getContext("2d");
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
    }
  }
};
</script>

<style scoped>
.chart-title {
  font-size: 1.5em;
  text-align: center;
}
</style>
