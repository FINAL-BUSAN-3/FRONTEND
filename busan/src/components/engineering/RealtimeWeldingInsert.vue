<template>
  <div />
</template>

<script>
export default {
  name: 'RealtimeWeldingInsertComponents',
  data() {
    return {
      welding_raw_data: {}, // 최근 수신된 데이터 저장
      socket: null,
    };
  },
  methods: {
    startSocket() {
      this.socket = new WebSocket('ws://localhost:8000/engineering/ws/realtime-welding/insert');

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received data in RealtimeWeldingInsertComponents:", data); // 콘솔 로그
        this.welding_raw_data = data;
        const lastUpdateInsert = new Date().toLocaleTimeString();
        this.$emit('data-updated', { welding_raw_data: this.welding_raw_data, lastUpdateInsert });
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