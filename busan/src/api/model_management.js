import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/model-management';

// 모델 선택 및 세부사항 관련 API 호출 함수
export const fetchModelSelectForManagement = () => axios.get(`${API_BASE_URL}/model-select`);
export const fetchModelDetailForManagement = (id) => axios.get(`${API_BASE_URL}/model-select/detail/${id}`);