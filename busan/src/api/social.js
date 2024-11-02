import axios from 'axios';

const API_BASE_URL = 'http://ec2-18-215-52-54.compute-1.amazonaws.com:8000/social';

// 소셜 분석 관련 API 호출 함수
export const fetchKeyWord = () => api.get('${API_BASE_URL}/keyword');
export const fetchNpratioAll = () => api.get('${API_BASE_URL}/np-ratio/all');
export const fetchNpratioCar = () => api.get('${API_BASE_URL}/np-ratio/car');
export const fetchNpratioJournal = () => api.get('${API_BASE_URL}/np-ratio/journal');
export const fetchCountJournal = () => api.get('${API_BASE_URL}/count/journal');