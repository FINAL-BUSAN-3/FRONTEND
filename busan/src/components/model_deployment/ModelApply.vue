<template>
  <div class="model-apply">
    <h2>모델 배포 신청</h2>
    <p>모델을 배포하시겠습니까?</p>
    <button @click="applyDeployment">배포하기</button>
  </div>
</template>

<script>
export default {
  name: 'ModelApply',
  methods: {
    applyDeployment() {
      // 배포 요청 처리 로직을 추가합니다.
      alert('모델이 성공적으로 배포되었습니다!');
    },
  },
};
</script>

<style scoped>
.model-apply {
  padding: 20px;
  background-color: #2c2f33;
  color: #ffffff;
  text-align: center;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}
</style>
