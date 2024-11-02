<template>
  <div class="word-cloud-container">
    <div ref="wordCloudCanvas" class="word-cloud"></div>
  </div>
</template>

<script>
import WordCloud from "wordcloud";
import { nextTick } from "vue";

export default {
  mounted() {
    nextTick(() => {
      setTimeout(() => {
        this.drawWordCloud();
      }, 300);  // DOM 렌더링이 완료될 시간을 충분히 확보
    });
  },
  methods: {
    drawWordCloud() {
      const words = [
        ["Electric", 12],
        ["Car", 10],
        ["Battery", 8],
        ["Energy", 6],
        ["Hybrid", 4],
        ["Sustainable", 5],
        ["Pollution", 3],
        ["Green", 7],
        ["Ecology", 4],
      ];

      const canvasElement = this.$refs.wordCloudCanvas;

      if (!canvasElement) {
        console.error("Canvas element not found.");
        return;
      }

      // WordCloud 초기화 확인 로그
      console.log("Initializing WordCloud with:", canvasElement);

      WordCloud(canvasElement, {
        list: words,
        gridSize: 8,
        weightFactor: 10,
        fontFamily: "Arial, sans-serif",
        color: () => `rgb(${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)})`,
        rotateRatio: 0.5,
        backgroundColor: "#fff",
      });
    },
  },
};
</script>

<style scoped>
.word-cloud-container {
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
  width: 100%; /* 부모 컨테이너에 맞춰 100% 사용 */
  height: 100%; /* 부모 컨테이너에 맞춰 100% 사용 */
}

.word-cloud {
  width: 100%; /* 워드 클라우드 영역의 너비를 100%로 설정 */
  height: 300px; /* 고정 높이 설정 */
  background-color: #ffffff; /* 배경색 설정 */
}
</style>
