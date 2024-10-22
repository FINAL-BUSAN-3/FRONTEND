import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/model-deployment';

// 모델 배포 관련 API 호출 함수
export const fetchProcessSelect = () => api.get('${API_BASE_URL}/process-select');
export const fetchModelInsert = () => api.get('${API_BASE_URL}/model-insert');
export const fetchModelSelect = () => api.get('${API_BASE_URL}/model-select');
export const fetchModelDetail = () => api.get('${API_BASE_URL}/model-detail');
export const fetchModelApply = () => api.get('${API_BASE_URL}/model-apply');
