<template>
  <div />
</template>

<script>
export default {
  name: 'RealtimePressInsertComponents',
  data() {
    return {
      press_raw_data: {}, // 최근 수신된 데이터 저장
      socket: null,
    };
  },
  methods: {
    startSocket() {
      this.socket = new WebSocket('ws://ec2-18-215-52-54.compute-1.amazonaws.com:8000/engineering/ws/realtime-press/insert');

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.press_raw_data = data; // 수신한 데이터 저장
        const lastUpdateInsert = new Date().toLocaleTimeString();
        this.$emit('data-updated', { press_raw_data: this.press_raw_data, lastUpdateInsert });
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.socket.onclose = () => {
        console.log('WebSocket closed');
      };
    }
  },
  mounted() {
    this.startSocket();
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.close();
    }
  }
};
</script>

<style scoped>
/* 스타일 추가 */
</style>