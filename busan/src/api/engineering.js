import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/engineering';

// 엔지니어링 지표 관련 API 호출 함수
export const fetchRealtimePressSelect = () => api.get('${API_BASE_URL}/realtime-press/select');
export const fetchRealtimePressInsert = () => api.get('${API_BASE_URL}/realtime-press/insert');
export const fetchRealtimeWeldingSelect = () => api.get('${API_BASE_URL}/realtime-welding/select');
export const fetchRealtimeWeldingInsert = () => api.get('${API_BASE_URL}/realtime-welding/insert');
export const fetchPressTrend = () => api.get('${API_BASE_URL}/realtime-press/trend');
export const fetchWeldingTrend = () => api.get('${API_BASE_URL}/realtime-welding/trend');