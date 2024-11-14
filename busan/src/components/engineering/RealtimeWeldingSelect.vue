<template>
  <div />
</template>

<script>
export default {
  name: 'RealtimeWeldingSelect',
  data() {
    return {
      predictionData: {},
      socket: null,
    };
  },
  methods: {
    startSocket() {
      this.socket = new WebSocket('ws://ec2-18-215-52-54.compute-1.amazonaws.com:8000/engineering/ws/realtime-welding/select');

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.predictionData = data.welding_prediction;
        const lastUpdateSelect = new Date().toLocaleTimeString();
        this.$emit('prediction-updated', { predictionData: this.predictionData, lastUpdateSelect });

        if (data.stop_event) {
          this.$emit('process-stopped');
        }
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
/* 스타일 설정 */
</style>