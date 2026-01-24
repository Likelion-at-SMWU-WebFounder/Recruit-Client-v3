export const RESULT_CHECK_CONTENT = {
  DOCUMENT: {
    TITLE: '서류 심사 결과 확인',
    PATH: '/apply/document',
  },
  FINAL: {
    TITLE: '최종 심사 결과 확인',
    PATH: '/apply/final',
  },
  LABELS: {
    NAME: '이름',
    ID: '학번',
    PASSWORD: '비밀번호',
  },
  PLACEHOLDERS: {
    NAME: '김멋사',
    ID: '1234567',
    PASSWORD: '지원 시 설정한 4자리 번호를 입력해 주세요.',
  },
  BUTTON: '결과 확인',
  ERROR_MESSAGES: {
    REQUIRED: '모든 항목을 입력해주세요.',
  },
} as const;
