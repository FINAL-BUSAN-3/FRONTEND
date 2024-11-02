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
      lastUpdateTime: null, // 마지막 업데이트 시간을 저장할 변수 추가
      previousHyundaiPrice: null, // 현대차의 이전 가격을 저장
      previousKiaPrice: null      // 기아차의 이전 가격을 저장
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
        const currentTime = new Date();

        // 마지막 업데이트 시간 확인 (2시간 이내면 업데이트 생략)
        if (this.lastUpdateTime && (currentTime - this.lastUpdateTime < 7200000)) {
            console.log("2시간 이내이므로 업데이트 건너뜀");
            return;
        }

        console.log("fetchStockHistory 호출 시간:", currentTime.toLocaleString());

        try {
            const [hyundaiResponse, kiaResponse] = await Promise.all([
                axios.get('http://ec2-18-215-52-54.compute-1.amazonaws.com:8000/stock-history/005380'),
                axios.get('http://ec2-18-215-52-54.compute-1.amazonaws.com:8000/stock-history/000270')
            ]);

            const hyundaiData = hyundaiResponse.data;
            const kiaData = kiaResponse.data;

            // 가장 최신 데이터를 가져옴
            const latestHyundaiPrice = hyundaiData[hyundaiData.length - 1];
            const latestKiaPrice = kiaData[kiaData.length - 1];

            // 현대차와 기아차 둘 다 동일한 시간에 업데이트되는지 확인
            if (latestHyundaiPrice && latestKiaPrice && latestHyundaiPrice.time === latestKiaPrice.time) {
                this.chartData.labels.push(latestHyundaiPrice.time); // 동일한 시간만 라벨에 추가
                this.chartData.datasets[0].data.push(latestHyundaiPrice.price);
                this.chartData.datasets[1].data.push(latestKiaPrice.price);

                // 마지막 업데이트 시간 갱신
                this.lastUpdateTime = currentTime;
                console.log("동시에 업데이트된 데이터 추가");
            } else {
                console.log("시간이 맞지 않아 업데이트 건너뜀");
            }
        } catch (error) {
            console.error("주가 데이터를 불러오는 데 실패했습니다:", error);
      }
    }
  },
  mounted() {
    this.fetchStockHistory(); // 초기 호출
    this.intervalId = setInterval(this.fetchStockHistory, 7200000); // 2시간마다 호출
},
  beforeUnmount() {
    // 컴포넌트가 제거될 때 setInterval을 해제하여 중복 방지
    clearInterval(this.intervalId);
  }
};



</script>
