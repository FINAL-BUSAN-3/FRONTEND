<template>
  <div class="model-management">

    <div v-if="!uploadSuccess" class="content-container">
      <!-- 왼쪽: 모델 선택 및 세부 정보 -->
      <div class="left-panel">
        <div class="model-section">
          <label for="model-select" class="model-label">모델</label>
          <div v-if="isPreviousModel">
            <ModelSelectComponent @update:modelFileNames="updateModelFileNames" />
            <select id="model-select" v-model="selectedModel" @change="onModelChange">
              <option value="" disabled>모델을 선택해 주세요</option>
              <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
            </select>
          </div>
        </div>

        <div class="combined-info-container" v-if="selectedModelInfo.model_name">
          <div class="model-info">
            <div class="model-details">
              <p>* 공정명: <span>{{ selectedModelInfo.process_name || '' }}</span></p>
              <p>* 모델명: <span>{{ selectedModelInfo.model_name || '' }}</span></p>
              <p>* 모델 버전: <span>{{ selectedModelInfo.model_version || '' }}</span></p>
              <p>* 파이썬 버전: <span>{{ selectedModelInfo.python_version || '' }}</span></p>
              <p>* 라이브러리: <span>{{ selectedModelInfo.library || '' }}</span></p>
              <p>* 모델 종류: <span>{{ selectedModelInfo.model_type || '' }}</span></p>
              <p>* 배포 날짜: <span>{{ selectedModelInfo.deployment_date || '' }}</span></p>
              <p>* Loss: <span>{{ selectedModelInfo.loss || '-' }}</span></p>
              <p>* Accuracy: <span>{{ selectedModelInfo.accuracy || '-' }}</span></p>
            </div>
          </div>
        </div>
      </div>

      <!-- 오른쪽: 정확도와 손실 그래프 -->
      <div class="right-panel">
        <ModelAvgAccuracy @update:modelAccuracy="handleModelAccuracy" />
        <ModelAvgLoss @update:modelLoss="handleModelLoss" />

        <h3>최근 3개 모델 평균 정확도</h3>
        <canvas id="accuracyChart"></canvas>

        <h3>최근 3개 모델 평균 손실 값</h3>
        <canvas id="lossChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import ModelSelectComponent from "@/components/model_management/ModelSelect.vue";
import ModelAvgAccuracy from "@/components/model_management/ModelAvgAccuracy.vue";
import ModelAvgLoss from "@/components/model_management/ModelAvgLoss.vue";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "ModelManagementPage",
  components: {
    ModelSelectComponent,
    ModelAvgAccuracy,
    ModelAvgLoss,
  },
  data() {
    return {
      uploadSuccess: false,
      selectedModel: "",
      models: [],
      selectedModelInfo:{
      process_name: " ",
      model_name: " ",
      model_version: " ",
      python_version: " ",
      library: " ",
      model_type: " ",
      deployment_date: " ",
      loss: " ",
      accuracy: " "
    },
      isPreviousModel: true,
      accuracyData: [],
      lossData: [],
      accuracyChart: null,
      lossChart: null,
    };
  },
  methods: {
    async fetchActiveModelInfo() {
      try {
        const response = await axios.get("http://localhost:8000/model-management/model-detail");
        this.activeModelInfo = response.data;
      } catch (error) {
        console.error("현재 사용 중인 모델 정보를 불러오는데 실패했습니다:", error);
      }
    },
    updateModelFileNames(model_file_names) {
      this.models = model_file_names;
    },
    async onModelChange() {
      try {
        const response = await axios.get(`http://localhost:8000/model-management/model-info/${this.selectedModel}`);
        this.selectedModelInfo = response.data;
      } catch (error) {
        console.error("모델 정보 로드 실패:", error);
      }
    },
    handleModelAccuracy(data) {
      this.accuracyData = data;
      this.renderAccuracyChart();
    },
    handleModelLoss(data) {
      this.lossData = data;
      this.renderLossChart();
    },
    renderAccuracyChart() {
  const labels = this.accuracyData.map(model => model.model_name).reverse(); // 레이블을 역순으로
  const data = this.accuracyData.map(model => model.accuracy).reverse(); // 데이터를 역순으로

  const ctx = document.getElementById('accuracyChart').getContext('2d');
  if (this.accuracyChart) {
    this.accuracyChart.destroy();
  }
  this.accuracyChart = new ChartJS(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'AVG Accuracy (Bar)',
          type: 'bar',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'AVG Accuracy (Line)',
          type: 'line',
          data: data,
          borderColor: 'rgba(0, 0, 255, 0.8)',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          fill: false,
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Accuracy',
          },
        },
      },
    },
  });
},

renderLossChart() {
  const labels = this.lossData.map(model => model.model_name).reverse(); // 레이블을 역순으로
  const data = this.lossData.map(model => model.loss).reverse(); // 데이터를 역순으로

  const ctx = document.getElementById('lossChart').getContext('2d');
  if (this.lossChart) {
    this.lossChart.destroy();
  }
  this.lossChart = new ChartJS(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'AVG Loss (Bar)',
          type: 'bar',
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'AVG Loss (Line)',
          type: 'line',
          data: data,
          borderColor: 'rgba(255, 0, 0, 0.8)',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          fill: false,
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Loss',
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    this.fetchActiveModelInfo();
  }
};
</script>

<style scoped>
.model-management {
  padding: 35px;
  background-color: transparent;
  color: black;
  width: 100%;
  max-width: 1200px;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.3em;
}

h3 {
  font-size: 1.1em; /* 제목 글씨 크기 조정 */
  margin-bottom: 10px; /* 제목과 그래프 사이 간격 */
  font-weight: bold; /* 굵게 표시 */
  margin: 10px auto 0 auto; /* 상단에 20px 여백 추가 */
}

.content-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 5px;
}

.left-panel {
  flex: 1;
  min-width: 300px;
}

.right-panel {
  flex: 1;
  min-width: 300px;
}

.model-section {
  margin-bottom: 20px;
}

.model-label {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px; /* 모델 라벨 아래에 간격 추가 */
}

#model-select {
  width: 85%;
  padding: 8px;
  font-size: 1.1em;
  border-radius: 5px;
  border: 2px solid #ccc;
  margin-top: 15px; /* 모델 선택 드롭다운 위에 간격 추가 */
}

.model-details {
  font-size: 1.1em; /* model-detail 부분의 글씨 크기 조정 */
}

canvas {
  width: 100%;
  height: 300px;
}

.right-panel canvas {
  margin-bottom: 20px; /* 그래프 사이 간격을 조정 */
}

.left-panel {
  flex: 1;
  min-width: 300px;
  margin-top: 8px; /* 왼쪽 패널에만 상단 간격 추가 */
}

.right-panel {
  flex: 1;
  min-width: 400px;
  margin-top: 3px; /* 왼쪽 패널에만 상단 간격 추가 */
}
</style>
