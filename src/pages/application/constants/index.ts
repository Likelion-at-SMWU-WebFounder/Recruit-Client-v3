import type { FieldConfig, Question, InterviewScheduleOption } from '../types/index';

// 페이지 제목
export const PAGE_TITLE = '숙명여대 멋사 13기 모집 서류 작성페이지 입니다.';
export const PAGE_SUBTITLE = '* 표시 문항은 필수 응답 항목입니다.';

// 지원자 정보 필드 별 상세 설정
export const APPLICANT_FIELD_CONFIG: FieldConfig[] = [
  { id: 'name', label: '이름', placeholder: '김멋사', required: true },
  { id: 'studentId', label: '학번', placeholder: '2345678', required: true },
  {
    id: 'major',
    label: '전공',
    placeholder: '경영학부(본), 인공지능공학부(복)',
    required: true,
    subText: '본전공(본), 복수전공(복), 연계전공(연) 등을 모두 입력해주세요.',
  },
  {
    id: 'semestersLeft',
    label: '수료 학기',
    placeholder: '3',
    required: true,
    subText: '종강한 학기를 기준으로 수료 학기를 입력해주세요.',
  },
  {
    id: 'verificationCode',
    label: '재/휴학여부',
    required: true,
    options: [
      { label: '재학', value: '재학' },
      { label: '휴학', value: '휴학' },
      { label: '졸업 유예', value: '졸업 유예' },
    ],
  },
  { id: 'graduationYear', label: '졸업 예정 연도', placeholder: '2026년 2월', required: true },
  { id: 'phone', label: '전화번호', placeholder: '010-1234-5678', required: true },
  { id: 'email', label: '이메일', placeholder: 'sooklion@gmail.com', required: true },
];

// 지원자 정보 에러 메시지
export const APPLICANT_ERRORS = {
  name: '이름을 입력해주세요.',
  studentId: '학번을 입력해주세요.',
  major: '전공을 입력해주세요.',
  semestersLeft: '수료 학기를 입력해주세요.',
  graduationYear: '졸업 예정 연도를 입력해주세요.',
  phone: '전화번호를 입력해주세요.',
  phoneFormat: '전화번호 형식이 올바르지 않습니다.',
  email: '이메일을 입력해주세요.',
  verificationCode: '재/휴학여부를 선택해주세요.',
};

// 비밀번호 에러 메시지
export const PASSWORD_ERRORS = {
  empty: '비밀번호를 입력해주세요.',
  mismatch: '비밀번호가 일치하지 않습니다.',
  short: '4자리를 모두 입력해주세요.',
};

// 지원 파트 섹션 정보
export const PART_SELECTION_INFO = {
  label: '지원 파트',
} as const;

// 지원 파트 옵션
export const PART_OPTIONS = [
  { label: '기획·디자인', value: 'plan-design' },
  { label: '프론트엔드', value: 'frontend' },
  { label: '백엔드', value: 'backend' },
] as const;

export const PART_ERRORS = {
  select: '지원 파트를 선택해주세요.',
};
// 프로그래머스 인증 관련 상수
export const PROGRAMMERS_INFO = {
  title: '프로그래머스 수강 인증',
  linkText: '파이썬 입문 강의 링크',
  linkUrl: 'https://school.programmers.co.kr/learn/courses/2',
  description: '1~8, 10~11강 수강 완료 스크린샷을 zip 파일로 업로드 해주세요.',
  uploadComplete: '파일 업로드 완료',
  uploadDefault: '파일 업로드',
};

// 질문 목록
export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    number: 1,
    question: "다양한 IT 동아리 중에서 '멋쟁이사자처럼 대학 13기'를 선택하고 지원하시게 된 이유를 작성해 주세요.",
    placeholder: '답변을 입력해 주세요.',
  },
  {
    id: 'q2',
    number: 2,
    question:
      '위의 파트를 선택한 이유와 관련 경험을 해본 적이 있는지, 그리고 이 파트를 통해 어떠한 성장을 희망하시는지 작성해 주세요.',
    placeholder: '답변을 입력해 주세요.',
  },
  {
    id: 'q3',
    number: 3,
    question:
      '멋쟁이사자처럼 대학에서 한 학기 동안 배운 것을 바탕으로 한 달 동안 팀을 구성해 웹 서비스를 배포해야 합니다. 개발하고 싶었던 웹 서비스가 있나요? 있다면, 아이디어에 대해 설명해 주세요.',
    placeholder: '답변을 입력해 주세요.',
  },
  {
    id: 'q4',
    number: 4,
    question: '자신의 강점이 무엇인가요? 그 강점이 돋보였던 상황을 구체적으로 설명해 주세요.',
    placeholder: '답변을 입력해 주세요.',
  },
  {
    id: 'q5',
    number: 5,
    question: '열정을 다해서 도전을 해본 경험이 있다면, 도전의 경험을 구체적으로 설명해 주세요.',
    placeholder: '답변을 입력해 주세요.',
  },
  {
    id: 'q6',
    number: 6,
    question:
      '멋쟁이사자처럼 대학은 협업과 팀워크를 중요한 가치로 생각하는 공동체입니다. 협업 경험에서 자신이 잘했다고 생각하는 점과 아쉽다고 생각하는 점을 이유와 함께 작성해 주세요. 꼭 개발에 관한 협업이 아니어도 됩니다.',
    placeholder: '답변을 입력해 주세요.',
  },
  {
    id: 'q7',
    number: 7,
    question: '만약 기술 블로그, GitHub, 포트폴리오 등 제출하시고 싶은 자료가 있다면 링크를 기재해 주세요.',
    placeholder: '포트폴리오 링크가 외부에서 접근 가능한 상태(Public 등)인지 확인 후 입력해 주세요.',
  },
  {
    id: 'q8',
    number: 8,
    question: '면접 가능 일자에 모두 체크해주세요.',
    placeholder: '',
  },
];

// 면접 일정 옵션
export const INTERVIEW_SCHEDULE: InterviewScheduleOption[] = [
  {
    date: '03.15(수)',
    dayOfWeek: '수',
    times: ['17:00~17:40', '18:00~18:40', '19:00~19:40', '20:00~20:40'],
  },
  {
    date: '03.16(목)',
    dayOfWeek: '목',
    times: ['17:00~17:40', '18:00~18:40', '19:00~19:40', '20:00~20:40'],
  },
  {
    date: '03.17(금)',
    dayOfWeek: '금',
    times: ['17:00~17:40', '18:00~18:40', '19:00~19:40', '20:00~20:40'],
  },
];

// 정보 수집 동의 내용
export const AGREEMENT_INFO = {
  activityParticipation: {
    title: '[숙명여대 멋사 필수 참여 행사] 불참 시 합격이 취소될 수 있으며, 활동 수료에 제한이 있을 수 있습니다.',
    content: `숙명여대 멋사 OT: 03.08(금) 19:00~21:00 (대면 진행, 불참 시 합격 취소)
멋사 중앙 OT: 03.21(수) 19:00 (온라인 진행, 불참 시 함격 취소)
중앙 아이디어톤: 6월 중 진행 (수료 요건)
중앙 해커톤: 8월 중순 진행 (수료 요건)
연합 해커톤: 7월 중 여기톤, 11월 중 4호선톤 (일정 변경 및 행사 여부는 주최 측 사정에 따라 변경될 수 있음, 수료 요건)
정기 세션: 03~12월 매주 화요일 19:00~21:00 (공통 교육(1~N주차)+파트 별 교육 N주차)
파이널 프로젝트: 11월 중 진행 (수료 요건)`,
    checkbox: '위 내용을 확인하였습니다.',
  },
  photoUsage: {
    title: '[서류 제출 유의사항]',
    content: `서류 제출은 1개 학번 당 1번 제출만 가능하도록 중복 제출 방지가 되어있습니다. 이점 유의하시어 제출해 주시기 바랍니다.
    서버 불안정 등 예상치 못한 상황에 대비하여 답변 내용을 별도로 백업하신 후, 지원서를 제출해 주시기 바랍니다.
    제출하기 버튼을 누른 후 랜딩 되는 제출 완료 페이지를 시간이 보이는 전체 화면으로 꼭 캡쳐해 주시기 바랍니다. 추후 서류 누락으로 서류 면접에 불이익 발생 시, 증빙자료로 인정될 수 있습니다.`,
    checkbox: '위 내용을 확인하였습니다.',
  },
  eventParticipation: {
    title: '[개인정보 수집·이용 동의서]',
    content: `주식회사 멋쟁이사자처럼은 「정보통신망 이용촉진 및 정보보호에 관한 법률」 및 「개인정보보호법」 등 관련 법령상의 개인정보보호 규정을 준수하여 「멋쟁이사자처럼 대학 14기」 참가자의 개인정보 및 권익을 보호하고, 개인정보와 관련한 참가자의 고충을 원활하게 처리할 수 있도록 다음과 같은 개인정보 처리방침을 두고 있습니다.

가. 개인 정보의 수집·이용에 관한 사항
         
  ▣ 개인 정보의 수집· 이용 목적
  개인 정보는 1차적으로 본 프로그램 참가신청, 참가신청에 따른 본인확인, 개인식별, 프로그램 진행, 프로그램 관련 안내/고지사항 등의 전달, 문의사항 또는 불만사항 등의 확인 및 처리, 분쟁 조정을 위한 기록 보존 등을 위해 사용됩니다. 이후 멋쟁이사자처럼의 프로그램 및 브랜드 홍보를 위한 마케팅에 활용될 수 있습니다.

  ▣ 수집하는 개인 정보의 항목
  성명, 연락처, 이메일 등 신청 및 프로그램 운영 중 취득한 정보

  ▣ 개인 정보의 보유· 이용기간
  개인 정보는 원칙적으로 개인 정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 본 사업 종료 후 참여 인정 문서 발급을 위한 최소한의 자료(성명, 학번, 학과, 연락처, 이메일)는 사업종료 이후 5년간 보존됩니다.

  ▣ 동의를 거부할 권리 및 동의를 거부할 경우의 불이익
  위 개인 정보의 수집· 이용에 거부할 권리가 있음을 알려드립니다. 단, 수집항목은 사업 진행을 위한 최소한의 필수 정보로서 개인 정보 수집· 이용에 동의하지 않으실 경우 프로그램 참가 및 제반 활동이 불가능합니다.
              
나. 개인 정보 제3자 제공에 관한 사항

  ▣ 제공받는 자
  주식회사 멋쟁이사자처럼
              
  ▣ 제공받는 자의 목적
  ‘멋쟁이사자처럼 대학 14기 모집’ 진행 및 운영, 참가자 관리

  ▣ 제공하는 개인 정보 항목
  성명, 연락처, 이메일 등 신청 및 프로그램 운영 중 취득한 정보

  ▣ 동의를 거부할 권리 및 동의를 거부할 경우의 불이익
  위 제3자에 대한 개인 정보의 제공에 관한 동의를 거부할 수 있으나 본 프로그램 참가를 위해 필수적이므로 위 사항에 동의하셔야만 참가 및 활동이 가능합니다.`,
    checkbox: '위의 정보 수집/이용에 동의합니다.',
  },
};

/// 비밀번호 안내
export const PASSWORD_INFO = {
  title: '비밀번호 설정',
  label1: '서류전형, 면접전형 결과 조회 시 사용할 개인비밀번호 4자리를 설정해주세요.',
  placeholder1: '4자리 입력',
  label2: '설정한 비밀번호를 한 번 더 입력해주세요.',
  subDescription: '비밀번호 분실 시, 추후 결과 조회가 어려울 수 있습니다.',
  placeholder2: '한 번 더 입력',
};
