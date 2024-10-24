<template>
  <div class="management-view">
    <div class="header">
      <h2>월 총 생산량</h2>
      <span class="production-rate">887 대/일</span>
    </div>

    <!-- 프레스와 용접 데이터를 하나의 카드로 묶고 버튼을 하단 중앙에 배치 -->
    <div class="chart-row">
      <div class="chart-card">
        <div class="combined-chart">
          <div class="chart-item">
            <h3 class="chart-title">프레스</h3>
            <canvas id="pressChart"></canvas>
          </div>
          <div class="chart-item">
            <h3 class="chart-title">용접</h3>
            <canvas id="weldingChart"></canvas>
          </div>
        </div>
        <div class="button-group-inside-card">
          <button @click="setPeriod('day')">일간</button>
          <button @click="setPeriod('week')">주간</button>
          <button @click="setPeriod('month')">월간</button>
        </div>
      </div>
      <div class="chart-card">
        <h3 class="chart-title">현대 & 기아자동차 주가</h3>
        <div class="chart-item">
          <canvas id="stockChart"></canvas>
        </div>
      </div>
    </div>

    <!-- 월간 생산량 그래프 카드로 유지 -->
    <div class="line-chart-container">
      <div class="chart-card">
        <h3 class="chart-title">월간 생산량</h3>
        <canvas id="monthlyProductionChart"></canvas>
      </div>
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
      hdStockData: [],
      kiaStockData: [],
      stockLabels: [],
      hdSalesData: [],
      kiaSalesData: [],
      salesLabels: []
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
    async fetchSalesData() {
      try {
        const hdResponse = await axios.get('http://127.0.0.1:8000/sales/hd');
        this.hdSalesData = hdResponse.data.map(item => item.count);
        this.salesLabels = hdResponse.data.map(item => item.year);

        const kiaResponse = await axios.get('http://127.0.0.1:8000/sales/kia');
        this.kiaSalesData = kiaResponse.data.map(item => item.count);

        this.createMonthlyProductionChart();
      } catch (error) {
        console.error("판매 데이터를 불러오는 데 실패했습니다:", error);
      }
    },
    async fetchStockData() {
      try {
        const hyundaiResponse = await axios.get('http://127.0.0.1:8000/stock-history/005380');
        const kiaResponse = await axios.get('http://127.0.0.1:8000/stock-history/000270');

        const hyundaiData = hyundaiResponse.data;
        const kiaData = kiaResponse.data;

        this.stockLabels = hyundaiData.map(item => item.time);
        this.hdStockData = hyundaiData.map(item => item.price);
        this.kiaStockData = kiaData.map(item => item.price);

        this.createStockChart();
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
          labels: this.stockLabels,
          datasets: [
            {
              label: '현대차 주가',
              data: this.hdStockData,
              borderColor: '#00aad2',
              fill: false
            },
            {
              label: '기아차 주가',
              data: this.kiaStockData,
              borderColor: '#9b111e',
              fill: false
            }
          ]
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
          labels: this.salesLabels,
          datasets: [
            {
              label: '현대자동차',
              data: this.hdSalesData,
              borderColor: '#00aad2',
              fill: false
            },
            {
              label: '기아자동차',
              data: this.kiaSalesData,
              borderColor: '#9b111e',
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
    },
    setPeriod(period) {
      this.period = period;
      this.createPressChart();
      this.createWeldingChart();
    }
  },
  mounted() {
    this.renderCharts();
    this.fetchStockData();
    this.fetchSalesData();
    setInterval(this.fetchStockData, 720000);
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
  border-radius: 25px;
}

.production-rate {
  font-size: 1.5em;
}

.chart-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  margin: 10px;
}

.chart-title {
  font-size: 1.5em;
  margin-bottom: 15px;
}

.combined-chart {
  display: flex;
  justify-content: space-evenly;
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
}

.line-chart-container {
  width: 90%;
  margin: 30px auto;
}

.button-group-inside-card {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.button-group-inside-card button {
  padding: 5px 10px;
  margin: 0 5px;
  font-size: 1em;
  background-color: #eaeaea;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
</style>
