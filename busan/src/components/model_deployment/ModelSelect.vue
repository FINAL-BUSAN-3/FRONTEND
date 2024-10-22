<script>
import axios from 'axios';

export default {
  name: 'ModelSelectComponent',
  data() {
    return {
      model_file_names: [] // FastAPI로부터 받아온 데이터를 저장할 배열
    };
  },
  async created() {
    await this.fetchModelSelect(); // 컴포넌트가 생성될 때 데이터를 불러옴
  },
  methods: {
    async fetchModelSelect() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/model-deployment/model-select');
        this.model_file_names = response.data.model_file_names; // 데이터를 model_file_names에 저장
        this.$emit('update:modelFileNames', this.model_file_names); // 부모 컴포넌트에 데이터 전달
      } catch (error) {
        console.error('Failed to fetch model_file_names:', error);
      }
    }
  }
};
</script>