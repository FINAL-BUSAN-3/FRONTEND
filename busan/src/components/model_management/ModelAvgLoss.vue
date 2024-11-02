
<script>
import axios from 'axios';

export default {
  name: 'ModelAvgLoss',
  data() {
    return {
      model_loss: [], // 평균 손실 값을 가진 모델 정보
    };
  },
  async created() {
    await this.fetchModelAvgLoss(); // 컴포넌트 생성 시 데이터 가져오기
  },
  methods: {
    async fetchModelAvgLoss() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/model-management/model-avg-loss');
        this.model_loss = response.data.models;
        this.$emit('update:modelLoss', this.model_loss); // 부모 컴포넌트로 데이터 전달
      } catch (error) {
        console.error('평균 손실 데이터를 불러오는 데 실패했습니다:', error);
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
