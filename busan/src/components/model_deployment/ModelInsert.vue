<template>
  <!-- 업로드 버튼만 -->
  <button class="upload-button">Upload</button>
</template>

<script>
export default {
  name: 'ModelInsertUpload',
};
</script>

<style scoped>
button {
  background-color: #ff00ff;
  color: #ffffff;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
