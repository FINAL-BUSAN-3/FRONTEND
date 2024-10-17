<template>
  <div>
    <h1>헬로 월드 페이지</h1>
    <p>여기는 / 경로에 해당하는 페이지입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@</p>
    <router-link to="/test">
      <button>Go To Test Page</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
};
</script>

<style scoped>
/* 여기에 스타일 추가 */
button {
  margin-top: 20px; /* 버튼과 텍스트 간의 간격 */
  padding: 10px 15px; /* 버튼 패딩 */
  font-size: 16px; /* 버튼 글자 크기 */
  cursor: pointer; /* 마우스 커서 모양 변경 */
}
</style>
