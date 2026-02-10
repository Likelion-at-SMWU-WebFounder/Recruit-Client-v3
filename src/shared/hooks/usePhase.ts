import { useState, useEffect } from 'react';
import { PHASE_SCHEDULE } from '../constants/phase';
import { getServerTime } from '../apis/phase';

const calculateMode = (currentTime: number): number => {
  const start = Date.parse(PHASE_SCHEDULE.APPLICATION_START);
  const p3Start = Date.parse(PHASE_SCHEDULE.APPLICATION_END);
  const p4Start = Date.parse(PHASE_SCHEDULE.DOCUMENT_RESULT);
  const p5Start = Date.parse(PHASE_SCHEDULE.FINAL_RESULT);
  const p1Start = Date.parse(PHASE_SCHEDULE.TERMINATION);

  if (currentTime < start) return 1;
  if (currentTime < p3Start) return 2;
  if (currentTime < p4Start) return 3;
  if (currentTime < p5Start) return 4;
  if (currentTime < p1Start) return 5;
  return 1;
};

export const usePhase = () => {
  const [timeOffset, setTimeOffset] = useState<number | null>(null);
  const [currentMode, setCurrentMode] = useState<number>(() => calculateMode(Date.now()));

  useEffect(() => {
    const syncTime = async () => {
      try {
        const serverTimeStr = await getServerTime();

        // 오차 계산
        const serverMillis = new Date(serverTimeStr).getTime();
        const localMillis = Date.now();
        const offset = serverMillis - localMillis;

        setTimeOffset(offset);
        setCurrentMode(calculateMode(localMillis + offset));
      } catch (err) {
        console.error('서버 시간 동기화 실패:', err);
        setTimeOffset(0);
      }
    };

    syncTime();
  }, []);

  useEffect(() => {
    // 1초마다 모드 체크
    const timer = setInterval(() => {
      const correctedNow = Date.now() + (timeOffset ?? 0);
      setCurrentMode(calculateMode(correctedNow));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeOffset]);

  return { currentMode, isLoading: timeOffset === null };
};
