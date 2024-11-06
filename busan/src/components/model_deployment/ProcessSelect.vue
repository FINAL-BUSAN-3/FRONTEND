<script>
import axios from 'axios';

export default {
  name: 'ProcessSelectComponent',
  data() {
    return {
      processes: [] // FastAPI에서 받아온 공정 목록
    };
  },
  async created() {
    await this.fetchProcesses(); // 컴포넌트 생성 시 공정 목록을 가져옴
  },
  methods: {
    async fetchProcesses() {
      try {
        const response = await axios.get('http://localhost:8000/model-deployment/process-select');
        this.processes = response.data.processes;
        this.$emit('processesLoaded', this.processes); // 부모 컴포넌트에 공정 목록 전달
      } catch (error) {
        console.error('공정 목록을 가져오는 데 실패했습니다:', error);
      }
    }
  }
};
</script>
