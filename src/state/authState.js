import { atom, selector } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: localStorage.getItem('id') || null, // 기존과 동일하게 'id' 키 사용
});

export const isAuthenticatedState = selector({
  key: 'isAuthenticatedState',
  get: ({ get }) => {
    const user = get(userState);
    return user !== null && user !== '';
  },
});

export const userRoleState = selector({
  key: 'userRoleState',
  get: ({ get }) => {
    const user = get(userState);
    return user?.role || 'guest';
  },
});