<template>
  <div class="quality-management-container">
    <div class="quality-details">
      <h1 class="header-title">Smart Quality Management</h1>
      <p>제품명 : {{ latestItem ? latestItem.item_no : 'N/A' }}</p>
      <p>시간 : {{ latestItem ? latestItem.trend_time : 'N/A' }}</p>
      <p>양품 여부 : {{ latestItem && latestItem.prediction !== null ? latestItem.prediction : '판정 중' }}</p>
      <p>
        <a href="http://ec2-100-24-7-128.compute-1.amazonaws.com:8088/superset/dashboard/14/" target="_blank">
          데이터 분석 보러가기
        </a>
      </p>
    </div>
    <img :src="carImage" alt="Car Part" class="quality-car-image" />
  </div>

  <!-- 공정 중단 팝업 -->
  <div v-if="processStopped" class="popup">
    <p>불량이 예측되어 공정이 중단되었습니다. 다시 가동하시겠습니까?</p>
    <button @click="resumeProcess">재가동</button>
  </div>

  <div class="page-container">
    <h1 class="page-title">Realtime Welding Data and Prediction</h1>

    <div class="animation-container">
      <img :src="beltImage" alt="Conveyor Belt" class="background-image" />
      <img :src="facilityImage" alt="Equipment" class="overlay-image" />
      <img :src="sparkImage" alt="Welding Spark" class="overlay-spark" :class="{ 'spark-visible': showSpark }" />
      <img :src="carImage" alt="Car Part" :class="['car-part', carAnimationStage]" />
    </div>

    <section>
      <h2 class="section-title">Welding Data and Prediction</h2>
      <p v-if="lastUpdateInsert || lastUpdateSelect" class="last-update">
        Last update: {{ lastUpdateInsert || lastUpdateSelect }}
      </p>
      <button @click="resetData" class="reset-button">데이터 리셋</button>
      <table class="data-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Machine Name</th>
            <th>Item No</th>
            <th>Trend Time</th>
            <th>Thickness 1 (mm)</th>
            <th>Thickness 2 (mm)</th>
            <th>Welding Force Bar</th>
            <th>Welding Current (ka)</th>
            <th>Weld Voltage (v)</th>
            <th>Weld Time (ms)</th>
            <th>Prediction</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in welding_raw_data" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.machine_name }}</td>
            <td>{{ item.item_no }}</td>
            <td>{{ item.trend_time }}</td>
            <td>{{ item.thickness_1_mm }}</td>
            <td>{{ item.thickness_2_mm }}</td>
            <td>{{ item.welding_force_bar }}</td>
            <td>{{ item.welding_current_ka }}</td>
            <td>{{ item.weld_voltage_v }}</td>
            <td>{{ item.weld_time_ms }}</td>
            <td>{{ item.prediction !== null ? item.prediction : 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <RealtimeWeldingInsertComponents ref="insertComponent" @data-updated="updateInsertData" />
    <RealtimeWeldingSelect ref="selectComponent" @prediction-updated="updatePredictionData" />
  </div>
</template>

<script>
import RealtimeWeldingInsertComponents from '@/components/engineering/RealtimeWeldingInsert.vue';
import RealtimeWeldingSelect from '@/components/engineering/RealtimeWeldingSelect.vue';

import beltImage from '@/assets/images/welding_belt.png';
import carImage from '@/assets/images/welding_car.png';
import facilityImage from '@/assets/images/welding_facility.png';
import sparkImage from '@/assets/images/welding_spark.png';

export default {
  name: 'EngineeringWeldingPage',
  components: {
    RealtimeWeldingInsertComponents,
    RealtimeWeldingSelect
  },
  data() {
    return {
      welding_raw_data: [],
      lastUpdateInsert: null,
      lastUpdateSelect: null,
      carAnimationStage: '',
      showSpark: false,
      processStopped: false,
      beltImage,
      carImage,
      facilityImage,
      sparkImage
    };
  },
  computed: {
    latestItem() {
      return this.welding_raw_data.length > 0 ? this.welding_raw_data[this.welding_raw_data.length - 1] : null;
    },
  },
  mounted() {
    const savedData = localStorage.getItem('weldingData');
    if (savedData) {
      this.welding_raw_data = JSON.parse(savedData);
    }
  },
  watch: {
    welding_raw_data: {
      deep: true,
      handler(newData) {
        localStorage.setItem('weldingData', JSON.stringify(newData));
      }
    }
  },
  methods: {
    updateInsertData({ welding_raw_data, lastUpdateInsert }) {
      if (this.processStopped) return; // 중단 시 업데이트 중지

      const flattenedData = { ...welding_raw_data.inserted_data, prediction: welding_raw_data.prediction };
      this.welding_raw_data.push(flattenedData); // 데이터 표에 추가
      this.lastUpdateInsert = lastUpdateInsert;
      this.carAnimationStage = 'moveToEquipment';
    },

    updatePredictionData({ predictionData, lastUpdateSelect }) {
      if (this.processStopped) return; // 중단 시 업데이트 중지

      if (this.welding_raw_data.length > 0) {
        const lastData = { ...this.welding_raw_data[this.welding_raw_data.length - 1] };
        lastData.prediction = predictionData;
        this.welding_raw_data.splice(this.welding_raw_data.length - 1, 1, lastData); // 마지막 행에 prediction 업데이트
        this.welding_raw_data = [...this.welding_raw_data]; // 강제로 반응성 트리거
      }
      this.lastUpdateSelect = lastUpdateSelect;

      this.triggerSparkAnimation(); // 스파크 애니메이션 발생

      if (predictionData === 1 && !this.processStopped) {
        this.handleProcessStopped();
        setTimeout(() => {
          this.carAnimationStage = 'moveToEnd';
          this.showPopup();
        }, 300);
      } else if (predictionData !== 1) {
        this.carAnimationStage = 'moveToEnd';
      }
    },

    triggerSparkAnimation() {
      this.showSpark = true;
      setTimeout(() => {
        this.showSpark = false;
      }, 300);
    },

    showPopup() {
      this.processStopped = true;
    },

    handleProcessStopped() {
      this.processStopped = true;
    },

    async resumeProcess() {
      this.processStopped = false;
      try {
        const response = await fetch("http://ec2-18-215-52-54.compute-1.amazonaws.com:8000/resume-process", { method: 'POST' });
        if (response.ok) {
          console.log("Process resumed");
        }
      } catch (error) {
        console.error("Error resuming process:", error);
      }
    },

    resetData() {
      this.welding_raw_data = [];
      localStorage.removeItem('weldingData');
      this.lastUpdateInsert = null;
      this.lastUpdateSelect = null;
    }
  }
};
</script>


<style scoped>
.quality-management-container {
  background-color: #2E2E2E;
  color: #FFFFFF;
  padding: 20px;
  border: 1px solid #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  margin: auto;
}

.quality-details {
  font-size: 18px;
  line-height: 1.8;
  text-align: left;
  padding-left: 150px;
  flex: 1;
}

.header-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.quality-car-image {
  width: 300px;
  height: auto;
  margin-left: 20px;
}

.popup {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
  padding: 20px;
  z-index: 1000;
}

.page-container {
  background-color: #2E2E2E;
  color: #FFFFFF;
  padding: 20px;
  margin-top: 20px;
}

.page-title, .section-title, .last-update {
  color: #FFFFFF;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #2E2E2E;
  overflow-y: auto;
  max-height: 300px;
  display: block;
}

.data-table th, .data-table td {
  border: 1px solid #444;
  padding: 8px;
  text-align: center;
}

.data-table th {
  background-color: #333;
  color: #FFFFFF;
}

.data-table td {
  color: #FFFFFF;
}

.animation-container {
  position: relative;
  width: 100%;
  height: 300px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.background-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.car-part {
  position: absolute;
  width: 15%;
  top: 50%;
  transform: translateY(-50%) translateX(-150%);
  z-index: 2;
}

.overlay-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 3;
}

.overlay-spark {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 4;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.overlay-spark.spark-visible {
  opacity: 1;
}

@keyframes moveToEquipment {
  0% { transform: translateY(-50%) translateX(-150%); }
  100% { transform: translateY(-50%) translateX(115%); }
}

@keyframes moveToEnd {
  0% { transform: translateY(-50%) translateX(115%); }
  100% { transform: translateY(-50%) translateX(300%); }
}

.car-part.moveToEquipment {
  animation: moveToEquipment 1.5s ease forwards;
}

.car-part.moveToEnd {
  animation: moveToEnd 2s ease forwards;
}
</style>
