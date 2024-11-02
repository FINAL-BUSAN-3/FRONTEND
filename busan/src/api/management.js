import axios from 'axios';

const API_BASE_URL = 'http://ec2-18-215-52-54.compute-1.amazonaws.com:8000/management';

// 경영지표 관련 API 호출 함수
export const fetchStockChart = () => api.get('${API_BASE_URL}/stock');
export const fetchDaySales = () => api.get('${API_BASE_URL}/day-sales');
export const fetchMonthSales = () => api.get('${API_BASE_URL}/month-sales');
export const fetchYearSales = () => api.get('${API_BASE_URL}/year-sales');
export const fetchPressDay = () => api.get('${API_BASE_URL}/press/day');
export const fetchPressWeek = () => api.get('${API_BASE_URL}/press/week');
export const fetchPressMonth = () => api.get('${API_BASE_URL}/press/month');
export const fetchWeldingDay = () => api.get('${API_BASE_URL}/welding/day');
export const fetchWeldingWeek = () => api.get('${API_BASE_URL}/welding/week');
export const fetchWeldingMonth = () => api.get('${API_BASE_URL}/welding/month');
