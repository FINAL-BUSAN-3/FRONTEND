<template>
  <div />
</template>

<script>
export default {
  name: 'RealtimeWeldingSelect',
  data() {
    return {
      predictionData: {}, // 수신한 예측 데이터 저장
      socket: null,
    };
  },
  methods: {
    startSocket() {
      this.socket = new WebSocket('ws://localhost:8000/engineering/ws/realtime-welding/select');

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.predictionData = data.welding_prediction; // 웹소켓으로부터 예측 결과 수신
        const lastUpdateSelect = new Date().toLocaleTimeString();
        this.$emit('prediction-updated', { predictionData: this.predictionData, lastUpdateSelect });
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
