<template>
  <div />
</template>

<script>
import axios from 'axios';

export default {
  name: 'RealtimeWeldingInsertComponents',
  methods: {
    async fetchInsertData() {
      try {
        const response = await axios.get('http://localhost:8000/engineering/realtime-welding/insert');
        const welding_raw_data = response.data.welding_data;
        const lastUpdateInsert = new Date().toLocaleTimeString();
        this.$emit('data-updated', { welding_raw_data, lastUpdateInsert });
      } catch (error) {
        console.error('Failed to fetch welding_data:', error);
      }
    }
  }
};
</script>
