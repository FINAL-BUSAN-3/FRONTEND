<template>
  <div />
</template>

<script>
import axios from 'axios';

export default {
  name: 'RealtimeWeldingSelect',
  methods: {
    async fetchSelectData() {
      try {
        const response = await axios.get('http://localhost:8000/engineering/realtime-welding/select');
        const predictionData = response.data.welding_prediction;
        const lastUpdateSelect = new Date().toLocaleTimeString();
        this.$emit('prediction-updated', { predictionData, lastUpdateSelect });
      } catch (error) {
        console.error('Failed to fetch prediction data:', error);
      }
    }
  }
};
</script>
