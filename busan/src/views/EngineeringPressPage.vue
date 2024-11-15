<template>
  <!-- Smart Quality Management 화면 -->
  <div class="quality-management-container">
    <div class="quality-details">
      <h1 class="header-title">Smart Quality Management</h1>
      <p>제품명 : {{ latestItem ? latestItem.item_no : 'N/A' }}</p>
      <p>시간 : {{ latestItem ? latestItem.working_time : 'N/A' }}</p>
      <p>양품 여부 : {{ latestItem && latestItem.prediction !== null ? latestItem.prediction : '판정 중' }}</p>

  <!-- Realtime Press Data and Prediction 화면 -->
  <div class="page-container">
    <h1 class="page-title">Realtime Press Data and Prediction</h1>

    <!-- 애니메이션 요소 -->
    <div class="animation-container">
      <img :src="pressBackground" alt="Background" class="background-image overlay-position" />
      <img :src="pressBelt" alt="Belt" class="belt-image overlay-position" />
      <img v-if="showPlate" :src="pressPlate" alt="Plate" class="plate-image" :class="plateAnimationStage" />
      <img v-if="showPart" :src="pressPart" alt="Part" class="part-image" :class="partAnimationStage" />
      <img :src="pressFixedFacility" alt="Fixed Facility" class="fixed-facility overlay-position" />
      <!-- Moved Facility는 항상 표시 -->
      <img :src="pressMovedFacility" alt="Moved Facility" class="moved-facility overlay-position" :style="{ transform: movedFacilityPosition }" :class="{ 'move-down': moveMovedFacilityDown, 'move-up': moveMovedFacilityUp }" />
    </div>

    <!-- 통합 데이터 테이블 -->
    <section>
      <h2 class="section-title">Press Data and Prediction</h2>
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
            <th>Press Time (ms)</th>
            <th>Pressure 1</th>
            <th>Pressure 2</th>
            <th>Pressure 5</th>
            <th>Prediction</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in limitedPressData" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.machine_name }}</td>
            <td>{{ item.item_no }}</td>
            <td>{{ item.trend_time }}</td>
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
import pressBackground from '@/assets/images/press_background.png';
import pressBelt from '@/assets/images/press_belt.png';
import pressPlate from '@/assets/images/press_plate.png';
import pressPart from '@/assets/images/press_part.png';
import pressFixedFacility from '@/assets/images/press_fixed_facility.png';
import pressMovedFacility from '@/assets/images/press_moved_facility.png';
import RealtimePressInsertComponents from '@/components/engineering/RealtimePressInsert.vue';
import RealtimePressSelect from '@/components/engineering/RealtimePressSelect.vue';

export default {
  name: 'RealtimePressPage',
  components: {
    RealtimePressInsertComponents,
    RealtimePressSelect
  },
  data() {
    return {
      pressBackground,
      pressBelt,
      pressPlate,
      pressPart,
      pressFixedFacility,
      pressMovedFacility,
      press_raw_data: [],
      lastUpdateInsert: null,
      lastUpdateSelect: null,
      plateAnimationStage: '', // Plate 애니메이션 상태
      partAnimationStage: '', // Part 애니메이션 상태
      showPlate: false, // Plate 표시 상태
      showPart: false, // Part 표시 상태
      moveMovedFacilityUp: false, // Moved Facility 하->상 이동 애니메이션 제어
      moveMovedFacilityDown: false, // Moved Facility 상->하 이동 애니메이션 제어
      movedFacilityPosition: 'translateY(-100px)' // Moved Facility의 초기 위치
    };
  },
  computed: {
    latestItem() {
      return this.press_raw_data.length > 0 ? this.press_raw_data[this.press_raw_data.length - 1] : null;
    },
    limitedPressData() {
      const maxRows = 50;
      return this.press_raw_data.slice(-maxRows);
    }
  },
  methods: {
    // 데이터 수신 시 Plate 이동 -> Moved Facility 하->상 이동
    updateInsertData({ press_raw_data, lastUpdateInsert }) {
      console.log("Data received in EngineeringPressPage:", press_raw_data);

      const flattenedData = { ...press_raw_data.inserted_data, prediction: press_raw_data.prediction };
      this.press_raw_data = [...this.press_raw_data, flattenedData];
      this.lastUpdateInsert = lastUpdateInsert;

      // Plate 이동 애니메이션 시작
      this.showPlate = true;
      this.plateAnimationStage = 'moveToEquipment';

      setTimeout(() => {
        this.plateAnimationStage = ''; // Plate 이동 후 애니메이션 초기화
        this.showPlate = false; // Plate 숨기기

        // Moved Facility 이동 애니메이션 (하->상)
        this.moveMovedFacilityUp = true;
        setTimeout(() => {
          this.moveMovedFacilityUp = false; // 이동 완료 후 Moved Facility 초기화
          this.movedFacilityPosition = 'translateY(-60px)'; // -65px로 고정
        }, 500);
      }, 2000);
    },

    // 예측 데이터 수신 시 Moved Facility 상->하 이동 -> Part 이동
    updatePredictionData({ predictionData }) {
      if (this.press_raw_data.length > 0) {
        this.press_raw_data[this.press_raw_data.length - 1].prediction = predictionData;
      }
      this.lastUpdateSelect = new Date().toLocaleString();

      // Moved Facility 이동 애니메이션 (상->하)
      this.moveMovedFacilityDown = true;
      setTimeout(() => {
        this.moveMovedFacilityDown = false; // 이동 완료 후 초기화
        this.movedFacilityPosition = 'translateY(-100px)'; // -150px로 고정

        // Part 이동 애니메이션 시작
        this.showPart = true;
        this.partAnimationStage = 'moveToEnd';
        
        setTimeout(() => {
          this.partAnimationStage = ''; // 이동 완료 후 Part 애니메이션 초기화
          this.showPart = false; // Part 숨기기
        }, 2000);
      }, 500);
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

.quality-press-part-image {
  width: 200px; /* 이미지 크기 조정 */
  height: auto;
  transform: translateX(-50px); /* 음수 값을 증가시켜 더 왼쪽으로 이동 */
  margin-right: 20px; /* 오른쪽 여백 추가로 다른 요소들과 간격 확보 */
}

.page-container {
  background-color: #2E2E2E;
  color: #FFFFFF;
  padding: 20px;
  margin-top: 20px;
}

.animation-container {
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
}

.overlay-position {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Plate 이동 애니메이션 */
.plate-image {
  position: absolute;
  top: 50%;
  transform: translateY(-70%) translateX(50%);
  z-index: 2;
}

@keyframes moveToEquipment {
  0% { transform: translateY(-70%) translateX(50%); }
  100% { transform: translateY(-70%) translateX(600%); }
}

.plate-image.moveToEquipment {
  animation: moveToEquipment 2s ease forwards;
}

/* Part 이동 애니메이션 */
.part-image {
  position: absolute;
  top: 50%;
  transform: translateY(-80%) translateX(430%);
  z-index: 2;
}

@keyframes moveToEnd {
  0% { transform: translateY(-80%) translateX(430%); }
  100% { transform: translateY(-80%) translateX(800%); }
}

.part-image.moveToEnd {
  animation: moveToEnd 2s ease forwards;
}

/* Moved Facility 상하 이동 애니메이션 */
.moved-facility {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  z-index: 3;
  transform: translateY(-100px); /* 기본 위치를 -150px로 고정 */
}

/* 하 -> 상 이동 */
@keyframes moveUp {
  0% { transform: translateY(-100px); }
  100% { transform: translateY(-60px); }
}

.move-up {
  animation: moveUp 0.5s ease forwards;
}

/* 상 -> 하 이동 */
@keyframes moveDown {
  0% { transform: translateY(-60px); }
  100% { transform: translateY(-100px); }
}

.move-down {
  animation: moveDown 0.5s ease forwards;
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
</style>
