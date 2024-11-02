import axios from 'axios';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://ec2-18-215-52-54.compute-1.amazonaws.com:8000/model-deployment',
});

// 모델 배포 관련 API 호출 함수
export const fetchProcessSelect = () => api.get('/process-select');
export const fetchModelInsert = () => api.get('/model-insert');
export const fetchModelSelect = () => api.get('/model-select');
export const fetchModelDetail = () => api.get('/model-detail');
export const fetchModelApply = (modelData) => api.post('/model-apply', modelData);