<template>
  <div>
    <canvas ref="defectReportChart"></canvas>
  </div>
</template>

<script>
import { Chart, LineController, CategoryScale, LinearScale, LineElement, PointElement } from "chart.js";
Chart.register(LineController, CategoryScale, LinearScale, LineElement, PointElement);

export default {
  mounted() {
    new Chart(this.$refs.defectReportChart, {
      type: "line",
      data: {
        labels: ["1월", "2월", "3월", "4월", "5월"],
        datasets: [
          {
            label: "결함 신고 횟수",
            data: [3, 7, 5, 9, 11],
          },
        ],
      },
    });
  },
};
</script>

