<template>
  <div v-if="isAuthenticated" class="dashboard-embed">
    <iframe
      :src="dashboardUrl"
      frameborder="0"
      width="100%"
      height="100%"
      style="border: none;"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,  // CSRF 토큰을 성공적으로 가져와 세션이 활성화되었는지 여부
      dashboardUrl: "http://ec2-100-24-7-128.compute-1.amazonaws.com:8088/superset/dashboard/1/",
    };
  },
  async created() {
    // CSRF 토큰을 먼저 가져온 후, 세션이 활성화되었는지 확인합니다.
    const csrfToken = await this.getCsrfToken();

    if (csrfToken) {
      // CSRF 토큰을 정상적으로 가져온 경우, 인증 완료로 간주하여 iframe을 로드합니다.
      this.isAuthenticated = true;
    } else {
      console.error("CSRF 토큰을 가져오는 데 실패했습니다.");
    }
  },
  methods: {
    async getCsrfToken() {
      try {
        // Superset의 CSRF 토큰 엔드포인트에 요청하여 토큰을 가져옵니다.
        const response = await fetch("http://ec2-100-24-7-128.compute-1.amazonaws.com:8088/api/v1/security/csrf_token/", {
          credentials: "include", // 세션 쿠키 포함
        });

        if (response.ok) {
          const data = await response.json();
          console.log("CSRF Token:", data?.result);  // 디버깅을 위한 CSRF 토큰 확인
          return data?.result; // CSRF 토큰 반환
        } else {
          console.error("CSRF 토큰을 가져오는 데 실패했습니다.", response.statusText);
        }
      } catch (error) {
        console.error("CSRF 토큰을 가져오는 중 오류가 발생했습니다:", error);
      }
      return null;
    },
  },
};
</script>

<style>
.dashboard-embed {
  width: 100vw;
  height: 100vh;
}
</style>
