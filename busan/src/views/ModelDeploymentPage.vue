<template>
  <div class="model-deployment">
    <div v-if="!uploadSuccess">
      <h2>모델 배포</h2>

      <div class="selection-container">
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
          <select id="model-select" v-model="selectedModel">
            <option value="" disabled>모델을 선택해 주세요</option>
            <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
          </select>
        </div>
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

    <div v-else>
      <h2>모델 비교</h2>
      <div class="model-comparison">
        <div class="model-detail left">
          <div class="model-info">
            <p>* 모델명: {{ modelDetails[0].name }}</p>
            <p>* 모델 버전: {{ modelDetails[0].version }}</p>
            <p>* 파일생성일자: {{ modelDetails[0].fileDate }}</p>
            <p>* 파일크기: {{ modelDetails[0].fileSize }}</p>
            <p>* 파일프레임워크: {{ modelDetails[0].framework }}</p>
            <p>* 학습 정보: {{ modelDetails[0].trainingInfo }}</p>
            <p>* 배포일자: {{ modelDetails[0].deploymentDate }}</p>
          </div>
          <div class="model-stats">
            <table>
              <thead>
                <tr>
                  <th>항목</th>
                  <th>값</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Loss</td>
                  <td>{{ modelDetails[0].avgLoss }}</td>
                </tr>
                <tr>
                  <td>Accuracy</td>
                  <td>{{ modelDetails[0].avgAccuracy }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="model-detail right">
          <div class="model-info">
            <p>* 모델명: {{ modelDetails[1].name }}</p>
            <p>* 모델 버전: {{ modelDetails[1].version }}</p>
            <p>* 파일생성일자: {{ modelDetails[1].fileDate }}</p>
            <p>* 파일크기: {{ modelDetails[1].fileSize }}</p>
            <p>* 파일프레임워크: {{ modelDetails[1].framework }}</p>
            <p>* 학습 정보: {{ modelDetails[1].trainingInfo }}</p>
            <p>* 배포일자: {{ modelDetails[1].deploymentDate }}</p>
          </div>
          <div class="model-stats">
            <table>
              <thead>
                <tr>
                  <th>항목</th>
                  <th>값</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Loss</td>
                  <td>{{ modelDetails[1].avgLoss }}</td>
                </tr>
                <tr>
                  <td>Accuracy</td>
                  <td>{{ modelDetails[1].avgAccuracy }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button @click="deployModel" class="deploy-button">배포</button>
    </div>
  </div>
</template>

<script>
import ModelInsertUpload from '@/components/model_deployment/ModelInsert.vue';
import ProcessSelectComponent from '@/components/model_deployment/ProcessSelect.vue';
import ModelSelectComponent from '@/components/model_deployment/ModelSelect.vue';
import ModelDetailData from '@/components/model_deployment/ModelDetail.vue';

export default {
  name: 'ModelDeploymentPage',
  components: {
    ModelInsertUpload,
  },
  data() {
    return {
      uploadSuccess: false,
      modelDetails: ModelDetailData.data().modelDetails,
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
      if (!this.selectedModel) {
        alert('업로드 실패: 모델을 선택해 주세요.');
        return;
      }
      if (!this.file) {
        alert('업로드 실패: 파일을 업로드해 주세요.');
        return;
      }
      this.uploadSuccess = true;
      alert('업로드 성공!');
    },
    deployModel() {
      alert('배포 성공!');
      this.uploadSuccess = false;
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

.selection-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* 선택창의 전체 너비 조정 */
  gap: 20px;
}

.process-section,
.model-section,
.file-upload {
  margin-bottom: 20px;
  width: 100%; /* 파일 업로드와 동일한 너비 설정 */
}

.model-comparison {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.model-detail {
  width: 48%;
  background-color: #3a3f47;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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

.deploy-button {
  margin-top: 20px;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}
</style>
