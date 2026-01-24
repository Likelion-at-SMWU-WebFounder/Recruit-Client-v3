// HeroSection
export const RECRUITMENT_PHASES = {
  NOTIFICATION: 'NOTIFICATION', // 알림 신청
  APPLICATION: 'APPLICATION', // 지원 기간
  DOCUMENT_CHECK: 'DOCUMENT_CHECK', // 서류 확인
  FINAL_CHECK: 'FINAL_CHECK', // 최종 합격
} as const;

export type RecruitmentPhase = (typeof RECRUITMENT_PHASES)[keyof typeof RECRUITMENT_PHASES];

export const PHASE_SCHEDULE = {
  APPLICATION_START: '2026-02-12T09:00:00',
  APPLICATION_END: '2026-02-18T18:00:00',
  DOCUMENT_RESULT: '2026-02-22T09:00:00',
  FINAL_RESULT: '2026-02-28T09:00:00',
};

export const HERO_PHASE_CONTENT = {
  [RECRUITMENT_PHASES.NOTIFICATION]: {
    TITLE: '숙명여대 멋사 13기 모집이 완료되었습니다.',
    DESCRIPTION: '14기 아기사자 모집에 지원해주세요!',
    APPLY_PERIOD: null,
    BUTTON_TEXT: '14기 모집 알림 받기',
    PATH: '/notify',
  },
  [RECRUITMENT_PHASES.APPLICATION]: {
    TITLE: '숙명여대 멋사와 함께할 14기 아기사자를 모집합니다!',
    DESCRIPTION: '아래의 소개 및 일정을 반드시 읽고 지원서를 작성해주세요.',
    APPLY_PERIOD: '14기 서류 접수 기간: 26.02.12 ~ 26.02.18',
    BUTTON_TEXT: '지원하러 가기',
    PATH: '/application',
  },
  [RECRUITMENT_PHASES.DOCUMENT_CHECK]: {
    TITLE: '숙명여대 멋사 14기 모집 서류 심사가 완료되었습니다!',
    DESCRIPTION: '하단 버튼을 통해 서류 심사 결과  확인이 가능합니다.',
    APPLY_PERIOD: null,
    BUTTON_TEXT: '서류 심사 결과 확인하기',
    PATH: '/result/document',
  },
  [RECRUITMENT_PHASES.FINAL_CHECK]: {
    TITLE: '숙명여대 멋사 14기 모집 최종 심사가 완료되었습니다!',
    DESCRIPTION: '하단 버튼을 통해 최종 심사 결과  확인이 가능합니다.',
    APPLY_PERIOD: null,
    BUTTON_TEXT: '최종 심사 결과 확인하기',
    PATH: '/result/final',
  },
};
