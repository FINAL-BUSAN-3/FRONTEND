<script>
import axios from 'axios';

export default {
  name: 'ModelSelectComponent',
  data() {
    return {
      models: [], // FastAPI로부터 받아온 모델 정보들을 저장할 배열
    };
  },
  async created() {
    await this.fetchModelSelect(); // 컴포넌트가 생성될 때 데이터를 불러옴
  },
  methods: {
    async fetchModelSelect() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/model-deployment/model-select');
        this.models = response.data.models; // 모델 데이터를 models에 저장
        this.$emit('update:modelFileNames', this.models.map((model) => model.model_info_id)); // 부모 컴포넌트에 model_info_id 목록 전달
      } catch (error) {
        console.error('Failed to fetch model data:', error);
      }
    },
    async selectModel(model_info_id) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/model-deployment/model-info/${model_info_id}`);
        this.$emit('modelSelected', response.data); // 선택된 모델 정보를 부모 컴포넌트로 전달
      } catch (error) {
        console.error('Failed to fetch model info:', error);
      }
    }
  }
};
</script>
