<template>
  <div>

    <canvas ref="commentSentimentChart"></canvas>
  </div>
</template>

<script>
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(PieController, ArcElement, Tooltip, Legend);

export default {
  mounted() {
    new Chart(this.$refs.commentSentimentChart, {
      type: "pie",
      data: {
        labels: ["긍정 댓글", "부정 댓글"],
        datasets: [{ data: [60, 40] }],
      },
    });
  },
};
</script>

<style scoped>
.comment-sentiment-container {
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
  width: 100%; /* 부모 컨테이너에 맞춰 100% 사용 */
  height: 100%; /* 부모 컨테이너에 맞춰 100% 사용 */
  margin-left: 1000px; /* 오른쪽으로 이동시키기 위한 여백 추가 */
}

.comment-sentiment-chart {
  width: 100%; /* 차트의 너비를 100%로 설정 */
  height: 300px; /* 고정 높이 설정 */
  background-color: #ffffff; /* 배경색 설정 */
  border-radius: 8px; /* 모서리 둥글기 추가 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
}
</style>