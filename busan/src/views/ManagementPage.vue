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
import yearSales from '@/components/management/YearSales.vue';
import axios from 'axios';

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
      },
      stockData: [],  // 주가 데이터를 저장할 배열
      stockLabels: [] // 주가 데이터의 라벨 (시간)
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
    async fetchStockData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/stock-history/005380'); // 현대차 주식 코드
        const data = response.data;
        this.stockLabels = data.map(item => item.time);
        this.stockData = data.map(item => item.price);
        this.createStockChart(); // 데이터를 가져온 후 차트를 생성
      } catch (error) {
        console.error("주가 데이터를 불러오는 데 실패했습니다:", error);
      }
    },
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
            backgroundColor: ["#4CAF50", "#e63312"]
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
          labels: this.stockLabels, // 주가 데이터의 시간 라벨
          datasets: [{
            label: '현대차 주가',
            data: this.stockData, // 주가 데이터
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
    this.fetchStockData(); // 주식 데이터도 같이 가져오기
    setInterval(this.fetchStockData, 60000); // 10분마다 주가 데이터 갱신
  }
};
</script>

<style scoped>
.management-view {
  padding: 30px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #003366;
  color: white;
  padding: 15px 80px;
  font-size: 2em;
}

.production-rate {
  font-size: 1.5em;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 40px;
  margin-left: -33%;
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
  margin-top: 50px;
  margin-bottom: 40px;
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

.banner {
  background-color: #002c5f;
  color: white;
  padding: 20px 40px;
  text-align: center;
  border-radius: 15px;
  font-size: 2em;
  margin: 10px;
  width: 80%;
  max-width: 1200px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.banner-text {
  font-size: 1.8em;
}

.banner-number {
  font-size: 1.8em;
  font-weight: bold;
}
</style>
