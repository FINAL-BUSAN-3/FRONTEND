// api/user_management.js
import api from './index'; // 공통 Axios 인스턴스를 import

const USER_API_BASE_URL = '/user-management';

//// 사용자 관리 관련 API 호출 함수
//export const fetchUserList = () => api.get(`${USER_API_BASE_URL}/user-list`);
//export const fetchUserSearch = (query) => api.get(`${USER_API_BASE_URL}/user-search`, { params: { query } });
//export const fetchUserAdd = (data) => api.post(`${USER_API_BASE_URL}/user-add`, data);
//export const fetchUserDetail = (id) => api.get(`${USER_API_BASE_URL}/user-detail/${id}`);
//export const fetchUserSave = (data) => api.post(`${USER_API_BASE_URL}/user-save`, data);
//export const fetchGroupSearch = (query) => api.get(`${USER_API_BASE_URL}/group-search`, { params: { query } });
//export const fetchGroupAdd = (data) => api.post(`${USER_API_BASE_URL}/group-add`, data);



// 사용자 관리 관련 API 호출 함수
export const fetchUserList = () => api.get('${USER_API_BASE_URL}/user-list');
export const fetchUserSearch = () => api.get('${USER_API_BASE_URL}/user-search');

//export const fetchUserAdd = () => api.get('${USER_API_BASE_URL}/user-add');
export const fetchUserAdd = (userData) => api.post('${USER_API_BASE_URL}/user-add, userData');

export const fetchUserDetail = () => api.get('${USER_API_BASE_URL}/user-detail');
export const fetchUserSave = () => api.get('${USER_API_BASE_URL}/user-save');

//export const fetchUserDelete = () => api.get('${USER_API_BASE_URL}/user-delete');
export const fetchUserDelete = (employeeNo) => api.delete('${USER_API_BASE_URL}/user-delete/${employeeNo}');

export const fetchGroupSearch = () => api.get('${USER_API_BASE_URL}/group-search');

//export const fetchGroupAdd = () => api.get('${USER_API_BASE_URL}/group-add');
export const fetchGroupAdd = (groupData) => api.get('${USER_API_BASE_URL}/group-add', groupData);

export const fetchGroupList = () => api.get('${USER_API_BASE_URL}/group-list');
export const fetchGroupDelete = () => api.get('${USER_API_BASE_URL}/group-delete');




// 사용자 삭제 (GET -> DELETE로 수정)
//export const fetchUserDelete = (employeeNo) => api.delete(`${USER_API_BASE_URL}/user-delete/${employeeNo}`);

// 권한 삭제 (GET -> DELETE로 수정)
//export const fetchGroupDelete = (groupName) => api.delete(`${USER_API_BASE_URL}/group-delete/${groupName}`);
