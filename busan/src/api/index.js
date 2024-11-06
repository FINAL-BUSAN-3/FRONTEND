import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // FastAPI의 기본 URL 설정

// API 호출을 위한 기본 Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
});

export default api;
