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
  SUB_TITLE_2: 'activity',
  SUB_DESCRIPTION_2: '주요 활동',
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
