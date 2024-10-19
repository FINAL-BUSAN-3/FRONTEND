<template>
  <div class="welding-pie">
    <h3 class="chart-title">용접 데이터 (월간)</h3>
    <canvas id="weldingMonthPieChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: "WeldingMonth",
  data() {
    return {
      chart: null,
      monthData: [75, 25]
    };
  },
  mounted() {
    this.renderChart(this.monthData);
  },
  methods: {
    renderChart(data) {
      if (this.chart) {
        this.chart.destroy();
      }
      const ctx = document.getElementById("weldingMonthPieChart").getContext("2d");
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
