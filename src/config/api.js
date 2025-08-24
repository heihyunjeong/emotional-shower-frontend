// API 기본 URL 설정
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8989'
    : 'https://your-backend-server.com'); // 실제 서버 주소로 변경하세요

export default API_BASE_URL;

// API 엔드포인트 정의
export const API_ENDPOINTS = {
  // 사용자 관련
  USER: {
    LOGIN: '/user/login',
    REGISTER: '/user/register',
    CHECK_ID: '/user/checkId',
    CHECK_PWD: '/user/checkPwd',
    UPDATE: '/user/update'
  },
  
  // 게시판 관련
  BOARD: {
    LIST: '/board/list',                                // 게시글 목록 (페이징)
    SEARCH: '/board/search',                            // 게시글 검색
    WRITE: '/board/write',                              // 게시글 작성
    DETAIL: (boardId) => `/board/${boardId}`,           // 게시글 상세
    UPDATE: (boardId) => `/board/${boardId}/update`,    // 게시글 수정
    DELETE: (boardId) => `/board/${boardId}/delete`,    // 게시글 삭제
  },

  // 댓글 관련
  COMMENT: {
    LIST: (boardId) => `/board/${boardId}/comment/list`,              // 댓글 목록
    WRITE: (boardId) => `/board/${boardId}/comment/write`,            // 댓글 작성
    UPDATE: (boardId, commentId) => `/board/${boardId}/comment/update/${commentId}`,  // 댓글 수정
    DELETE: (boardId, commentId) => `/board/${boardId}/comment/delete/${commentId}`,  // 댓글 삭제
  },

  // 파일 관련
  FILE: {
    UPLOAD: (boardId) => `/board/${boardId}/file/upload`,   // 파일 업로드
    DOWNLOAD: (boardId) => `/board/${boardId}/file/download`, // 파일 다운로드
    DELETE: (boardId) => `/board/${boardId}/file/delete`,   // 파일 삭제
  }
};

// Axios 기본 설정
export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15초 타임아웃 (파일 업로드 고려)
};

// 파일 업로드용 설정
export const FILE_UPLOAD_CONFIG = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 30000, // 30초 타임아웃
};

// 인증이 필요한 API용 헤더 생성 함수
export const getAuthHeaders = () => {
  const token = localStorage.getItem("bbs_access_token");
  return {
    ...API_CONFIG.headers,
    'Authorization': `Bearer ${token}`
  };
};

// 파일 업로드용 인증 헤더
export const getAuthFileHeaders = () => {
  const token = localStorage.getItem("bbs_access_token");
  return {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
  };
};

// 페이징 파라미터 생성 함수
export const createPageParams = (page = 0, size = 10, sort = 'id', direction = 'desc') => {
  return {
    page,
    size,
    sort: `${sort},${direction}`
  };
};

// 검색 파라미터 생성 함수
export const createSearchParams = (title = '', content = '', writerName = '', page = 0, size = 5) => {
  return {
    title,
    content,
    writerName,
    page,
    size,
    sort: 'id,desc'
  };
};

// 댓글 페이징 파라미터 생성 함수
export const createCommentPageParams = (page = 0, size = 5, sort = 'id', direction = 'desc') => {
  return {
    page,
    size,
    sort: `${sort},${direction}`
  };
};