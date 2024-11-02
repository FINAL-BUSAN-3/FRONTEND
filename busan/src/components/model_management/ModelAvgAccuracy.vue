
<script>
import axios from 'axios';

export default {
  name: 'ModelAvgAccuracy',
  data() {
    return {
      model_accuracy: [], // 평균 정확도를 가진 모델 정보
    };
  },
  async created() {
    await this.fetchModelAvgAccuracy(); // 컴포넌트 생성 시 데이터 가져오기
  },
  methods: {
    async fetchModelAvgAccuracy() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/model-management/model-avg-accuracy');
        this.model_accuracy = response.data.models;
        this.$emit('update:modelAccuracy', this.model_accuracy); // 데이터 업데이트 이벤트 발생
      } catch (error) {
        console.error('평균 정확도 데이터를 불러오는 데 실패했습니다:', error);
      }
    },
  },
};
</script>


<style scoped>
.performance-table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
