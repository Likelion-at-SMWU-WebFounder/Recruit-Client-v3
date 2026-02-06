export const ERROR_MESSAGES = {
  APPLY_UNAVAILABLE: {
    TITLE: '서류 접수 기간이 아닙니다.',
    APPLICATION_PERIOD: '서류 접수 기간: 26.02.12 09:00 ~ 26.02.18 18:00',
  },
  RESULT_UNAVAILABLE: {
    TITLE: '결과 조회 기간이 아닙니다.',
    DOCUMENT_PERIOD: '서류 결과 조회 기간: 26.02.22~26.02.27',
    FINAL_RESULT_PERIOD: '최종 결과 조회 기간: 26.02.28~26.03.03',
  },
  NOT_FOUND: {
    TITLE: '잘못된 접근입니다.',
    DESCRIPTION_LINE1: '방문하시려는 페이지의 주소가 잘못 입력되었거나,',
    DESCRIPTION_LINE2: '페이지의 주소가 변경 혹은 삭제되어',
    DESCRIPTION_LINE3: '요청하신 페이지를 찾을 수 없습니다.',
  },
} as const;
