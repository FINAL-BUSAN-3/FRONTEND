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
      <img :src="pressBackground" alt="Background" class="background-image overlay-position" />
      <img :src="pressBelt" alt="Belt" class="belt-image overlay-position" />
      <img :src="pressPlate" alt="Plate" class="plate-image animatePlate" />
      <img :src="pressPart" alt="Part" class="part-image animatePart" />
      <img :src="pressFixedFacility" alt="Fixed Facility" class="fixed-facility overlay-position" />
      <img :src="pressMovedFacility" alt="Moved Facility" class="moved-facility overlay-position move-up-down" />
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
          <tr v-for="(item, index) in limitedPressData" :key="index">
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
      showPlate: false,
      showPart: false,
      press_raw_data: [],
      lastUpdateInsert: null,
      lastUpdateSelect: null
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
  mounted() {
    this.startAnimation();
    this.intervalInsert = setInterval(this.fetchInsertData, 5000);
  },
  beforeUnmount() {
    clearInterval(this.intervalInsert);
    clearInterval(this.animationInterval);
  },
  methods: {
    startAnimation() {
      this.showPlate = true;
      this.showPart = true;
    },
    async fetchInsertData() {
      try {
        await this.$refs.insertComponent.fetchInsertData();
        this.lastUpdateInsert = new Date().toLocaleString();
        setTimeout(() => {
          this.fetchSelectData();
        }, 1000);
      } catch (error) {
        console.error("Error fetching insert data:", error);
      }
    },
    async fetchSelectData() {
      try {
        await this.$refs.selectComponent.fetchSelectData();
        this.lastUpdateSelect = new Date().toLocaleString();
      } catch (error) {
        console.error("Error fetching select data:", error);
      }
    },
    updateInsertData({ press_raw_data, lastUpdateInsert }) {
      this.press_raw_data.push(...press_raw_data.map(item => ({
        ...item,
        prediction: null
      })));
      this.lastUpdateInsert = lastUpdateInsert;
    },
    updatePredictionData({ predictionData, lastUpdateSelect }) {
      if (this.press_raw_data.length > 0) {
        this.press_raw_data[this.press_raw_data.length - 1].prediction = predictionData;
      }
      this.lastUpdateSelect = lastUpdateSelect;
    }
  }
};
</script>

<style scoped>
.page-container {
  background-color: #2E2E2E;
  color: #FFFFFF;
  padding: 20px;
  margin-top: 20px;
}

.animation-container {
  position: relative;
  width: 100%;
  height: 300px; /* 높이 확장 */
  display: flex;
  align-items: center;
}

/* 동일한 가로세로 크기 및 위치 통일 */
.overlay-position {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.moved-facility {
  animation: moveUpDown 5s infinite;
  height: 80%; /* 세로 길이를 조정하고 싶다면 이 값을 변경 */
}


/* Plate 초기 위치 설정과 애니메이션 */
.plate-image {
  position: absolute;
  top: 50%;
  transform: translateY(-70%) translateX(50%);
}

@keyframes movePlate {
  0%, 20% { transform: translateY(-70%) translateX(50%); }
  80% { transform: translateY(-70%) translateX(600%); }
  100% { transform: translateY(-70%) translateX(600%); }
}

.animatePlate {
  animation: movePlate 5s linear infinite;
}

/* Part 초기 위치 설정과 애니메이션 */
.part-image {
  position: absolute;
  top: 50%;
  transform: translateY(-80%) translateX(590%);
}

@keyframes movePart {
  0%, 20% { transform: translateY(-80%) translateX(430%); }
  80% { transform: translateY(-80%) translateX(800%); }
  100% { transform: translateY(-80%) translateX(800%); }
}

.animatePart {
  animation: movePart 5s linear infinite;
}

/* Moved Facility 애니메이션 */
@keyframes moveUpDown {
  0% { transform: translateY(-65px); }
  20% { transform: translateY(-150px); }
  80% { transform: translateY(-150px); }
  100% { transform: translateY(-65px); }
}

.move-up-down {
  animation: moveUpDown 5s infinite;
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