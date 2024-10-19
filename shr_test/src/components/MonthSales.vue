<template>
  <div class="banner">
    <span class="banner-text">월 총 생산량</span>
    <span class="banner-number">{{ productionTotal }} 대/일</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productionTotal: 887 // 샘플 데이터
    };
  }
};
</script>

<style scoped>
.banner {
  background-color: #2c387e; /* 배경색 */
  color: white;
  padding: 20px 40px; /* 좌우 패딩 조정 */
  text-align: center;
  border-radius: 15px;
  font-size: 2em; /* 텍스트 크기 조정 */
  margin: 20px;
  width: 80%; /* 배너 너비를 더 길게 설정 */
  max-width: 1200px; /* 최대 너비 설정 */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  display: flex; /* Flexbox 사용 */
  justify-content: space-between; /* 좌우 끝 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
}

.banner-text {
  font-size: 1.8em; /* "월 총 생산량" 텍스트 크기 */
}

.banner-number {
  font-size: 1.8em; /* 숫자 텍스트 크기 */
  font-weight: bold; /* 강조 */
}
</style>
