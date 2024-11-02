<template>
  <div>
    <canvas ref="mediaCoverageChart"></canvas>
  </div>
</template>

<script>
import { Chart, LineController, CategoryScale, LinearScale, LineElement, PointElement } from "chart.js";
Chart.register(LineController, CategoryScale, LinearScale, LineElement, PointElement);

export default {
  mounted() {
    new Chart(this.$refs.mediaCoverageChart, {
      type: "line",
      data: {
        labels: ["1월", "2월", "3월", "4월", "5월"],
        datasets: [
          {
            label: "기재 횟수",
            data: [15, 25, 20, 30, 40],
          },
        ],
      },
    });
  },
};
</script>

