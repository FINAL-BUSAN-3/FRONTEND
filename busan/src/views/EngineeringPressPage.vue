<template>
  <!-- Smart Quality Management 화면 -->
  <div class="quality-management-container">
    <h1 class="header-title">Smart Quality Management</h1>
    <div class="quality-details">
      <p>제품명 : {{ latestItem ? latestItem.item_no : 'N/A' }}</p>
      <p>시간 : {{ latestItem ? latestItem.working_time : 'N/A' }}</p>
      <p>양품 여부 : {{ latestItem && latestItem.prediction !== null ? latestItem.prediction : 'N/A' }}</p>
    </div>
  </div>

  <!-- Realtime Press Data and Prediction 화면 -->
  <div class="page-container">
    <h1 class="page-title">Realtime Press Data and Prediction</h1>

    <!-- 애니메이션 요소 -->
    <div class="animation-container">
      <img :src="beltImage" alt="Conveyor Belt" class="background-image" />
      <img :src="facilityImage" alt="Equipment" class="overlay-image" />
      <img v-if="showSpark" :src="sparkImage" alt="Welding Spark" class="overlay-spark" />
      <img :src="carImage" alt="Car Part" class="car-part" :key="animationKey" />
    </div>

    <!-- 통합 데이터 테이블 -->
    <section>
      <h2 class="section-title">Press Data and Prediction</h2>
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
            <th>Working Time</th>
            <th>Press Time (ms)</th>
            <th>Pressure 1</th>
            <th>Pressure 2</th>
            <th>Pressure 5</th>
            <th>Prediction</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in press_raw_data" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.idx }}</td>
            <td>{{ item.machine_name }}</td>
            <td>{{ item.item_no }}</td>
            <td>{{ item.working_time }}</td>
            <td>{{ item.press_time_ms }}</td>
            <td>{{ item.pressure_1 }}</td>
            <td>{{ item.pressure_2 }}</td>
            <td>{{ item.pressure_5 }}</td>
            <td>{{ item.prediction }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 컴포넌트 호출 -->
    <RealtimePressInsertComponents ref="insertComponent" @data-updated="updateInsertData" />
    <RealtimePressSelect ref="selectComponent" @prediction-updated="updatePredictionData" />
  </div>
</template>

<script>
import RealtimePressInsertComponents from '@/components/engineering/RealtimePressInsert.vue';
import RealtimePressSelect from '@/components/engineering/RealtimePressSelect.vue';

// 이미지 파일 import
import beltImage from '@/assets/images/welding_belt.png';
import carImage from '@/assets/images/welding_car.png';
import facilityImage from '@/assets/images/welding_facility.png';
import sparkImage from '@/assets/images/welding_spark.png';

export default {
  name: 'RealtimeWPressgPage',
  components: {
    RealtimePressInsertComponents,
    RealtimePressSelect
  },
  data() {
    return {
      press_raw_data: [],
      lastUpdateInsert: null,
      predictionData: null,
      lastUpdateSelect: null,
      intervalInsert: null,
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
      return this.press_raw_data.length > 0 ? this.press_raw_data[this.press_raw_data.length - 1] : null;
    }
  },
  async mounted() {
    // INSERT 데이터는 5초마다 가져오고, 들어올 때 애니메이션 실행
    this.intervalInsert = setInterval(this.fetchInsertData, 5000);
  },
  beforeUnmount() {
    clearInterval(this.intervalInsert); // 컴포넌트 해제 시 INSERT 인터벌 제거
  },
  methods: {
    async fetchInsertData() {
      await this.$refs.insertComponent.fetchInsertData();  // INSERT 데이터 가져오기
      this.startAnimation();  // INSERT가 들어올 때 애니메이션 시작

      // 3초 후에 SELECT 데이터를 가져오도록 설정
      setTimeout(() => {
        this.fetchSelectData();
      }, 1000);
    },
    async fetchSelectData() {
      await this.$refs.selectComponent.fetchSelectData();  // SELECT 데이터 가져오기
    },
    updateInsertData({ press_raw_data, lastUpdateInsert }) {
      // 기존 데이터에 새 데이터를 누적하여 추가
      this.press_raw_data.push(...press_raw_data.map(item => ({
        ...item,
        prediction: null // 예측 데이터를 위해 빈 상태로 초기화
      })));
      this.lastUpdateInsert = lastUpdateInsert;
    },
    updatePredictionData({ predictionData, lastUpdateSelect }) {
      // 마지막으로 추가된 데이터에 예측 데이터 추가
      if (this.press_raw_data.length > 0) {
        this.press_raw_data[this.press_raw_data.length - 1].prediction = predictionData;
      }
      this.lastUpdateSelect = lastUpdateSelect;
    },
    startAnimation() {
      this.animationKey += 1; // key값을 변경하여 애니메이션 리셋

      // 3초 후 spark 이미지 표시
      setTimeout(() => {
        this.showSpark = true;
      }, 2200);

      // 4초 후 spark 이미지 숨기기
      setTimeout(() => {
        this.showSpark = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
/* Smart Quality Management 스타일 */
.quality-management-container {
  background-color: #2D2D44;
  color: #FFFFFF;
  padding: 20px;
  border: 1px solid #FFFFFF;
  text-align: center;
  max-width: 600px;
  margin: auto;
}

.header-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.quality-details {
  font-size: 18px;
  line-height: 1.8;
  text-align: left;
  padding-left: 20px;
}

/* Realtime Press Data and Prediction 스타일 */
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
  max-height: 300px; /* 스크롤 추가 */
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
  animation: moveToEquipment 2s ease forwards, waitAtEquipment 1s 2s ease forwards, moveToEnd 1s 3s ease forwards;
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
  100% { transform: translateY(-50%) translateX(100%); }
}

@keyframes waitAtEquipment {
  0% { transform: translateY(-50%) translateX(100%); }
  100% { transform: translateY(-50%) translateX(100%); }
}

@keyframes moveToEnd {
  0% { transform: translateY(-50%) translateX(100%); }
  100% { transform: translateY(-50%) translateX(250%); }
}
</style>
