<template>
  <div class="page-container">
    <h1 class="page-title">Realtime Welding Data and Prediction</h1>

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
            <th>Working Time</th>
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
            <td>{{ item.idx }}</td>
            <td>{{ item.machine_name }}</td>
            <td>{{ item.item_no }}</td>
            <td>{{ item.working_time }}</td>
            <td>{{ item.thickness_1_mm }}</td>
            <td>{{ item.thickness_2_mm }}</td>
            <td>{{ item.welding_force_bar }}</td>
            <td>{{ item.welding_current_ka }}</td>
            <td>{{ item.weld_voltage_v }}</td>
            <td>{{ item.weld_time_ms }}</td>
            <td v-if="index === 0">{{ predictionData }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 애니메이션 요소 -->
    <div class="animation-container">
      <img :src="beltImage" alt="Conveyor Belt" class="background-image" />
      <img :src="facilityImage" alt="Equipment" class="overlay-image" />
      <img v-if="showSpark" :src="sparkImage" alt="Welding Spark" class="overlay-spark" />
      <img :src="carImage" alt="Car Part" class="car-part" :key="animationKey" />
    </div>

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
      }, 3000);
    },
    async fetchSelectData() {
      await this.$refs.selectComponent.fetchSelectData();  // SELECT 데이터 가져오기
    },
    updateInsertData({ welding_raw_data, lastUpdateInsert }) {
      this.welding_raw_data = welding_raw_data;
      this.lastUpdateInsert = lastUpdateInsert;
    },
    updatePredictionData({ predictionData, lastUpdateSelect }) {
      this.predictionData = predictionData;
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
.page-container {
  background-color: #2E2E2E;
  color: #FFFFFF;
  padding: 20px;
}

.page-title, .section-title, .last-update {
  color: #FFFFFF;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #2E2E2E;
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

/* 컨베이어 벨트와 설비 이미지에 동일한 스타일 */
.background-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1; /* belt 이미지 가장 아래 */
}

.car-part {
  position: absolute;
  width: 15%;
  top: 50%;
  transform: translateY(-50%) translateX(-150%);
  z-index: 2; /* car 이미지 */
  animation: moveToEquipment 2s ease forwards, waitAtEquipment 1s 2s ease forwards, moveToEnd 1s 3s ease forwards;
}

.overlay-spark {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 3; /* spark 이미지 */
  visibility: visible;
  opacity: 1;
}

.overlay-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 4; /* facility 이미지 최상단 */
}

/* 애니메이션 단계 */
@keyframes moveToEquipment {
  0% {
    transform: translateY(-50%) translateX(-150%);
  }
  100% {
    transform: translateY(-50%) translateX(100%);
  }
}

@keyframes waitAtEquipment {
  0% {
    transform: translateY(-50%) translateX(100%);
  }
  100% {
    transform: translateY(-50%) translateX(100%);
  }
}

@keyframes moveToEnd {
  0% {
    transform: translateY(-50%) translateX(100%);
  }
  100% {
    transform: translateY(-50%) translateX(250%);
  }
}
</style>
