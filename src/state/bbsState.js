import { atom, selector } from 'recoil';

// 게시판 목록 관련 상태
export const bbsListState = atom({
  key: 'bbsListState',
  default: [],
});

// 페이징 관련 상태
export const currentPageState = atom({
  key: 'currentPageState',
  default: 1,
});

export const pageSizeState = atom({
  key: 'pageSizeState',
  default: 10,
});

export const totalPagesState = atom({
  key: 'totalPagesState',
  default: 0,
});

export const totalCntState = atom({
  key: 'totalCntState',
  default: 0,
});

// 검색 관련 상태
export const choiceValState = atom({
  key: 'choiceValState',
  default: '',
});

export const searchValState = atom({
  key: 'searchValState',
  default: '',
});

// 로딩 상태
export const isLoadingState = atom({
  key: 'isLoadingState',
  default: false,
});

// 계산된 상태 (selector)
export const searchParamsSelector = selector({
  key: 'searchParamsSelector',
  get: ({ get }) => {
    const page = get(currentPageState);
    const choiceVal = get(choiceValState);
    const searchVal = get(searchValState);
    
    return {
      page: page - 1,
      title: choiceVal === "title" ? searchVal : "",
      content: choiceVal === "content" ? searchVal : "",
      writerName: choiceVal === "writer" ? searchVal : "",
    };
  },
});