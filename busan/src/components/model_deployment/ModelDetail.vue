<template>
  <div>
    <!-- 모델 데이터 로드 완료 후 이벤트를 통해 부모 컴포넌트로 전달 -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ModelDetail",
  data() {
    return {
      activeModelInfo: null, // state=1인 모델의 정보를 저장
    };
  },
  async created() {
    await this.fetchActiveModelInfo();
  },
  methods: {
    async fetchActiveModelInfo() {
      try {
        const response = await axios.get("http://localhost:8000/model-deployment/model-detail");
        this.activeModelInfo = response.data;
        this.$emit("update:activeModelInfo", this.activeModelInfo); // 부모 컴포넌트로 전달
      } catch (error) {
        console.error("Error fetching active model info:", error);
      }
    },
  },
};
</script>
