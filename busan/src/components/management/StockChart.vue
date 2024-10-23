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
  components: {
    LineChart: {
      extends: Line,
      props: ['chartData', 'options'],
      mounted() {
        this.renderChart(this.chartData, this.options);
      },
    },
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: '현대차 주가',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            data: [],
            fill: true,
            tension: 0.3,
          },
          {
            label: '기아차 주가',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            data: [],
            fill: true,
            tension: 0.3,
          }
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'hour',
              displayFormats: {
                hour: 'MM-DD HH:mm',
              },
            },
            title: {
              display: true,
              text: '시간',
            },
          },
          y: {
            title: {
              display: true,
              text: '가격 (원)',
            },
            beginAtZero: false,
          },
        },
      },
    };
  },
  methods: {
    async fetchStockHistory() {
      try {
        const hyundaiResponse = await axios.get('http://127.0.0.1:8000/stock-history/005380'); // 현대차 주식 코드
        const kiaResponse = await axios.get('http://127.0.0.1:8000/stock-history/000270'); // 기아차 주식 코드

        const hyundaiData = hyundaiResponse.data;
        const kiaData = kiaResponse.data;

        this.chartData.labels = hyundaiData.map(item => item.time);
        this.chartData.datasets[0].data = hyundaiData.map(item => item.price);
        this.chartData.datasets[1].data = kiaData.map(item => item.price);

      } catch (error) {
        console.error("주가 데이터를 불러오는 데 실패했습니다:", error);
      }
    }
  },
  mounted() {
    this.fetchStockHistory();
    setInterval(this.fetchStockHistory, 7200000);
  }
};
</script>
