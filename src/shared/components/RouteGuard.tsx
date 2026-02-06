import { Navigate, useLocation } from 'react-router-dom';
import { usePhase } from '../hooks/usePhase';
import { ROUTER_URL } from '@/shared/constants/url';

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const { currentMode, isLoading } = usePhase();

  // 서버 시간 동기화 중
  if (isLoading) return null;

  // 1. 지원서 작성 페이지: Mode 2일 때만 허용
  if (pathname === ROUTER_URL.APPLICATION && currentMode !== 2) {
    return <Navigate to={ROUTER_URL.APPLY_UNAVAILABLE} replace />;
  }

  // 2. 서류 결과 확인(입력창/결과창): Mode 4일 때만 허용
  if ((pathname === ROUTER_URL.CHECK_DOCUMENT || pathname === ROUTER_URL.RESULT_DOCUMENT) && currentMode !== 4) {
    return <Navigate to={ROUTER_URL.RESULT_UNAVAILABLE} replace />;
  }

  // 3. 최종 결과 확인(입력창/결과창): Mode 5일 때만 허용
  if ((pathname === ROUTER_URL.CHECK_FINAL || pathname === ROUTER_URL.RESULT_FINAL) && currentMode !== 5) {
    return <Navigate to={ROUTER_URL.RESULT_UNAVAILABLE} replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;
