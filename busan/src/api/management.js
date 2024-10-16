import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/management';

// 재고 관련 API 호출 함수
export const fetchStockData = () => axios.get(`${API_BASE_URL}/stock`);

// 월별 매출 데이터 호출
export const fetchMonthSalesData = () => axios.get(`${API_BASE_URL}/month-sales`);

// 프레스 데이터 호출
export const fetchPressDailyData = () => axios.get(`${API_BASE_URL}/press/day`);
export const fetchPressWeeklyData = () => axios.get(`${API_BASE_URL}/press/week`);
export const fetchPressMonthlyData = () => axios.get(`${API_BASE_URL}/press/month`);

// 용접 데이터 호출
export const fetchWeldingDailyData = () => axios.get(`${API_BASE_URL}/welding/day`);
export const fetchWeldingWeeklyData = () => axios.get(`${API_BASE_URL}/welding/week`);
export const fetchWeldingMonthlyData = () => axios.get(`${API_BASE_URL}/welding/month`);
