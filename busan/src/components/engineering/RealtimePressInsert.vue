<template>
  <div />
</template>

<script>
import axios from 'axios';

export default {
  name: 'RealtimePressInsertComponents',
  methods: {
    async fetchInsertData() {
      try {
        const response = await axios.get('http://localhost:8000/engineering/realtime-press/insert');
        const press_raw_data = response.data.press_data;
        const lastUpdateInsert = new Date().toLocaleTimeString();
        this.$emit('data-updated', { press_raw_data, lastUpdateInsert });
      } catch (error) {
        console.error('Failed to fetch welding_data:', error);
      }
    }
  }
};
</script>
