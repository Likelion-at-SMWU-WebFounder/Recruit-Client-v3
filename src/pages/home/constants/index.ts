const HOME_IMAGES_PATH = import.meta.env.VITE_IMAGE_PATH + '/home';

// home 페이지 hero 섹션 배경 이미지 경로
export const HERO_BACKGROUND_IMAGES_PATH = {
  mobile: HOME_IMAGES_PATH + '/background-image/hero-mobile.webp',
  tablet: HOME_IMAGES_PATH + '/background-image/hero-tablet.webp',
  desktop: HOME_IMAGES_PATH + '/background-image/hero-desktop.webp',
};

// home 페이지 title
export const TITLE = {
  TITLE_1: 'Be the lion,',
  TITLE_2: 'Code your world',
};

export const SUB_TITLE = {
  SUB_TITLE_1: 'about us',
  SUB_DESCRIPTION_1: '숙명여대 멋쟁이사자처럼',
  SUB_CONTENT_1:
    '숙명여자대학교 멋쟁이사자처럼은 전국 대학 연합 개발·창업 동아리인 ‘멋쟁이사자처럼’의 숙명여대 지부로,\n올해 14기를 맞이했습니다. 웹 서비스 기획부터 개발까지 실무 경험을 쌓을 수 있는 활동 중심의 커뮤니티입니다.',
  SUB_TITLE_2: 'activity',
  SUB_DESCRIPTION_2: '주요 활동',
  SUB_CONTENT_2:
    '정기 세미나부터 해커톤, 파이널 프로젝트까지 숙멋사의 활동은 도전으로 가득합니다. 실무 중심의 커리큘럼과 협업 환경 속에서 직접 아이디어를 실현하고 부딪치며 성장합니다. 혼자가 아닌, 함께라서 더 큰 변화를 만들어냅니다.',
  SUB_TITLE_3: 'year',
  SUB_DESCRIPTION_3: '연간 일정',
  SUB_TITLE_4: 'part',
  SUB_DESCRIPTION_4: '파트 소개',
  SUB_TITLE_5: 'project',
  SUB_DESCRIPTION_5: '프로젝트',
  SUB_TITLE_6: 'apply',
  SUB_DESCRIPTION_6: '14기 지원',
};

export const SUB_CONTENT_CLASSES = [
  'whitespace-pre-line text-navyblack/70',
  'text-[1rem] font-[400] leading-[170%]', // mobile
  'md:text-[1.125rem] md:font-[500]', // tablet
  'lg:text-[1.75rem] lg:font-[400]', // desktop
].join(' ');
