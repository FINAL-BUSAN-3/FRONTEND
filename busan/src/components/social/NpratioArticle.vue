<template>
  <div>

    <canvas ref="articleSentimentChart"></canvas>
  </div>
</template>

<script>
import { Chart, BarController, CategoryScale, LinearScale, BarElement } from "chart.js";
Chart.register(BarController, CategoryScale, LinearScale, BarElement);

export default {
  mounted() {
    new Chart(this.$refs.articleSentimentChart, {
      type: "bar",
      data: {
        labels: ["1월", "2월", "3월", "4월", "5월"],
        datasets: [
          { label: "긍정 기사", data: [5, 10, 15, 20, 25] },
          { label: "부정 기사", data: [3, 8, 13, 18, 23] }
        ]
      },
    });
  },
};
</script>

<style scoped>
.article-sentiment-container {
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
  width: 100%; /* 부모 컨테이너에 맞춰 100% 사용 */
  height: 110%; /* 부모 컨테이너에 맞춰 100% 사용 */
}

.article-sentiment-chart {
  width: 100%; /* 차트의 너비를 100%로 설정 */
  height: 500px; /* 고정 높이 설정 */
  background-color: #ffffff; /* 배경색 설정 */
}
</style>