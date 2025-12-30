import type { RecruitPartTypes, RecruitInfoTabTypes, ScheduleTypes, FAQTypes } from '../types/index';

// Hero Section
export const HERO_CONTENT = {
  TITLE: '숙명여대 멋사와 함께할 13기 아기사자를 모집합니다!',
  DESCRIPTION: '아래의 소개 및 일정을 반드시 읽고 지원서를 작성해주세요.',
  APPLY_PERIOD: '13기 서류 접수 기간: 25.02.14~25.02.21',
  BUTTON_TEXT: '지원하러 가기',
};

// 섹션 타이틀
export const SECTION_TITLES = {
  RECRUIT_PART: '모집 파트',
  RECRUIT_INFO: '모집 안내',
  COMPLETION_CONDITION: '수료 조건',
  SCHEDULE: '모집 일정',
  FAQ: 'FAQ',
};

// 모집 파트
export const RECRUIT_PARTS: RecruitPartTypes[] = [
  {
    id: 'design',
    title: '기획·디자인',
    skills: 'Figma, UI/UX, 데이터분석',
    description: '사용자 경험 중심의 서비스를 기획하고, UI/UX를 고려하여 WEB을 디자인하는 법을 배웁니다.',
    cta: '서비스를 설계하고, 디자인하는 것에 관심이 있다면 기획·디자인 파트에 지원하세요!',
  },
  {
    id: 'frontend',
    title: '프론트엔드',
    skills: 'JavaScript, React',
    description:
      '사용자 인터페이스(UI)와 사용자 경험(UX)에 초점을 두며, WEB과 사용자가 직접적으로 맞닿아 있는 인터페이스를 구축합니다.',
    cta: '사용자가 직접 사용하는 화면을 개발해보고 싶다면 프론트엔드 파트에 지원하세요!',
  },
  {
    id: 'backend',
    title: '백엔드',
    skills: 'Django, Spring',
    description:
      '서버와 데이터베이스를 중심으로, 눈에 보이지 않는 데이터를 효율적으로 관리하고 다양한 기능들을 구현합니다.',
    cta: '화면에는 드러나지 않지만 웹사이트의 핵심적인 역할을 담당하고 싶다면, 백엔드 파트에 지원하세요!',
  },
];

// 모집 안내 탭
export const RECRUIT_INFO_TABS: RecruitInfoTabTypes[] = [
  { id: 'qualification', label: '지원 자격' },
  { id: 'activity', label: '활동 안내' },
  { id: 'bonus', label: '서류 가산점' },
];

// 지원 자격
export const QUALIFICATIONS: string[] = [
  '25년도 기준 숙명여자대학교\n재학생·휴학생·자대 편입생·졸업 유예자\n(졸업생, 타대생 참여 불가)',
  '1년간 재학·휴학·졸업 유예 상태 유지 가능자',
  '지원서 양식 준수자',
  '멋쟁이사자처럼 공식 행사 및\n정기 세션 참여 가능자',
];

// 활동 안내
export const ACTIVITY_INFO = {
  sessionTitle: '정기 세션 활동 기간 및 시간',
  sessionPeriod: '03~12월',
  sessionTime: '매주 화요일 19:00~21:00',
  feeTitle: '활동비',
  feeAmount: '4만원',
  feeNote: '(장소 대관비가 별도로 발생할 수 있음)',
};

// 서류 가산점
export const BONUS_INFO = {
  courseTitle: '수강 범위',
  courseLink: '프로그래머스 파이썬 입문 강의',
  courseNote: '파트 1~8, 10~11 수강시 가산점 부여',
  verifyTitle: '인증 방법',
  verifyMethod: '홈페이지 지원서의\n파일업로드를 통해 수강 인증 가능',
};

// 수료 조건
export const COMPLETION_CONDITIONS = [
  {
    id: 'attendance',
    title: '출결 및 과제 제출',
    items: [
      {
        number: '01',
        title: '상벌점 제도 운영',
        details: [
          '상벌점 포함 0점 이상 시 수료 가능',
          '정기 세션 지각 및 결석 시 벌점 부여',
          '과제 지각 제출 및 미제출 시 벌점 부여',
          '퀴즈 정답 및 우수 과제 선정 시 상점 부여',
        ],
      },
      {
        number: '02',
        title: '제명 조건',
        details: ['벌점 0점 미만으로 내려가는 즉시 제명', '무단 결석 3회 이상 시 제명', '중도 탈퇴 시 제명'],
      },
    ],
  },
  {
    id: 'event',
    title: '필수 행사 참여',
    items: [
      { number: '01', title: '숙명여대 멋사 OT', date: '(03.08 19:00)' },
      { number: '02', title: '멋사 중앙 OT', date: '(03.21 19:00)' },
      { number: '03', title: '중앙 아이디어톤', date: '(6월 중 진행)' },
      { number: '04', title: '중앙 해커톤', date: '(8월 중순 진행)' },
      { number: '05', title: '연합 해커톤: 여기톤', date: '(7월 중 진행)' },
      { number: '06', title: '연합 해커톤: 4호선톤', date: '(11월 중 진행)' },
      { number: '07', title: '파이널 프로젝트', date: '(11월 중 진행)' },
    ],
  },
];

// 모집 일정
export const SCHEDULES: ScheduleTypes[] = [
  {
    id: 's1',
    dateRange: '02.14(금)~02.21(금)',
    label: '서류 접수',
    status: 'current',
  },
  {
    id: 's2',
    dateRange: '02.25(화)',
    label: '서류 발표',
    status: 'upcoming',
  },
  {
    id: 's3',
    dateRange: '02.27(목)~02.28(금)',
    label: '면접',
    status: 'upcoming',
  },
  {
    id: 's4',
    dateRange: '03.02(일)',
    label: '최종 합격자 발표',
    status: 'upcoming',
  },
  {
    id: 's5',
    dateRange: '03.08(금)',
    label: '숙멋 OT',
    status: 'upcoming',
  },
];

// FAQ
export const FAQS: FAQTypes[] = [
  {
    id: 'f1',
    question: 'Q. 꼭 활동과 관련 전공이어야만 하나요? 기초가 갖추어지지 않은 비전공자의 경우에는 지원이 힘든가요?',
    answer:
      '전공과 무관하게 활동에 대한 관심과 열정만 있다면 지원 가능합니다. 기초 및 실력을 쌓기위한 파트별 스터디도 진행하고 있으니 걱정 마시고, 활동기간 동안 함께 성장해 나가면 됩니다.',
  },
  {
    id: 'f2',
    question: 'Q. 면접, 파트 별 모집 인원이 궁금해요!',
    answer: '파트별 모집 인원은 상황에 따라 유동적으로 결정됩니다. 면접은 대면으로 진행될 예정입니다.',
  },
  {
    id: 'f3',
    question: 'Q. 고학년, 저학년 비율이 궁금해요!',
    answer: '학년에 따른 제한은 없으며, 다양한 학년의 학생들이 함께 활동하고 있습니다.',
  },
  {
    id: 'f4',
    question: 'Q. 면접에서 코딩 테스트를 보나요?',
    answer: '면접에서 별도의 코딩 테스트는 진행하지 않습니다. 지원 동기와 열정을 중심으로 면접이 진행됩니다.',
  },
  {
    id: 'f5',
    question: 'Q. 활동 시간은 어떤으로 진행하나요?',
    answer:
      '매주 수요일 18:30~21:00에 정기 세션이 진행됩니다. 추가적인 스터디나 프로젝트 시간은 팀별로 조율하여 진행합니다.',
  },
  {
    id: 'f6',
    question: 'Q. 2학기에는 신입 아기사자를 모집하나요?',
    answer: '신입 아기사자 모집은 1학기에만 진행됩니다. 2학기에는 별도의 모집을 진행하지 않습니다.',
  },
  {
    id: 'f7',
    question: 'Q. 서류 기간에도 질기 취소이 열리나요?',
    answer: '서류 접수 기간 중에도 문의사항이 있으시면 공식 인스타그램 DM으로 문의해주세요.',
  },
  {
    id: 'f8',
    question: 'Q. 수료 조건이 어떻게 되나요?',
    answer: '정기 세션 출석률 80% 이상, 과제 제출, 해커톤 및 데모데이 등 필수 행사 참여가 수료 조건입니다.',
  },
];
