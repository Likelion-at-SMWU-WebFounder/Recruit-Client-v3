export const DOCUMENT_RESULT_TEXT = {
  GREETING: '안녕하세요, 숙명여대 멋쟁이사자처럼 입니다.',
  SIGNATURE: '숙명여대 멋쟁이사자처럼 운영진 드림',
  PASS: {
    TITLE: '2026 멋쟁이사자처럼 14기 서류 전형 “합격"을 진심으로 축하드립니다.',
    mobileTitle: '\n2026 멋쟁이사자처럼 14기 서류 전형\n“합격"을 진심으로 축하드립니다.',
    DESCRIPTION: (name: string) => [
      {
        text: `${name} 지원자님이 선택하셨던 면접 시간을 고려하여 \n아래의 일정으로 면접 전형을 진행할 예정입니다.`,
        isHighlight: false,
      },
    ],
    DETAILS: {
      INTERVIEW_TIME: '1. 면접 일시',
      INTERVIEW_PLACE: '2. 면접 장소: 본교 프라임관 202호 (대면 면접)',
      REPLY_INFO: [
        { text: '3. 회신 사항: ', isHighlight: false },
        { text: '면접 참석 여부', isHighlight: true },
        { text: '를 ', isHighlight: false },
        { text: '금일 17시', isHighlight: true },
        {
          text: '까지 반드시 받으신 문자 번호로 회신 부탁드립니다.',
          textMobile: '까지\n반드시 받으신 문자 번호로 회신 부탁드립니다.',
          isHighlight: false,
        },
      ],
    },
    NOTES: [
      [
        { text: '* ', isHighlight: false },
        { text: '면접 시간 10분 전', isHighlight: true },
        { text: '까지 ', isHighlight: false },
        { text: '대기실(프라임관 105호)', isHighlight: true },
        { text: '에 착석해 주시길 바랍니다.', textMobile: '에\n착석해 주시길 바랍니다.', isHighlight: false },
      ],
      [
        {
          text: '* 불가피한 사정으로 면접 시간 변경이 필요한 경우, 마찬가지로 문자 회신 부탁드립니다.',
          textMobile: '\n* 불가피한 사정으로 면접 시간 변경이 필요한 경우,\n마찬가지로 문자 회신 부탁드립니다.',
          isHighlight: false,
        },
      ],
    ],
  },
  FAIL: {
    THANKS: '멋쟁이사자처럼 모집에 관심을 가지고 지원해 주셔서 진심으로 감사드립니다.',
    mobileTHANKS: '멋쟁이사자처럼 모집에 관심을 가지고\n지원해 주셔서 진심으로 감사드립니다.',
    MESSAGE: [
      '우선, 많은 우수한 지원자들을 모시고 결정하느라\n그 어느 때보다 고심을 할 수 밖에 없었음을 말씀드립니다.',
      '안타깝지만 지원자님의 우수한 역량에도 불구하고,\n서류 심사 과정에서 합격 소식을 전해드리지 못하게 되었습니다.\n아쉽지만 지원자님의 서류 지원에 대해 다시 한번 감사드리며,\n저희 멋쟁이사자처럼에 지원하신 모든 분들이 차후 더 좋은 기회를 맞이할 것이라고 생각합니다.',
      '감사합니다.',
    ],
    mobileMESSAGE: [
      '우선, 많은 우수한 지원자들을 모시고 결정하느라\n그 어느 때보다 고심을 할 수 밖에 없었음을\n말씀드립니다.',
      '안타깝지만 지원자님의 우수한 역량에도 불구하고,\n서류 심사 과정에서 합격 소식을 전해드리지\n못하게 되었습니다.\n\n아쉽지만 지원자님의 서류 지원에 대해\n다시 한번 감사드리며,\n저희 멋쟁이사자처럼에 지원하신 모든 분들이\n차후 더 좋은 기회를 맞이할 것이라고 생각합니다.',
      '감사합니다.',
    ],
  },
} as const;

export const FINAL_RESULT_TEXT = {
  GREETING: '안녕하세요, 숙명여대 멋쟁이사자처럼 입니다.',
  SIGNATURE: '숙명여대 멋쟁이사자처럼 운영진 드림',
  TRACK_NAME: {
    be: '백엔드',
    pm: '기획/디자인',
    fe: '프론트엔드',
  } as Record<string, string>,
  PASS: {
    TITLE: '멋쟁이사자처럼에 지원해 주셔서 진심으로 감사드립니다.',
    DESCRIPTION: (track: string, name: string) => [
      { text: `${track}`, isHighlight: true },
      { text: ' 트랙에 지원하신 ', isHighlight: false },
      { text: `${name}`, isHighlight: true },
      { text: '님은 멋쟁이사자처럼 14기에 ', textMobile: '님은\n멋쟁이사자처럼 14기에 ', isHighlight: false },
      { text: '최종 합격', isHighlight: true },
      {
        text: '하셨습니다.\n치열한 경쟁 속에서 운영진들과 거듭 회의를 거쳐 결정된 결과인 만큼 \n한 해 동안 끝까지 함께하길 희망한다는 말씀부터 드립니다.\n오늘 중으로 카카오톡 단체방에 초대될 예정이며, 관련 공지 참고해 주시길 바랍니다.\n또한, 최종 합격 확인 여부는 아래 ',
        textMobile:
          '하셨습니다.\n치열한 경쟁 속에서 운영진들과 거듭 회의를 거쳐\n결정된 결과인 만큼 한 해 동안 끝까지 함께하길\n희망한다는 말씀부터 드립니다.\n\n오늘 중으로 카카오톡 단체방에 초대될 예정이며,\n관련 공지 참고해 주시길 바랍니다. 또한, 최종 합격\n확인 여부는 아래 ',
        isHighlight: false,
      },
      { text: '구글 폼', isHighlight: true },
      {
        text: ' 작성으로 확인할 예정이니,\n ',
        textMobile: ' 작성으로 확인할 예정이니,\n',
        isHighlight: false,
        isTabletOnlyBreak: true,
      },
      { text: '금일 17시', isHighlight: true },
      {
        text: `까지 반드시 작성 부탁드립니다.\n다시 한번 합격을 진심으로 축하드리며, ${name}님이 보여주신 열정 기대하고 있겠습니다.`,
        textMobile: `까지 반드시 작성 부탁드립니다.\n다시 한번 합격을 진심으로 축하드리며,\n${name}님이 보여주신 열정 기대하고 있겠습니다.`,
        isHighlight: false,
      },
    ],
    FORM_SECTION: '[최종 합격 확인 회신]*금일 17시까지 반드시 제출',
    FORM_LINK_TEXT: '숙명여대 멋쟁이사자처럼 14기 합격 확인 구글 폼',
    FORM_URL: 'https://docs.google.com/forms/d/e/1FAIpQLSeZeJ7aIT92Ec4mRUjQ8ri0_AK74YVeODEkAqCF1mN58RSPZw/viewform',
  },
  FAIL: {
    THANKS: '멋쟁이사자처럼 모집에 관심을 가지고 지원해 주셔서 진심으로 감사드립니다.',
    mobileTHANKS: '멋쟁이사자처럼 모집에 관심을 가지고\n지원해 주셔서 진심으로 감사드립니다.',
    MESSAGE: (name: string) => [
      [
        {
          text: '우선, 많은 우수한 지원자들을 모시고 결정하느라\n그 어느 때보다 고심을 할 수 밖에 없었음을 말씀드립니다.',
          textMobile:
            '우선, 많은 우수한 지원자들을 모시고 결정하느라\n그 어느 때보다 고심을 할 수 밖에 없었음을\n말씀드립니다.',
          isHighlight: false,
        },
      ],
      [
        { text: '안타깝지만 지원자님의 우수한 역량에도 불구하고,\n면접 심사 과정에서 ', isHighlight: false },
        { text: `${name}`, isHighlight: true },
        {
          text: '님께 합격 소식을 전해드리지 못하게 되었습니다.\n',
          textMobile: '님께\n합격 소식을 전해드리지 못하게 되었습니다.\n\n',
          isHighlight: false,
        },
        {
          text: '저희 멋쟁이사자처럼에 지원하신 모든 분들이 차후 더 좋은 기회를 맞이할 것이라고 생각하며,\n아쉽지만 ',
          textMobile:
            '저희 멋쟁이사자처럼에 지원하신 모든 분들이\n차후 더 좋은 기회를 맞이할 것이라고 생각하며,\n아쉽지만 ',
          isHighlight: false,
        },
        { text: `${name}`, isHighlight: true },
        {
          text: '님의 면접 참석에 대해 다시 한번 감사드립니다.',
          textMobile: '님의 면접 참석에 대해\n다시 한번 감사드립니다.',
          isHighlight: false,
        },
      ],
      [{ text: '감사합니다.', isHighlight: false }],
    ],
  },
} as const;
