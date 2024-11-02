<template>
  <div class="model-management">
    <h2>모델 배포</h2>

    <!-- 모델 정보 화면 -->
    <div v-if="!uploadSuccess">
      <div class="selection-container">
        <div class="model-section">
          <label for="model-select">모델</label>
          <div v-if="isPreviousModel">
            <ModelSelectComponent @update:modelFileNames="updateModelFileNames" />
            <select id="model-select" v-model="selectedModel" @change="onModelChange">
              <option value="" disabled>모델을 선택해 주세요</option>
              <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 모델 정보와 성능 표 -->
      <div class="combined-info-container" v-if="selectedModelInfo.model_name">
        <div class="model-info">
          <div class="model-icon">
            <img src="@/assets/model_icon_black.png" alt="모델 아이콘" />
          </div>
          <div class="model-details">
            <p>* 공정명: <span>{{ selectedModelInfo.process_name || '' }}</span></p>
            <p>* 모델명: <span>{{ selectedModelInfo.model_name || '' }}</span></p>
            <p>* 모델 버전: <span>{{ selectedModelInfo.model_version || '' }}</span></p>
            <p>* 파이썬 버전: <span>{{ selectedModelInfo.python_version || '' }}</span></p>
            <p>* 라이브러리: <span>{{ selectedModelInfo.library || '' }}</span></p>
            <p>* 모델 종류: <span>{{ selectedModelInfo.model_type || '' }}</span></p>
            <p>* 배포 날짜: <span>{{ selectedModelInfo.deployment_date || '' }}</span></p>
          </div>
        </div>
      </div>

      <!-- 정확도와 손실을 위한 컴포넌트 -->
      <ModelAvgAccuracy ref="accuracyComponent" />
      <ModelAvgLoss ref="lossComponent" />

      <!-- 정확도 그래프 -->
      <h3>최근 3개 모델 평균 정확도</h3>
      <canvas id="accuracyChart"></canvas>

      <!-- 손실 그래프 -->
      <h3>최근 3개 모델 평균 손실 값</h3>
      <canvas id="lossChart"></canvas>
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
      selectedModelInfo: {},
      isPreviousModel: true,
      accuracyData: [], // 정확도 데이터를 저장할 배열
      lossData: [], // 손실 데이터를 저장할 배열
    };
  },
  methods: {
    async fetchActiveModelInfo() {
      try {
        const response = await axios.get("http://ec2-18-215-52-54.compute-1.amazonaws.com:8000/model-management/model-detail");
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
        const response = await axios.get(`http://ec2-18-215-52-54.compute-1.amazonaws.com:8000/model-management/model-info/${this.selectedModel}`);
        this.selectedModelInfo = response.data;
      } catch (error) {
        console.error("모델 정보 로드 실패:", error);
      }
    },
    async loadData() {
      const accuracyComponent = this.$refs.accuracyComponent;
      const lossComponent = this.$refs.lossComponent;

      if (accuracyComponent && lossComponent) {
        this.accuracyData = accuracyComponent.model_accuracy; // 정확도 데이터 가져오기
        this.lossData = lossComponent.model_loss; // 손실 데이터 가져오기

        this.renderAccuracyChart(); // 정확도 차트 렌더링
        this.renderLossChart(); // 손실 차트 렌더링
      }
    },
    renderAccuracyChart() {
      const labels = this.accuracyData.map(model => model.model_name);
      const data = this.accuracyData.map(model => model.accuracy);
      const ctx = document.getElementById('accuracyChart').getContext('2d');
      new ChartJS(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'AVG Accuracy',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }]
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
      const labels = this.lossData.map(model => model.model_name);
      const data = this.lossData.map(model => model.loss);
      const ctx = document.getElementById('lossChart').getContext('2d');
      new ChartJS(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'AVG Loss',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          }]
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
  async created() {
    await this.fetchActiveModelInfo();
    await this.loadData(); // 데이터를 로드하고 차트를 렌더링
  }
};
</script>

<style scoped>
.model-management {
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

.model-section {
  width: 100%;
  margin-bottom: 20px;
}

.chart-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

canvas {
  width: 48%;
  height: 300px; /* 차트 높이 설정 */
}
</style>
