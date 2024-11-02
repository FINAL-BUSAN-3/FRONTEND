<template>
  <div class="keyword-trend-container">
    <canvas ref="keywordTrendChart" class="keyword-chart"></canvas>
  </div>
</template>

<script>
import { Chart, BarController, CategoryScale, LinearScale, BarElement } from "chart.js";
import { nextTick } from "vue";

Chart.register(BarController, CategoryScale, LinearScale, BarElement);

export default {
  mounted() {
    nextTick(() => {
      this.drawKeywordTrendChart();
    });
  },
  methods: {
    drawKeywordTrendChart() {
      const keywords = [
        { text: "Electric", count: 12 },
        { text: "Car", count: 10 },
        { text: "Battery", count: 8 },
        { text: "Energy", count: 6 },
        { text: "Hybrid", count: 4 },
        { text: "Sustainable", count: 5 },
        { text: "Pollution", count: 3 },
        { text: "Green", count: 7 },
        { text: "Ecology", count: 4 },
      ];

      const labels = keywords.map(item => item.text);
      const data = keywords.map(item => item.count);

      new Chart(this.$refs.keywordTrendChart, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "단어 빈도",
              data: data,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // 비율 유지하지 않음
          scales: {
            x: {
              title: {
                display: true,
                text: '단어',
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: '빈도수',
              },
              suggestedMax: 15,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }
      });
    },
  },
};
</script>

<style scoped>
.keyword-trend-container {
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
  width: 100%; /* 부모 컨테이너에 맞춰 100% 사용 */
  height: 100%; /* 부모 컨테이너에 맞춰 100% 사용 */
}

.keyword-chart {
  width: 90%; /* 차트의 너비를 100%로 설정 */
  height: 300px; /* 고정 높이 설정 */
  background-color: #ffffff; /* 배경색 설정 */
}
</style>
