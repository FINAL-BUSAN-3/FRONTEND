import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/engineering';

// 실시간 프레스 관련 API 호출 함수
export const fetchRealtimePressSelect = () => axios.get(`${API_BASE_URL}/realtime-press/select`);
export const fetchRealtimePressInsert = (data) => axios.post(`${API_BASE_URL}/realtime-press/insert`, data);

// 실시간 용접 관련 API 호출 함수
export const fetchRealtimeWeldingSelect = () => axios.get(`${API_BASE_URL}/realtime-welding/select`);
export const fetchRealtimeWeldingInsert = (data) => axios.post(`${API_BASE_URL}/realtime-welding/insert`, data);

// 프레스 및 용접 추세 관련 API 호출
export const fetchPressTrend = () => axios.get(`${API_BASE_URL}/realtime-press/trend`);
export const fetchWeldingTrend = () => axios.get(`${API_BASE_URL}/realtime-welding/trend`);
