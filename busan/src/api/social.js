import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/social';

// 소셜 분석 관련 API 호출 함수
export const fetchKeywordData = () => axios.get(`${API_BASE_URL}/keyword`);
export const fetchNpRatioAll = () => axios.get(`${API_BASE_URL}/np-ratio/all`);
export const fetchNpRatioCar = () => axios.get(`${API_BASE_URL}/np-ratio/car`);
export const fetchNpRatioJournal = () => axios.get(`${API_BASE_URL}/np-ratio/journal`);
export const fetchCountJournal = () => axios.get(`${API_BASE_URL}/count/journal`);
