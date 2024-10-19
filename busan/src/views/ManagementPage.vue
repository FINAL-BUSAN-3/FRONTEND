<template>
  <div class="management-view">
    <div class="header">
      <h2>월 총 생산량</h2>
      <span class="production-rate">887 대/일</span>
    </div>
    <div class="chart-row">
      <div class="chart-item">
        <h3 class="chart-title">프레스 데이터</h3>
        <canvas id="pressChart"></canvas>
      </div>
      <div class="chart-item">
        <h3 class="chart-title">용접 데이터</h3>
        <canvas id="weldingChart"></canvas>
      </div>
      <div class="chart-item">
        <h3 class="chart-title">주가 데이터</h3>
        <canvas id="stockChart"></canvas>
      </div>
    </div>
    <div class="button-group">
      <button @click="setPeriod('day')">일간</button>
      <button @click="setPeriod('week')">주간</button>
      <button @click="setPeriod('month')">월간</button>
    </div>
    <div class="line-chart-container">
      <canvas id="monthlyProductionChart"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import pressDay from '@/components/management/PressDay.vue';
import pressWeek from '@/components/management/PressWeek.vue';
import pressMonth from '@/components/management/PressMonth.vue';
import weldingDay from '@/components/management/WeldingDay.vue';
import weldingWeek from '@/components/management/WeldingWeek.vue';
import weldingMonth from '@/components/management/WeldingMonth.vue';
import stockChartData from '@/components/management/StockChart.vue';
import yearSales from '@/components/management/YearSales.vue';

export default {
  name: "ManagementView",
  data() {
    return {
      pressChart: null,
      weldingChart: null,
      stockChart: null,
      monthlyProductionChart: null,
      period: 'day',
      pressDataMap: {
        day: pressDay.data().pressData,
        week: pressWeek.data().pressData,
        month: pressMonth.data().pressData
      },
      weldingDataMap: {
        day: weldingDay.data().weldingData,
        week: weldingWeek.data().weldingData,
        month: weldingMonth.data().weldingData
      }
    };
  },
  computed: {
    pressData() {
      return this.pressDataMap[this.period];
    },
    weldingData() {
      return this.weldingDataMap[this.period];
    }
  },
  methods: {
    renderCharts() {
      this.createPressChart();
      this.createWeldingChart();
      this.createStockChart();
      this.createMonthlyProductionChart();
    },
    createPressChart() {
      const ctx = document.getElementById("pressChart").getContext("2d");
      if (this.pressChart) this.pressChart.destroy();
      this.pressChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["양품", "불량품"],
          datasets: [{
            data: this.pressData,
            backgroundColor: ["#4CAF50", "#F44336"]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' }
          }
        }
      });
    },
    createWeldingChart() {
      const ctx = document.getElementById("weldingChart").getContext("2d");
      if (this.weldingChart) this.weldingChart.destroy();
      this.weldingChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["양품", "불량품"],
          datasets: [{
            data: this.weldingData,
            backgroundColor: ["#4CAF50", "#F44336"]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' }
          }
        }
      });
    },
    createStockChart() {
      const ctx = document.getElementById("stockChart").getContext("2d");
      if (this.stockChart) this.stockChart.destroy();
      this.stockChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: stockChartData.data().stockLabels,
          datasets: [{
            label: '주가',
            data: stockChartData.data().stockChartData,
            borderColor: '#3e95cd',
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { title: { display: true, text: '시간' }},
            y: { title: { display: true, text: '가격 (₩)' }}
          }
        }
      });
    },
    createMonthlyProductionChart() {
      const ctx = document.getElementById("monthlyProductionChart").getContext("2d");
      if (this.monthlyProductionChart) this.monthlyProductionChart.destroy();
      this.monthlyProductionChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: yearSales.data().salesLabels,
          datasets: [{
            label: '연도별 판매량',
            data: yearSales.data().salesData,
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
    },
    setPeriod(period) {
      this.period = period;
      this.createPressChart();
      this.createWeldingChart();
    }
  },
  mounted() {
    this.renderCharts();
  }
};
</script>

<style scoped>
.management-view {
  padding: 100px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #003366;
  color: white;
  padding: 20px 20px;
  font-size: 2em;
}

.production-rate {
  font-size: 1.5em;
}

.button-group {
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  margin-top: 50px;
  margin-bottom: 40px; /* 버튼과 아래 요소 사이의 간격 */
  margin-left:-33%; /* 왼쪽으로 이동 (조정 가능) */
}

.button-group button {
  padding: 5px 10px;
  margin: 0 3px;
  font-size: 1em;
  background-color: #eaeaea;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.chart-row {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-top: 50px; /* 배너와 파이 차트 사이의 간격 */
  margin-bottom: 40px; /* 파이 차트와 버튼 사이의 간격 */
}

.chart-item {
  width: 300px;
  height: 300px;
  padding: 15px;
  text-align: center;
}

.line-chart-container {
  width: 90%;
  margin: 30px auto;
}
</style>
