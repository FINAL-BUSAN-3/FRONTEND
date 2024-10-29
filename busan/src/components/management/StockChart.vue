<template>
  <div class="chart-container">
    <line-chart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default {
  data() {
    return {
      intervalId: null, // setInterval ID를 저장할 변수
    };
  },
  components: {
    LineChart: {
      extends: Line,
      props: ['chartData', 'options'],
      mounted() {
        this.renderChart(this.chartData, this.options);
      },
    },
  },
  methods: {
    async fetchStockHistory() {
      console.log("fetchStockHistory 호출 시간:", new Date().toLocaleString()); // 호출 시간 확인

      try {
        // 두 개의 비동기 요청을 동시에 처리
        const [hyundaiResponse, kiaResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/stock-history/005380'), // 현대차 주식 코드
          axios.get('http://127.0.0.1:8000/stock-history/000270')  // 기아차 주식 코드
        ]);

        const hyundaiData = hyundaiResponse.data;
        const kiaData = kiaResponse.data;

        // 데이터를 동기화하여 동시에 업데이트
        this.chartData.labels = hyundaiData.map(item => item.time);
        this.chartData.datasets[0].data = hyundaiData.map(item => item.price);
        this.chartData.datasets[1].data = kiaData.map(item => item.price);

      } catch (error) {
        console.error("주가 데이터를 불러오는 데 실패했습니다:", error);
      }
    }
  },
  mounted() {
    console.log("컴포넌트가 로드되었습니다.");
    // setInterval을 통해 1시간마다 fetchStockHistory 호출하고, intervalId에 저장
    this.intervalId = setInterval(this.fetchStockHistory, 3600000); // 1시간마다 호출
  },
  beforeUnmount() {
    // 컴포넌트가 제거될 때 setInterval을 해제하여 중복 방지
    clearInterval(this.intervalId);
  }
};



</script>
