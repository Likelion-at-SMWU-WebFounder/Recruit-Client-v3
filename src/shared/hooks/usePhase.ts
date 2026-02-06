import { useState, useEffect, useCallback } from 'react';
import { PHASE_SCHEDULE } from '../constants/phase';

export const usePhase = () => {
  const [timeOffset, setTimeOffset] = useState<number | null>(null);
  const [currentMode, setCurrentMode] = useState<number>(1);

  // 현재 모드 계산 함수
  const getModeByDate = useCallback((offset: number) => {
    const now = Date.now() + offset;

    const start = Date.parse(PHASE_SCHEDULE.APPLICATION_START);
    const p3Start = Date.parse(PHASE_SCHEDULE.APPLICATION_END);
    const p4Start = Date.parse(PHASE_SCHEDULE.DOCUMENT_RESULT);
    const p5Start = Date.parse(PHASE_SCHEDULE.FINAL_RESULT);
    const p1Start = Date.parse(PHASE_SCHEDULE.TERMINATION);

    if (now < start) return 1;
    if (now < p3Start) return 2;
    if (now < p4Start) return 3;
    if (now < p5Start) return 4;
    if (now < p1Start) return 5;
    return 1;
  }, []);

  useEffect(() => {
    const syncTime = async () => {
      try {
        const response = await fetch(`${window.location.origin}?t=${Date.now()}`, { method: 'HEAD' });
        const serverDate = response.headers.get('date');
        const offset = serverDate ? new Date(serverDate).getTime() - Date.now() : 0;
        setTimeOffset(offset);
        setCurrentMode(getModeByDate(offset));
      } catch {
        setTimeOffset(0);
        setCurrentMode(getModeByDate(0));
      }
    };
    syncTime();
  }, [getModeByDate]);

  // 1초마다 모드 업데이트
  useEffect(() => {
    if (timeOffset === null) return;
    const timer = setInterval(() => {
      setCurrentMode(getModeByDate(timeOffset));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeOffset, getModeByDate]);

  return { currentMode, isLoading: timeOffset === null };
};
