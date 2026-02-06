import { useState, useEffect } from 'react';
import { PHASE_SCHEDULE } from '../constants/phase';

const calculateMode = (offset: number): number => {
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
};

export const usePhase = () => {
  const [timeOffset, setTimeOffset] = useState<number | null>(null);
  const [currentMode, setCurrentMode] = useState<number>(() => calculateMode(0));

  // 서버 시간 동기화
  useEffect(() => {
    const syncTime = async () => {
      try {
        const response = await fetch(`${window.location.origin}?t=${Date.now()}`, {
          method: 'HEAD',
          cache: 'no-cache',
        });
        const serverDate = response.headers.get('date');

        if (serverDate) {
          const offset = new Date(serverDate).getTime() - Date.now();
          setTimeOffset(offset);
          setCurrentMode(calculateMode(offset));
        }
      } catch (err) {
        console.error('서버 시간 동기화 실패:', err);
        setTimeOffset(0);
      }
    };
    syncTime();
  }, []);

  // 1초마다 모드 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMode(calculateMode(timeOffset ?? 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeOffset]);

  return { currentMode, isLoading: timeOffset === null };
};
