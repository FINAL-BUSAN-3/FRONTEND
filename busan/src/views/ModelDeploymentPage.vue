<template>
  <div class="model-deployment">
    <h2>모델 배포</h2>

    <!-- 공정 선택 -->
    <div class="process-section">
      <label for="process-select">공정</label>
      <select id="process-select" v-model="selectedProcess">
        <option value="" disabled>공정을 선택해 주세요</option>
        <option v-for="process in processes" :key="process" :value="process">{{ process }}</option>
      </select>
    </div>

    <!-- 모델 선택 -->
    <div class="model-section">
      <label for="model-select">모델</label>
      <select id="model-select" v-model="selectedModel" >
        <option value="" disabled>모델을 선택해 주세요</option>
        <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
      </select>
    </div>

    <!-- 파일 업로드 기능 -->
    <div class="file-upload">
      <label for="file">모델 파일 업로드:</label>
      <input type="file" id="file" @change="handleFileUpload" ref="fileInput" />
      <button v-if="file" @click="clearFile" class="clear-button">X</button>
    </div>

    <!-- 업로드 버튼 -->
    <ModelInsertUpload @click="uploadModel" />
  </div>
</template>

<script>
import ModelInsertUpload from '@/components/model_deployment/ModelInsert.vue';
import ProcessSelectComponent from '@/components/model_deployment/ProcessSelect.vue';
import ModelSelectComponent from '@/components/model_deployment/ModelSelect.vue';

export default {
  name: 'ModelDeploymentPage',
  components: {
    ModelInsertUpload,
  },
  data() {
    return {
      selectedProcess: '',
      selectedModel: '',
      file: null,
      processes: ProcessSelectComponent.data().items,
      models: ModelSelectComponent.data().models,
    };
  },
  computed: {
    isFileUploaded() {
      return !!this.file;
    },
  },
  methods: {
    uploadModel() {
      if (!this.selectedModel && !this.file) {
        alert('업로드할 모델 또는 파일을 선택해 주세요.');
        return;
      }
      alert('업로드 성공!');
    },
    clearFile() {
      this.file = null;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = null;
      }
    },
        handleFileUpload(event) {
      if (event.target.files.length > 0) {
        this.file = event.target.files[0];
              }
    }
  },
};
</script>

<style scoped>
.model-deployment {
  padding: 20px;
  background-color: #2c2f33;
  color: #ffffff;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.process-section,
.model-section,
.file-upload {
  margin-bottom: 20px;
  width: 50%;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

select,
input[type="file"] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1em;
}

.clear-button {
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  padding: 5px;
  cursor: pointer;
  margin-left: 10px;
}
</style>
