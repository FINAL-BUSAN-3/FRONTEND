<template>
  <div class="dashboard">
    <MonthSales class="full-width" />
    <div class="charts-container full-width">
      <PressPie />
      <WeldingPie />
      <StockChart />
    </div>
    <div class="line-charts-container full-width">
      <YearlySales />
    </div>
  </div>
</template>

<script>
import MonthSales from '../components/MonthSales.vue';
import WeldingPie from '../components/WeldingPie.vue';
import PressPie from '../components/PressPie.vue';
import StockChart from '../components/StockChart.vue';
import YearlySales from '../components/YearlySales.vue';

export default {
  name: "ManagementView",
  components: {
    MonthSales,
    WeldingPie,
    PressPie,
    StockChart,
    YearlySales
  }
};
</script>

<style scoped>
.dashboard {
  background-color: #eaf3f9;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.full-width {
  width: 90%;
  max-width: 1400px;
}

.charts-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 15px;
  margin-bottom: 30px;
  min-height: 400px; /* 아래로 더 확장 */
}

.charts-container > * {
  flex: 1;
  margin: 0 10px;
  max-width: 300px;
  height: 300px;
}

.line-charts-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 15px;
  margin-top: 30px;
  min-height: 300px; /* 아래로 더 확장 */
}

/* 프레스, 용접 제목 폰트 크기 조정 */
h3 {
  font-size: 1.5em;
  text-align: center;
}

/* 일간/주간/월간 버튼 크기 조정 */
.button-group {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.button-group button {
  padding: 10px 20px; /* 크기 증가 */
  font-size: 1.1em; /* 폰트 크기 증가 */
  margin: 0 5px;
  background-color: #eaeaea;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
</style>
