<template>
  <div class="year-sales-chart-container">
    <canvas id="yearSalesChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
Chart.register(...registerables);

export default {
  data() {
    return {
      hdSalesData: [],
      kiaSalesData: [],
      salesLabels: [] // X축 레이블
    };
  },
  methods: {
    async fetchSalesData() {
      try {
        // HD_sales 데이터 불러오기
        const hdResponse = await axios.get('http://localhost:8000/sales/hd');
        this.hdSalesData = hdResponse.data.map(item => item.count);
        this.salesLabels = hdResponse.data.map(item => item.year);

        // KIA_sales 데이터 불러오기
        const kiaResponse = await axios.get('http://localhost:8000/sales/kia');
        this.kiaSalesData = kiaResponse.data.map(item => item.count);

        // 데이터 불러온 후 차트 생성
        this.createYearSalesChart();
      } catch (error) {
        console.error("판매 데이터를 불러오는 데 실패했습니다:", error);
      }
    },
    createYearSalesChart() {
      const ctx = document.getElementById("yearSalesChart").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: this.salesLabels,
          datasets: [
            {
              label: 'HD Sales',
              data: this.hdSalesData,
              borderColor: '#3e95cd',
              fill: false
            },
            {
              label: 'KIA Sales',
              data: this.kiaSalesData,
              borderColor: '#8e5ea2',
              fill: false
            }
          ]
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
  },
  mounted() {
    this.fetchSalesData(); // 컴포넌트가 마운트될 때 데이터 불러오기
  }
};
</script>

<style scoped>
.year-sales-chart-container {
  width: 90%;
  margin: 30px auto;
}
</style>
