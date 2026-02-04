// 타입 정의
export type PartType = 'common' | 'frontend' | 'backend' | 'pm_pd';
export type TermType = '1학기' | '2학기';

export const parts = [
  { id: 'common', name: '공통' },
  { id: 'pm_pd', name: '기획 · 디자인' },
  { id: 'frontend', name: '프론트엔드' },
  { id: 'backend', name: '백엔드' },
] as const;

const CURRICULUM_IMAGE_PATH = import.meta.env.VITE_IMAGE_PATH + '/activity/curriculum';

const MANAGEMENT_RETROSPECT = {
  김민서: {
    name: '김민서',
    batch: 13,
    part: '기획・디자인',
    retrospect:
      '기디로서 필요한 소양을 탄탄히 다질 수 있던 뜻깊은 시간이었습니다. 체계적인 커리큘럼과 파트 내 활발한 피드백을 통해 밀도있는 배움을 얻을 수 있었습니다.',
    common_retrospect:
      '처음 시작하는 아기사자에게 든든한 세미나였습니다. 기디로서 개발세미나를 들을 때는 낯설고 어렵기도 했지만 추후 개발 파트들과의 협업에 큰 도움이 되었습니다. ',
    image: `${CURRICULUM_IMAGE_PATH}/pm_pd_김민서.webp`,
  },
  하지민: {
    name: '하지민',
    batch: 13,
    part: '기획・디자인',
    retrospect:
      '직접 UI/UX를 설계하고 프로젝트 전 과정을 경험하며, 세미나를 통해 실무적 감각과 사용자 중심의 사고방식을 체득할 수 있었던 시간이었어요!',
    image: `${CURRICULUM_IMAGE_PATH}/pm_pd_하지민.webp`,
  },
  이경은: {
    name: '이경은',
    batch: 13,
    part: '백엔드',
    retrospect:
      '내용을 깊이 있게 다루어 이해하는 데 큰 도움이 되었고, 새롭게 알게 되는 부분이 많았습니다. 또한 Django도 접해볼 수 있어서 좋았습니다!',
    common_retrospect:
      '공통 세미나를 통해 다른 파트의 역할과 흐름을 이해할 수 있었습니다. 특히 각 파트가 따로 진행되는 것이 아니라 자연스럽게 연결되어 있다는 점이 좋았습니다!',
    image: `${CURRICULUM_IMAGE_PATH}/backend_이경은.webp`,
  },
  김보민: {
    name: '김보민',
    batch: 13,
    part: '백엔드',
    retrospect:
      '버튼 하나 뒤에서 서버와 데이터가 어떻게 일하는지 알게 되었습니다. 정말 유익하고 즐거운 시간이었습니다!',
    image: `${CURRICULUM_IMAGE_PATH}/backend_김보민.webp`,
  },
  최서아: {
    name: '최서아',
    batch: 13,
    part: '백엔드',
    retrospect:
      '장고부터 스프링까지 이어진 세미나로 전공 수업만으로는 접하기 어려운 개발 흐름을 배울 수 있었고 해커톤을 통해 배운 기술을 응용하며 실력을 더욱 키울 수 있었습니다!',
    common_retrospect:
      '공통세미나는 각 파트를 폭넓게 이해할 수 있어, 해커톤에서 여러 파트와 협업하는 데 큰 도움이 되었습니다. 덕분에 전체 서비스 구조를 이해하며 소통할 수 있었습니다!',
    image: `${CURRICULUM_IMAGE_PATH}/backend_최서아.webp`,
  },
  안성민: {
    name: '안성민',
    batch: 13,
    part: '백엔드',
    retrospect:
      '멋사 세미나에서 백엔드를 처음 배우기 시작한 이후, 이제는 무한한 가능성을 지닌 백엔드의 매력에 푹 빠졌습니다. 백엔드가 궁금하신 여러분, 열정만 있다면 많관부!!',
    image: `${CURRICULUM_IMAGE_PATH}/backend_안성민.webp`,
  },
  이승채: {
    name: '이승채',
    batch: 13,
    part: '프론트엔드',
    retrospect:
      '기초부터 탄탄한 숙멋 커리큘럼 덕분에 1년간 크게 성장할 수 있었고, 세미나 자료 또한 체계적으로 정리되어 있어 매 프로젝트마다 참고할 만큼 큰 도움이 되었습니다!',
    image: `${CURRICULUM_IMAGE_PATH}/frontend_이승채.webp`,
  },
  이연서: {
    name: '이연서',
    batch: 13,
    part: '프론트엔드',
    retrospect:
      '세미나를 통해 배운 내용을 과제로 적용해 볼 수 있는 점이 좋았고, 실무에서 자주 활용되는 내용을 다뤄 다양한 프로젝트에 활용해보며 한층 성장할 수 있었습니다.',
    common_retrospect:
      '공통 세미나를 통해 기획부터 프론트, 백엔드로 이어지는 전체 흐름을 이해할 수 있었고, 이는 이후 프로젝트에서 다른 파트를 더 잘 이해하는 데 큰 도움이 되었습니다.',
    image: `${CURRICULUM_IMAGE_PATH}/frontend_이연서.webp`,
  },
  박세은: {
    name: '박세은',
    batch: 13,
    part: '프론트엔드',
    retrospect:
      '동아리 활동하면서 프론트엔드를 꾸준히 접할 수 있었고, 같이 고민하고 성장한 시간이어서 의미 있었어요! 앞으로의 공부 방향을 잡는데 도움이 되었습니다:)',
    image: `${CURRICULUM_IMAGE_PATH}/frontend_박세은.webp`,
  },
  이채빈: {
    name: '이채빈',
    batch: 13,
    part: '프론트엔드',
    retrospect:
      '기초부터 차근차근 세미나를 진행하여 프론트를 처음 접해본 저도 잘 따라갈 수 있었고 매주 있는 과제를 직접 해보면서 뿌듯함과 실력 모두 쌓을 수 있었습니다!',
    image: `${CURRICULUM_IMAGE_PATH}/frontend_이채빈.webp`,
  },
  정교은: {
    name: '정교은',
    batch: 13,
    part: '프론트엔드',
    retrospect:
      '프론트엔드는 진입장벽이 낮은 만큼 정보가 많아 어디서부터 어떻게 배워야 할지 막막할 때가 많았는데요, 세미나 덕분에 배움의 방향을 잡아갈 수 있었습니다.',
    common_retrospect:
      '프로젝트에서는 협업이 가장 중요하다고 생각하는데요, Git부터 Figma까지 타 파트의 영역도 함께 이해하며 협업의 큰 흐름을 익히고 기본기를 다질 수 있었습니다.',
    image: `${CURRICULUM_IMAGE_PATH}/frontend_정교은.webp`,
  },
};

const COMMON_CURRICULUM = {
  '1학기': [
    {
      tool: 'Github',
      content: 'Github 세팅 및 개념, 충돌 실습',
    },
    {
      tool: 'Figma',
      content: 'Figma 기초 - 기획 및 디자인',
    },
    {
      tool: 'HTML/CSS/JS',
      content: 'HTML/CSS/JS - 프론트',
    },
    {
      tool: 'Django',
      content: 'Django 기초 및 연동 - 백/프론트',
    },
  ],
};

const FRONTEND_CURRICULUM = {
  '1학기': [
    { week: 1, tool: 'JavaScript', content: 'JS 기초' },
    { week: 2, tool: 'JavaScript', content: 'JS 기본' },
    { week: 3, tool: 'JavaScript', content: 'JS 응용' },
    { week: 4, tool: 'React, GitHub', content: 'React 기초 이론 및 GitHub, React 초기 세팅' },
    { week: 5, tool: 'React', content: 'React 기본 이론 및 레이아웃 구성' },
    { week: 6, tool: 'React', content: 'Props와 State 관리' },
    { week: 7, tool: 'React', content: 'React Hooks와 Router' },
    { week: 8, tool: 'React, Django', content: 'Axios, REST API 연동' },
    { week: 9, tool: 'React, Django', content: 'OAuth 2.0, 소셜 로그인 및 JWT 실습' },
    { week: 10, tool: 'React', content: '배포 로직 및 CI/CD 실습' },
    { week: 11, tool: 'React', content: 'Context API와 전역 상태 관리' },
    { week: 12, tool: 'React', content: 'Zustand 상태 관리' },
  ],
  '2학기': [
    { week: 1, tool: 'React', content: '비동기 처리와 React Query 기초' },
    { week: 2, tool: 'React', content: 'React Query 응용' },
    { week: 3, tool: 'TypeScript', content: 'TypeScript 기초' },
    { week: 4, tool: 'TypeScript', content: 'TypeScript 기본' },
    { week: 5, tool: 'TypeScript', content: 'TypeScript 활용' },
    { week: 6, tool: 'Next.js', content: 'Next.js 기초' },
    { week: 7, tool: 'Storybook', content: 'Storybook 및 유용한 개발 툴' },
  ],
};

const BACKEND_CURRICULUM = {
  '1학기': [
    { week: 1, tool: 'Django', content: 'Database와 ORM' },
    { week: 2, tool: 'Django', content: 'Queryset API, Admin과 MTV' },
    { week: 3, tool: 'Django', content: 'Form 응용, 이미지 업로드, CRUD' },
    { week: 4, tool: 'Django', content: 'RESTful API와 DRF' },
    { week: 5, tool: 'Django', content: 'Router, Serializer, Viewsets' },
    { week: 6, tool: 'Django', content: 'AWS 배포와 API 명세서 작성' },
    { week: 7, tool: 'Django', content: 'HTTPS 프로토콜을 사용한 배포' },
    { week: 8, tool: 'Spring', content: 'SpringBoot CRUD' },
    { week: 9, tool: 'Spring', content: '스프링 컨텍스트' },
    { week: 10, tool: 'Spring', content: '스프링 부트와 스프링 MVC' },
    { week: 11, tool: 'Spring', content: 'REST 서비스 구현 및 API 작성 방법' },
  ],
  '2학기': [
    { week: 1, tool: 'Spring', content: '데이터베이스 연동' },
    { week: 2, tool: 'Spring', content: 'Spring Data JPA' },
    { week: 3, tool: 'Spring', content: '연관관계 매핑' },
    { week: 4, tool: 'Spring', content: '유효성 검사와 예외 처리' },
    { week: 5, tool: 'Spring', content: 'Spring Security (폼 로그인)' },
    { week: 6, tool: 'Spring', content: 'Spring Security JWT' },
    { week: 7, tool: 'Spring', content: '4호선톤 피드백(임시)' },
    { week: 8, tool: 'Spring', content: '스프링 애플리케이션 테스트' },
  ],
};

const PM_PD_CURRICULUM = {
  '1학기': [
    {
      week: 1,
      tool: 'Figma, Notion',
      content: '기획/Figma 기초',
    },
    {
      week: 2,
      tool: 'Figma, Notion',
      content: 'UIUX 개념, 프로토타입',
    },
    {
      week: 3,
      tool: 'Figma',
      content: 'Figma 심화1',
    },
    {
      week: 4,
      tool: 'Figma',
      content: 'Figma 심화2',
    },
    {
      week: 5,
      tool: 'Figma, Notion',
      content: 'UIUX 디자인, 역기획',
    },
    {
      week: 6,
      tool: 'Figma, Notion',
      content: '기획/PM 심화',
    },
    {
      week: 7,
      tool: 'Figma, Notion',
      content: '리서치, PT',
    },
    {
      week: 8,
      tool: 'Figma, Notion',
      content: '피드백, 포트폴리오',
    },
  ],
  '2학기': [
    {
      week: 1,
      tool: 'Figma, Notion',
      content: '아티클 스터디, 레퍼런스 응용 1',
    },
    {
      week: 2,
      tool: 'Figma, Notion',
      content: '아티클 스터디, 레퍼런스 응용 2',
    },
    {
      week: 3,
      tool: 'Figma, Notion',
      content: '아티클 스터디, 레퍼런스 응용 3',
    },
    {
      week: 4,
      tool: 'Figma, Notion',
      content: '아티클 스터디, 레퍼런스 응용 4',
    },
    {
      week: 5,
      tool: 'Figma, Notion',
      content: '아티클 스터디, 레퍼런스 응용 5',
    },
    {
      week: 6,
      tool: 'Figma, Notion',
      content: '파이널 프로젝트 1',
    },
    {
      week: 7,
      tool: 'Figma, Notion',
      content: '파이널 프로젝트 2',
    },
    {
      week: 8,
      tool: 'Figma, Notion',
      content: '파이널 프로젝트 3',
    },
  ],
};

export const CURRICULUM_DATA = {
  common: { ...COMMON_CURRICULUM },
  frontend: { ...FRONTEND_CURRICULUM },
  backend: { ...BACKEND_CURRICULUM },
  pm_pd: { ...PM_PD_CURRICULUM },
};

export const CURRICULUM_RETROSPECT = {
  common: [
    MANAGEMENT_RETROSPECT.정교은,
    MANAGEMENT_RETROSPECT.이경은,
    MANAGEMENT_RETROSPECT.김민서,
    MANAGEMENT_RETROSPECT.이연서,
    MANAGEMENT_RETROSPECT.최서아,
  ],
  frontend: [
    MANAGEMENT_RETROSPECT.이승채,
    MANAGEMENT_RETROSPECT.박세은,
    MANAGEMENT_RETROSPECT.이연서,
    MANAGEMENT_RETROSPECT.이채빈,
    MANAGEMENT_RETROSPECT.정교은,
  ],
  backend: [
    MANAGEMENT_RETROSPECT.이경은,
    MANAGEMENT_RETROSPECT.김보민,
    MANAGEMENT_RETROSPECT.최서아,
    MANAGEMENT_RETROSPECT.안성민,
  ],
  pm_pd: [MANAGEMENT_RETROSPECT.김민서, MANAGEMENT_RETROSPECT.하지민],
};
