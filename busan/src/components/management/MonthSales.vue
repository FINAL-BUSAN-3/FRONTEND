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
