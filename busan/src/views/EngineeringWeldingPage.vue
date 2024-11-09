<template>
  <!-- Smart Quality Management 화면 -->
  <div class="quality-management-container">
    <div class="quality-details">
      <h1 class="header-title">Smart Quality Management</h1>
      <p>제품명 : {{ latestItem ? latestItem.item_no : 'N/A' }}</p>
      <p>시간 : {{ latestItem ? latestItem.trend_time : 'N/A' }}</p>
      <p>양품 여부 : {{ latestItem && latestItem.prediction !== null ? latestItem.prediction : '판정 중' }}</p>
    </div>
    <img :src="carImage" alt="Car Part" class="quality-car-image" />
  </div>

  <!-- Realtime Welding Data and Prediction 화면 -->
  <div class="page-container">
    <h1 class="page-title">Realtime Welding Data and Prediction</h1>

    <!-- 애니메이션 요소 -->
    <div class="animation-container">
      <img :src="beltImage" alt="Conveyor Belt" class="background-image" />
      <img :src="facilityImage" alt="Equipment" class="overlay-image" />
      <img v-if="showSpark" :src="sparkImage" alt="Welding Spark" class="overlay-spark" />
      <img :src="carImage" alt="Car Part" class="car-part" :key="animationKey" />
    </div>

    <!-- 통합 데이터 테이블 -->
    <section>
      <h2 class="section-title">Welding Data and Prediction</h2>
      <p v-if="lastUpdateInsert || lastUpdateSelect" class="last-update">
        Last update: {{ lastUpdateInsert || lastUpdateSelect }}
      </p>
      <table class="data-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Idx</th>
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
          <tr v-for="(item, index) in limitedWeldingData" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.idx }}</td>
            <td>{{ item.machine_name }}</td>
            <td>{{ item.item_no }}</td>
            <td>{{ item.trend_time }}</td>
            <td>{{ item.thickness_1_mm }}</td>
            <td>{{ item.thickness_2_mm }}</td>
            <td>{{ item.welding_force_bar }}</td>
            <td>{{ item.welding_current_ka }}</td>
            <td>{{ item.weld_voltage_v }}</td>
            <td>{{ item.weld_time_ms }}</td>
            <td>{{ item.prediction }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 컴포넌트 호출 -->
    <RealtimeWeldingInsertComponents ref="insertComponent" @data-updated="updateInsertData" />
    <RealtimeWeldingSelect ref="selectComponent" @prediction-updated="updatePredictionData" />
  </div>
</template>

<script>
import RealtimeWeldingInsertComponents from '@/components/engineering/RealtimeWeldingInsert.vue';
import RealtimeWeldingSelect from '@/components/engineering/RealtimeWeldingSelect.vue';

// 이미지 파일 import
import beltImage from '@/assets/images/welding_belt.png';
import carImage from '@/assets/images/welding_car.png';
import facilityImage from '@/assets/images/welding_facility.png';
import sparkImage from '@/assets/images/welding_spark.png';

export default {
  name: 'RealtimeWeldingPage',
  components: {
    RealtimeWeldingInsertComponents,
    RealtimeWeldingSelect
  },
  data() {
    return {
      welding_raw_data: [],
      lastUpdateInsert: null,
      predictionData: null,
      lastUpdateSelect: null,
      animationKey: 0, // 애니메이션 강제 리셋을 위한 키값
      showSpark: false, // spark 이미지 on/off 제어
      // 이미지 경로 설정
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
    limitedWeldingData() {
      const maxRows = 50;
      return this.welding_raw_data.slice(-maxRows);
    }
  },
  methods: {
    updateInsertData({ welding_raw_data }) {
      this.welding_raw_data.push(welding_raw_data);
      this.lastUpdateInsert = new Date().toLocaleString();
      this.animationKey += 1; // 애니메이션을 재시작
      setTimeout(() => {
        this.triggerSparkAnimation(); // 3초 후에 스파크 애니메이션 트리거
      }, 2700); // 3초 대기 후 트리거
    },
    updatePredictionData({ predictionData }) {
      if (this.welding_raw_data.length > 0) {
        this.welding_raw_data[this.welding_raw_data.length - 1].prediction = predictionData;
      }
      this.lastUpdateSelect = new Date().toLocaleString();
    },
    triggerSparkAnimation() {
      this.showSpark = true;
      setTimeout(() => {
        this.showSpark = false;
      }, 500); // 스파크 이미지를 1초 동안 표시
    }
  }
};
</script>

<style scoped>
/* Smart Quality Management 스타일 */
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
  width: 500px;
  height: auto;
  margin-left: 20px;
}

/* Realtime Welding Data and Prediction 스타일 */
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

/* 애니메이션 스타일 */
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

.background-image, .overlay-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.car-part {
  position: absolute;
  width: 15%;
  top: 50%;
  transform: translateY(-50%) translateX(-150%);
  z-index: 2;
  animation: moveToEquipment 2.7s ease forwards, moveToEnd 2.3s ease 3s forwards;
}

.overlay-spark {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 3;
}

/* 애니메이션 단계 */
@keyframes moveToEquipment {
  0% { transform: translateY(-50%) translateX(-150%); }
  100% { transform: translateY(-50%) translateX(115%); }
}

@keyframes moveToEnd {
  0% { transform: translateY(-50%) translateX(115%); }
  100% { transform: translateY(-50%) translateX(300%); }
}
</style>
