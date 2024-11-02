import axios from 'axios';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8000/model-management',
});

// 모델 배포 관련 API 호출 함수

export const fetchModelSelectForManagement = () => api.get('/model-select');
export const fetchModelDetailForManagement = () => api.get('/model-detail');
export const fetchModelAvgAccuracy = () => api.get('/model-avg-accuracy');
export const fetchModelAvgLoss = () => api.get('/model-avg-accuracy');
