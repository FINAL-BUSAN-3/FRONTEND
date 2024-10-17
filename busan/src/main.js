import { createApp } from 'vue'; // Vue 3.x에서 createApp을 import
import App from './App.vue';
import router from './router'; // 라우터를 사용하는 경우 라우터도 import
// createApp으로 Vue 인스턴스를 생성하고 #app에 마운트
createApp(App)
  .use(router) // 라우터를 사용할 경우 .use(router)를 추가
  .mount('#app');
