<template>
  <div id="yearly-sales-chart">
    <canvas id="salesChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  data() {
    return {
      salesLabels: ["2020", "2021", "2022", "2023"],
      salesData: [8000, 8500, 9000, 9500]
    };
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      new Chart(document.getElementById('salesChart'), {
        type: 'line',
        data: {
          labels: this.salesLabels,
          datasets: [{
            label: '연도별 판매량',
            data: this.salesData,
            borderColor: '#ff9800',
            fill: false
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: { title: { display: true, text: '연도' }},
            y: { title: { display: true, text: '판매량' }}
          }
        }
      });
    }
  }
};
</script>

<style scoped>
#yearly-sales-chart {
  width: 100%;
  margin: 30px auto;
}
</style>
