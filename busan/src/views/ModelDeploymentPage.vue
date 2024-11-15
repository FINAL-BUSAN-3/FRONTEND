<template>
  <div class="model-deployment">
    <h2>모델 배포</h2>

    <!-- 업로드 화면 -->
    <div v-if="!uploadSuccess">
      <div class="selection-container">
        <div class="process-section">
          <!-- 공정 선택 UI를 여기서 직접 렌더링 -->
          <label for="process-select">공정</label>
          <select id="process-select" v-model="selectedProcess" @change="onProcessSelected">
            <option value="" disabled>공정을 선택해 주세요</option>
            <option v-for="process in processes" :key="process" :value="process">{{ process }}</option>
          </select>
          <ProcessSelectComponent @processesLoaded="setProcesses" />
        </div>

        <div class="model-section">
          <label for="model-select">모델</label>
          <div class="model-tabs">
            <button class="tab" :class="{ active: isPreviousModel }" @click="selectPreviousModel">이전 모델</button>
            <button class="tab" :class="{ active: !isPreviousModel }" @click="selectNewModel">신규 모델</button>
          </div>

          <div v-if="isPreviousModel">
            <ModelSelectComponent :processName="selectedProcess" @update:modelFileNames="updateModelFileNames" />
            <select id="model-select" v-model="selectedModel" @change="onModelChange">
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
            <p>모델명:
              <span v-if="isPreviousModel">{{ selectedModelInfo.model_name || '' }}</span>
              <input v-else v-model="newModelInfo.model_name" placeholder="모델명 입력" />
            </p>
            <p>모델 버전:
              <span v-if="isPreviousModel">{{ selectedModelInfo.model_version || '' }}</span>
              <input v-else v-model="newModelInfo.model_version" placeholder="모델 버전 입력" />
            </p>
            <p>파이썬 버전:
              <span v-if="isPreviousModel">{{ selectedModelInfo.python_version || '' }}</span>
              <input v-else v-model="newModelInfo.python_version" placeholder="파이썬 버전 입력" />
            </p>
            <p>라이브러리:
              <span v-if="isPreviousModel">{{ selectedModelInfo.library || '' }}</span>
              <input v-else v-model="newModelInfo.library" placeholder="라이브러리 입력" />
            </p>
            <p>모델 종류:
              <span v-if="isPreviousModel">{{ selectedModelInfo.model_type || '' }}</span>
              <input v-else v-model="newModelInfo.model_type" placeholder="모델 종류 입력" />
            </p>
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
      <div class="info-container">
        <!-- 왼쪽: 현재 사용 중인 모델 정보 -->
        <div class="info-table">
          <h3>  현재 사용 중인 모델</h3>
          <table class="performance-table">
            <thead>
              <tr>
                <th>항목</th>
                <th>값</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>모델명</td>
                <td>{{ activeModelInfo.model_name || '-' }}</td>
              </tr>
              <tr>
                <td>모델 버전</td>
                <td>{{ activeModelInfo.model_version || '-' }}</td>
              </tr>
              <tr>
                <td>파이썬 버전</td>
                <td>{{ activeModelInfo.python_version || '-' }}</td>
              </tr>
              <tr>
                <td>라이브러리</td>
                <td>{{ activeModelInfo.library || '-' }}</td>
              </tr>
              <tr>
                <td>모델 종류</td>
                <td>{{ activeModelInfo.model_type || '-' }}</td>
              </tr>
              <tr>
                <td>Loss</td>
                <td>{{ activeModelInfo.loss || '-' }}</td>
              </tr>
              <tr>
                <td>Accuracy</td>
                <td>{{ activeModelInfo.accuracy || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 오른쪽: 업로드된 모델 정보 -->
        <div class="info-table">
          <h3>선택된 모델 정보</h3>
          <table class="performance-table">
            <thead>
              <tr>
                <th>항목</th>
                <th>값</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>모델명</td>
                <td>{{ displayModelInfo.model_name }}</td>
              </tr>
              <tr>
                <td>모델 버전</td>
                <td>{{ displayModelInfo.model_version }}</td>
              </tr>
              <tr>
                <td>파이썬 버전</td>
                <td>{{ displayModelInfo.python_version }}</td>
              </tr>
              <tr>
                <td>라이브러리</td>
                <td>{{ displayModelInfo.library }}</td>
              </tr>
              <tr>
                <td>모델 종류</td>
                <td>{{ displayModelInfo.model_type }}</td>
              </tr>
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
      </div>

      <button class="deploy-button" @click="sendToModelApply">배포</button>
    </div>

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
import ProcessSelectComponent from "@/components/model_deployment/ProcessSelect.vue";
import ModelSelectComponent from "@/components/model_deployment/ModelSelect.vue";
import ModelApply from "@/components/model_deployment/ModelApply.vue";
import axios from 'axios';

export default {
  name: "ModelDeploymentPage",
  components: {
    ProcessSelectComponent,
    ModelSelectComponent,
    ModelApply,
  },
  data() {
    return {
      uploadSuccess: false,
      sendModelApply: false,
      selectedProcess: "",
      selectedModel: "",
      processes: [], // ProcessSelectComponent에서 가져온 공정 목록 저장
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
      activeModelInfo: {},
      isPreviousModel: true,
      file: null,
    };
  },
  methods: {
    setProcesses(processes) {
      this.processes = processes;
    },
    onProcessSelected() {
      // 공정 선택 시 관련 처리가 필요하다면 추가
    },
    async fetchActiveModelInfo() {
      try {
        const response = await axios.get(`http://ec2-18-215-52-54.compute-1.amazonaws.com:8000/model-deployment/model-detail/${this.selectedProcess}`);
        this.activeModelInfo = response.data;
      } catch (error) {
        console.error("현재 사용 중인 모델 정보를 불러오는데 실패했습니다:", error);
      }
    },
    updateModelFileNames(model_file_names) {
      this.models = model_file_names;
    },
    selectPreviousModel() {
      this.isPreviousModel = true;
      this.file = null;
      this.selectedModel = "";
      this.selectedModelInfo = {};
    },
    selectNewModel() {
      this.isPreviousModel = false;
      this.selectedModel = "";
      this.newModelInfo = {
        model_name: "",
        model_version: "",
        python_version: "",
        library: "",
        model_type: "",
        loss: "",
        accuracy: "",
      };
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
    async handleUpload() {
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

      this.displayModelInfo = this.isPreviousModel ? this.selectedModelInfo : this.newModelInfo;
      this.displayModelInfo.deployment_date = new Date().toISOString().slice(0, 19).replace("T", " ");
      this.uploadSuccess = true;
      await this.fetchActiveModelInfo();
    },
    async onModelChange() {
      try {
        const response = await axios.get(`http://ec2-18-215-52-54.compute-1.amazonaws.com:8000/model-deployment/model-info/${this.selectedModel}`);
        this.selectedModelInfo = response.data;
      } catch (error) {
        console.error("모델 정보 로드 실패:", error);
      }
    },
    sendToModelApply() {
      this.sendModelApply = true;
    },
    showPopup(message) {
      alert(message);
    },
  },
};
</script>

<style scoped>
.model-deployment {
  padding: 20px;
  background-color: transparent;
  color: #000000;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.selection-container {
  width: 100%;
  max-width: 1200px;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #000000;
  background-color: transparent;
}

.process-section,
.model-section {
  width: 100%;
  font-size: 1.2em;
  color: #000000;
}

.process-section label,
.model-section label {
  display: block;
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 5px;
}

.process-section select,
.model-section select {
  width: 100vw;
  max-width: 100%;
  padding: 10px;
  font-size: 1em;
  background-color: transparent;
  color: #000000;
  border: 2px solid grey;
  border-radius: 4px;
  appearance: none;
  margin-top: 10px;
}

.model-tabs {
  display: flex;
  gap: 0px;
  justify-content: flex-start;
}

.model-tabs .tab {
  background-color: #f0f0f0;
  color: #000000;
  padding: 10px 15px;
  font-size: 1em;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  flex-grow: 1;
  text-align: left;
  font-weight: bold;
  margin-right: 5px;
  flex-basis: 10%;
}

.model-tabs .tab.active {
  background-color: white;
  color: #000000;
}

.model-tabs .tab:last-child {
  margin-right: 900px;
}

.file-upload {
  display: flex;
  align-items: center;
}

.clear-button {
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  padding: 8px;
  cursor: pointer;
  margin-left: 10px;
}

.combined-info-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.deployment-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.info-container {
  width: 80%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  max-width: 1200px;
}

.info-table {
  width: 50%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.info-table h3 {
  text-align: center; /* 텍스트 중앙 정렬 */
  margin: 0;
  padding: 15px 0;
  font-size: 1.2em;
  font-weight: bold;
}

.performance-table {
  width: 100%;
  border-collapse: collapse;
}

.performance-table th,
.performance-table td {
  padding: 12px;
  border: 1px solid #dddddd;
  font-size: 1.1em;
  text-align: center;
}

.performance-table th {
  background-color: #ff4081;
  color: #ffffff;
}

.model-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.model-details p {
  margin: 0;
}

.upload-button,
.deploy-button {
  margin-top: 20px;
  background-color: #ff4081;
  color: white;
  padding: 12px 24px;
  font-size: 1.2em;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.upload-button:hover,
.deploy-button:hover {
  background-color: #ff5c8a;
}
</style>




