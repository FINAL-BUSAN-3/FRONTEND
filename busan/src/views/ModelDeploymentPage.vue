<template>
  <div class="model-deployment">
    <h2>모델 배포</h2>

    <!-- 업로드 화면 -->
    <div v-if="!uploadSuccess">
      <div class="selection-container">
        <!-- 공정 선택 -->
        <div class="process-section">
          <label for="process-select">공정</label>
          <select id="process-select" v-model="selectedProcess">
            <option value="" disabled>공정을 선택해 주세요</option>
            <option v-for="process in processes" :key="process" :value="process">{{ process }}</option>
          </select>
        </div>

        <!-- 모델 선택 및 파일 업로드 영역 -->
        <div class="model-section">
          <label for="model-select">모델</label>
          <div class="model-tabs">
            <button :class="{ active: isPreviousModel }" @click="selectPreviousModel">이전 모델</button>
            <button :class="{ active: !isPreviousModel }" @click="selectNewModel">신규 모델</button>
          </div>

          <div v-if="isPreviousModel">
            <ModelSelectComponent @update:modelFileNames="updateModelFileNames" />
            <select id="model-select" v-model="selectedModel">
              <option value="" disabled>모델을 선택해 주세요</option>
              <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
            </select>
          </div>
          <div v-else>
            <div class="file-upload">
              <label for="file">파일 선택</label>
              <input type="file" id="file" @change="handleFileUpload" ref="fileInput" />
              <button v-if="file" @click="clearFile" class="clear-button">X</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 모델 정보와 성능 표 -->
      <div class="combined-info-container">
        <div class="model-info">
          <div class="model-icon">
            <img src="@/assets/model_icon_black.png" alt="모델 아이콘" />
          </div>
          <div class="model-details">
            <p>* 모델명: <span v-if="isPreviousModel">{{ selectedModelInfo.model_name || '' }}</span>
              <input v-else v-model="newModelInfo.model_name" placeholder="모델명 입력" /></p>
            <p>* 모델 버전: <span v-if="isPreviousModel">{{ selectedModelInfo.model_version || '' }}</span>
              <input v-else v-model="newModelInfo.model_version" placeholder="모델 버전 입력" /></p>
            <p>* 파이썬 버전: <span v-if="isPreviousModel">{{ selectedModelInfo.python_version || '' }}</span>
              <input v-else v-model="newModelInfo.python_version" placeholder="파이썬 버전 입력" /></p>
            <p>* 라이브러리: <span v-if="isPreviousModel">{{ selectedModelInfo.library || '' }}</span>
              <input v-else v-model="newModelInfo.library" placeholder="라이브러리 입력" /></p>
            <p>* 모델 종류: <span v-if="isPreviousModel">{{ selectedModelInfo.model_type || '' }}</span>
              <input v-else v-model="newModelInfo.model_type" placeholder="모델 종류 입력" /></p>
          </div>
        </div>

        <table class="performance-table">
          <thead>
            <tr>
              <th>항목</th>
              <th>값</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Loss</td>
              <td>
                <span v-if="isPreviousModel">{{ selectedModelInfo.loss || '-' }}</span>
                <input v-else v-model="newModelInfo.loss" placeholder="Loss 값 입력" />
              </td>
            </tr>
            <tr>
              <td>Accuracy</td>
              <td>
                <span v-if="isPreviousModel">{{ selectedModelInfo.accuracy || '-' }}</span>
                <input v-else v-model="newModelInfo.accuracy" placeholder="Accuracy 값 입력" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button class="upload-button" @click="handleUpload">Upload</button>
    </div>

    <!-- 업로드 성공 후 상세 정보 화면 -->
    <div v-else class="deployment-details">
      <div class="model-info-box">
        <img src="@/assets/model_icon_black.png" alt="모델 아이콘" class="model-icon-large" />
        <div class="model-info-text">
          <p>* 모델명 : {{ displayModelInfo.model_name }}</p>
          <p>* 모델 버전 : {{ displayModelInfo.model_version }}</p>
          <p>* 파이썬 버전 : {{ displayModelInfo.python_version }}</p>
          <p>* 라이브러리 : {{ displayModelInfo.library }}</p>
          <p>* 모델 종류 : {{ displayModelInfo.model_type }}</p>
          <p>* 배포일자 : {{ displayModelInfo.deployment_date }}</p>
        </div>
      </div>

      <div class="detail-table">
        <table class="performance-table">
          <thead>
            <tr>
              <th>항목</th>
              <th>값</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Loss</td>
              <td>{{ displayModelInfo.loss || '-' }}</td>
            </tr>
            <tr>
              <td>Accuracy</td>
              <td>{{ displayModelInfo.accuracy || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button class="deploy-button" @click="sendToModelApply">배포</button>
    </div>

    <!-- ModelApply 컴포넌트를 조건부 렌더링하여 데이터 전송 -->
    <ModelApply 
      v-if="sendModelApply" 
      :modelData="displayModelInfo" 
      :modelFile="file" 
      @deploy-success="showPopup('배포 성공!')" 
      @deploy-failure="showPopup('배포 실패')"
    />
  </div>
</template>

<script>
import ModelSelectComponent from "@/components/model_deployment/ModelSelect.vue";
import ModelApply from "@/components/model_deployment/ModelApply.vue";

export default {
  name: "ModelDeploymentPage",
  components: {
    ModelSelectComponent,
    ModelApply,
  },
  data() {
    return {
      uploadSuccess: false,
      sendModelApply: false,
      selectedProcess: "",
      selectedModel: "",
      processes: ["프레스", "용접"],
      models: [],
      selectedModelInfo: {},
      newModelInfo: {
        model_name: "",
        model_version: "",
        python_version: "",
        library: "",
        model_type: "",
        loss: "",
        accuracy: "",
      },
      displayModelInfo: {},
      isPreviousModel: true,
      file: null,
    };
  },
  methods: {
    updateModelFileNames(model_file_names) {
      this.models = model_file_names;
    },
    selectPreviousModel() {
      this.isPreviousModel = true;
      this.file = null;
      this.selectedModel = "";
    },
    selectNewModel() {
      this.isPreviousModel = false;
      this.selectedModel = "";
    },
    handleFileUpload(event) {
      if (event.target.files.length > 0) {
        this.file = event.target.files[0];
      }
    },
    clearFile() {
      this.file = null;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = null;
      }
    },
    handleUpload() {
      if (!this.selectedProcess) {
        alert("공정을 선택해 주세요.");
        return;
      }
      if (this.isPreviousModel && !this.selectedModel) {
        alert("이전 모델을 선택해 주세요.");
        return;
      }
      if (!this.isPreviousModel && !this.file) {
        alert("파일을 업로드해 주세요.");
        return;
      }
      if (!this.isPreviousModel && (!this.newModelInfo.model_name || !this.newModelInfo.model_version || !this.newModelInfo.python_version || !this.newModelInfo.library || !this.newModelInfo.model_type || !this.newModelInfo.loss || !this.newModelInfo.accuracy)) {
        alert("신규 모델의 모든 정보를 입력해 주세요.");
        return;
      }

      // 모델 정보를 displayModelInfo에 설정
      this.displayModelInfo = this.isPreviousModel ? this.selectedModelInfo : this.newModelInfo;
      this.displayModelInfo.deployment_date = new Date().toISOString().slice(0, 19).replace("T", " ");
      this.uploadSuccess = true;
    },
    sendToModelApply() {
      this.sendModelApply = true; // ModelApply 컴포넌트를 렌더링하여 FastAPI로 전송
    },
    showPopup(message) {
      alert(message); // 성공 또는 실패 메시지 팝업
    },
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
}

.selection-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.process-section,
.model-section {
  width: 100%;
  margin-bottom: 20px;
}

.model-tabs {
  display: flex;
  gap: 10px;
}

.model-tabs button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.model-tabs button.active {
  background-color: #ff4081;
}

.file-upload {
  display: flex;
  align-items: center;
}

.clear-button {
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  padding: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.model-info-box {
  display: flex;
  align-items: center;
  gap: 20px;
}

.model-icon-large {
  width: 80px;
  height: 80px;
}

.model-info-text p {
  margin: 0;
}

.detail-table {
  margin-top: 20px;
}

.performance-table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
}

.deploy-button {
  margin-top: 20px;
  background-color: #ff4081;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
