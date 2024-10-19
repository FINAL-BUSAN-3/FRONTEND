import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // FastAPI의 기본 URL 설정

// API 호출을 위한 기본 Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
});

// 경영지표 관련 API 호출 함수
export const fetchStockChartData = () => api.get('/management/stock-chart');
export const fetchMonthSalesData = () => api.get('/management/month-sales');
export const fetchYearSalesData = () => api.get('/management/year-sales');
export const fetchPressDailyData = () => api.get('/management/press/day');
export const fetchPressWeeklyData = () => api.get('/management/press/week');
export const fetchPressMonthlyData = () => api.get('/management/press/month');
export const fetchWeldingDailyData = () => api.get('/management/welding/day');
export const fetchWeldingWeeklyData = () => api.get('/management/welding/week');
export const fetchWeldingMonthlyData = () => api.get('/management/welding/month');

// 엔지니어링 지표 관련 API 호출 함수
export const fetchRealtimePressSelect = () => api.get('/engineering/realtime-press/select');
export const fetchRealtimePressInsert = (data) => api.post('/engineering/realtime-press/insert', data);
export const fetchRealtimeWeldingSelect = () => api.get('/engineering/realtime-welding/select');
export const fetchRealtimeWeldingInsert = (data) => api.post('/engineering/realtime-welding/insert', data);
export const fetchPressTrend = () => api.get('/engineering/realtime-press/trend');
export const fetchWeldingTrend = () => api.get('/engineering/realtime-welding/trend');

// 모델 관리 관련 API 호출 함수
export const fetchModelSelect = () => api.get('/model-management/model-select');
export const fetchModelDetail = (id) => api.get(`/model-management/model-select/detail/${id}`); // 예: ID로 세부사항 가져오기

// 모델 배포 관련 API 호출 함수
export const fetchProcessSelect = () => api.get('/model-deployment/process-select');
export const fetchModelInsert = (data) => api.post('/model-deployment/model-insert', data);
export const fetchModelSelectForDeployment = () => api.get('/model-deployment/model-select'); // 모델 선택
export const fetchModelDetailDeployment = (id) => api.get(`/model-deployment/model-detail/${id}`); // 모델 세부사항
export const fetchModelApply = (data) => api.post('/model-deployment/model-apply', data); // 모델 적용

// 소셜 분석 관련 API 호출 함수
export const fetchKeywordData = () => api.get('/social/keyword');
export const fetchNpRatioAll = () => api.get('/social/np-ratio/all');
export const fetchNpRatioCar = () => api.get('/social/np-ratio/car');
export const fetchNpRatioJournal = () => api.get('/social/np-ratio/journal');
export const fetchCountJournal = () => api.get('/social/count/journal');

// 사용자 관리 관련 API 호출 함수
export const fetchUserSearch = (query) => api.get(`/user-management/user-search`, { params: { query } });
export const fetchUserAdd = (data) => api.post('/user-management/user-add', data);
export const fetchUserDetail = (id) => api.get(`/user-management/user-detail/${id}`);
export const fetchUserSave = (data) => api.post('/user-management/user-save', data);
export const fetchGroupSearch = (query) => api.get(`/user-management/group-search`, { params: { query } });
export const fetchGroupAdd = (data) => api.post('/user-management/group-add', data);
