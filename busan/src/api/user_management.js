import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/user-management';

// 사용자 관리 관련 API 호출 함수
export const fetchUserSearch = (query) => axios.get(`${API_BASE_URL}/user-search`, { params: { query } });
export const fetchUserAdd = (data) => axios.post(`${API_BASE_URL}/user-add`, data);
export const fetchUserDetail = (id) => axios.get(`${API_BASE_URL}/user-detail/${id}`);
export const fetchUserList = () => axios.get(`${API_BASE_URL}/user-list`); // 수정: id 파라미터 제거
export const fetchUserSave = (data) => axios.post(`${API_BASE_URL}/user-save`, data);
export const fetchGroupSearch = (query) => axios.get(`${API_BASE_URL}/group-search`, { params: { query } });
export const fetchGroupAdd = (data) => axios.post(`${API_BASE_URL}/group-add`, data);
