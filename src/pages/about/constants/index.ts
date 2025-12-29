// about 페이지에서 사용되는 title, subTitle 등의 상수 모음 파일

const ABOUT_IMAGES_PATH = import.meta.env.VITE_IMAGE_PATH + '/about';

export const TITLE = {
  TITLE_1: '아이디어를 서비스로, 캠퍼스에서 세상으로',
  DESCRIPTION_1: '숙명이 부르면, 멋대로 답한다',
  TITLE_2: '함께여서 더 대담한 숙명',
  DESCRIPTION_2: '개발이 낯선 비전공자도, 깊이를 찾는 전공자도\n함께라면 한계를 넘어설 수 있다고 믿습니다.',
};

// About 페이지 히어로 섹션 배경 이미지 경로
export const HERO_BACKGROUND_IMAGES_PATH = {
  mobile: ABOUT_IMAGES_PATH + '/background-image/hero-mobile.webp',
  tablet: ABOUT_IMAGES_PATH + '/background-image/hero-tablet.webp',
  desktop: ABOUT_IMAGES_PATH + '/background-image/hero-desktop.webp',
};

export const SUB_TITLE = {
  SUB_TITLE_1: 'core value',
  SUB_DESCRIPTION_1: '우리가 믿는 가치',
  SUB_TITLE_2: 'our identity',
  SUB_DESCRIPTION_2: '우리만의 정체성',
  SUB_TITLE_3: 'our people',
  SUB_DESCRIPTION_3: '함께하고 싶은 사람',
  SUB_TITLE_4: 'join us',
  SUB_DESCRIPTION_4: '지금 시작하기',
};
