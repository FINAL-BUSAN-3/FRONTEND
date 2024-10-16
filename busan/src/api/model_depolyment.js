import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/model-deployment';

// 프로세스 선택 및 모델 관련 API 호출 함수
export const fetchProcessSelect = () => axios.get(`${API_BASE_URL}/process-select`);
export const fetchModelInsert = (data) => axios.post(`${API_BASE_URL}/model-insert`, data);
export const fetchModelSelectForDeployment = () => axios.get(`${API_BASE_URL}/model-select`);
export const fetchModelDetail = (id) => axios.get(`${API_BASE_URL}/model-detail/${id}`);
export const fetchModelApply = (data) => axios.post(`${API_BASE_URL}/model-apply`, data);
