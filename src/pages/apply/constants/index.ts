import type {
  RecruitPartTypes,
  RecruitInfoTabTypes,
  QualificationTypes,
  ActivityTypes,
  BonusPointTypes,
  CompletionConditionTypes,
  ScheduleTypes,
  FAQTypes,
} from '../types/index';

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
export const QUALIFICATIONS: QualificationTypes[] = [
  {
    id: 'q1',
    content:
      '2025년도 1학기 숙명여자대학교에 재학/휴학중인 자 (졸업유예자 제외) 중 정규학기에 참여 가능한 자로서, 아직 선발 완료가 되지 않은 자',
  },
  {
    id: 'q2',
    content: '매주 수요일 정기 세션 참여 및 출석 체크 참여 가능한 자',
  },
  {
    id: 'q3',
    content: '프로젝트 진행이 가능한 자',
  },
  {
    id: 'q4',
    content: '활동에 대한 열정과 책임감을 갖고, 활동 기간 동안 적극 참여 가능한 자',
  },
];

// 활동 안내
export const ACTIVITIES: ActivityTypes[] = [
  {
    id: 'a1',
    content: '매주 수요일 18:30~21:00 정기 세션 진행',
  },
  {
    id: 'a2',
    content: '파트별 스터디 및 프로젝트 진행',
  },
  {
    id: 'a3',
    content: '해커톤, 아이디어톤 등 각종 대회 참여 기회',
  },
  {
    id: 'a4',
    content: '다양한 네트워킹 행사 참여',
  },
];

// 서류 가산점
export const BONUS_POINTS: BonusPointTypes[] = [
  {
    id: 'b1',
    content: '관련 프로젝트 경험이 있는 경우',
  },
  {
    id: 'b2',
    content: '포트폴리오 또는 GitHub 제출',
  },
  {
    id: 'b3',
    content: '관련 분야 자격증 보유',
  },
];

// 수료 조건
export const COMPLETION_CONDITIONS: CompletionConditionTypes[] = [
  {
    id: 'c1',
    title: '출결 및 과제 제출',
    items: [
      {
        id: 'c1-1',
        number: '01',
        title: '진행된 세션 중 80% 출석',
        description: '정기 세션 출석률 80% 이상 유지',
      },
      {
        id: 'c1-2',
        number: '02',
        title: '과제 제출',
        description: '세션별 과제 및 프로젝트 과제 제출',
      },
    ],
  },
  {
    id: 'c2',
    title: '필수 행사 참여',
    items: [
      {
        id: 'c2-1',
        number: '01',
        title: '해커톤 참여',
        description: '학기 중 진행되는 해커톤 필수 참여',
      },
      {
        id: 'c2-2',
        number: '02',
        title: '데모데이 참여',
        description: '프로젝트 발표 및 데모데이 참여',
      },
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
    dateRange: '02.24(월)',
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
    dateRange: '03.05(수)',
    label: '최종 합격자 발표',
    status: 'upcoming',
  },
  {
    id: 's5',
    dateRange: '미정(예정)',
    label: '수료 OT',
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
