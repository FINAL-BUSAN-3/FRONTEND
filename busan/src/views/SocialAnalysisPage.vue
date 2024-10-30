<template>
  <div class="social-analysis-page">
    <!-- 예측 판매량 카드 -->
    <div class="header">
      <h2>예측 판매량</h2>
      <span class="estimated-sales">00%</span>
    </div>

    <!-- 워드 클라우드 및 키워드량 그래프 -->
    <div class="row">
      <div class="card">
        <h3 class="card-title">워드 클라우드</h3>
        <div class="chart-container">
          <WordCloud />
        </div>
      </div>
      <div class="card">
        <h3 class="card-title">키워드량 추이</h3>
        <div class="chart-container">
          <KeyWord />
        </div>
      </div>
    </div>

    <!-- 긍정/부정 기사 히스토그램 및 긍정/부정 댓글 비율 -->
    <div class="row">
      <div class="card">
        <h3 class="card-title">긍정/부정 기사 히스토그램</h3>
        <div class="chart-container">
          <NpratioArticle />
        </div>
      </div>
      <div class="card">
        <h3 class="card-title">긍정/부정 댓글 비율</h3>
        <div class="chart-container">
          <NpratioComment />
        </div>
      </div>
    </div>

    <!-- 언론사별 기재 횟수 및 결함 신고 꺾은선 그래프 -->
    <div class="row">
      <div class="card">
        <h3 class="card-title">언론사별 기재 횟수</h3>
        <div class="chart-container">
          <CountJournal />
        </div>
      </div>
      <div class="card">
        <h3 class="card-title">결함 신고 추이</h3>
        <div class="chart-container">
          <CarDefect />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WordCloud from "@/components/social/WordCloud.vue";
import KeyWord from "@/components/social/KeyWord.vue";
import NpratioArticle from "@/components/social/NpratioArticle.vue";
import NpratioComment from "@/components/social/NpratioComment.vue";
import CountJournal from "@/components/social/CountJournal.vue";
import CarDefect from "@/components/social/CarDefect.vue";

export default {
  components: {
    WordCloud,
    KeyWord,
    NpratioArticle,
    NpratioComment,
    CountJournal,
    CarDefect,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 100px;

  color: #003366;
  padding: 10px 20px;
  font-size: 1.5em;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border: 3px solid #a8b2c6;
}

.estimated-sales {
  font-size: 1.2em;
}

.social-analysis-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.card {
  width: 500px;
  height: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 15px;
  display: flex;
  flex-direction: column; /* 제목과 차트를 수직 정렬 */
  align-items: center;
  border: 1px solid #a8b2c6;
  box-sizing: border-box;
}

.card-title {
  margin-bottom: 15px; /* 제목과 차트 사이의 간격 */
  font-size: 1.2em;
  font-weight: bold;
  color: #003366;
  text-align: center;
  width: 100%;
}

/* 차트를 담는 컨테이너 */
.chart-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* 카드 내부의 차트 크기 조정 */
.chart-container > * {
  width: 80%; /* 너비를 90%로 설정하여 여유 공간 확보 */
  height: 80%; /* 높이를 90%로 설정하여 여유 공간 확보 */
}
</style>
