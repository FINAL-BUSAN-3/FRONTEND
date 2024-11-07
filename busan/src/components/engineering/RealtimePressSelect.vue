<template>
  <div />
</template>

<script>
import axios from 'axios';

export default {
  name: 'RealtimePressSelect',
  methods: {
    async fetchSelectData() {
      try {
        const response = await axios.get('http://localhost:8000/engineering/realtime-press/select');
        const predictionData = response.data.press_prediction;
        const lastUpdateSelect = new Date().toLocaleTimeString();
        this.$emit('prediction-updated', { predictionData, lastUpdateSelect });
      } catch (error) {
        console.error('Failed to fetch prediction data:', error);
      }
    }
  }
};
</script>
