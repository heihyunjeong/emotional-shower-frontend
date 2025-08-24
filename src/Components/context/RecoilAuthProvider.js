import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../state/authState';

function RecoilAuthProvider({ children }) {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    // 기존 AuthProvider와 동일하게 'id' 키 사용
    const storedUserId = localStorage.getItem('id');
    if (storedUserId) {
      setUser(storedUserId); // JSON.parse 제거, 단순 문자열
    }
  }, [setUser]);

  return children;
}

export default RecoilAuthProvider;