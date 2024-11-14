<template>
  <div class="model-apply"></div>
</template>

<script>
import axios from "axios";

export default {
  name: "ModelApply",
  props: {
    modelData: Object,
    modelFile: File,
  },
  async mounted() {
    await this.sendToFastAPI();
  },
  methods: {
    async sendToFastAPI() {
      const formData = new FormData();

      formData.append("model_name", this.modelData.model_name);
      formData.append("model_version", this.modelData.model_version);
      formData.append("python_version", this.modelData.python_version);
      formData.append("library", this.modelData.library);
      formData.append("deployment_date", this.modelData.deployment_date);
      formData.append("model_type", this.modelData.model_type);
      formData.append("loss", this.modelData.loss);
      formData.append("accuracy", this.modelData.accuracy);

      if (this.modelFile) {
        formData.append("file", this.modelFile);
      }

      try {
        const response = await axios.post("http://ec2-18-215-52-54.compute-1.amazonaws.com:8000/model-deployment/model-apply", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 200) {
          this.$emit("deploy-success");
        } else {
          this.$emit("deploy-failure");
        }
      } catch (error) {
        console.error("배포 중 오류:", error);
        this.$emit("deploy-failure");
      }
    },
  },
};
</script>

<style scoped>
/* 스타일 정의 */
</style>