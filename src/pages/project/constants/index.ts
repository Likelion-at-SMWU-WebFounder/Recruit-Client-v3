const PROJECT_IMAGES_PATH = import.meta.env.VITE_LOCAL_IMAGE_PATH + '/project';

// 프로젝트 타이틀, 서브타이틀
export const PROJECT_TITLE = 'PROJECT';
export const PROJECT_SUBTITLE = '아이디어를 현실로, 우리가 만든 변화';

// 프로젝트 페이지 배경 이미지 경로
export const PROJECT_BACKGROUND_IMAGES_PATH = {
  mobile: PROJECT_IMAGES_PATH + '/background-image/project-mobile.webp',
  tablet: PROJECT_IMAGES_PATH + '/background-image/project-tablet.webp',
  desktop: PROJECT_IMAGES_PATH + '/background-image/project-desktop.webp',
};

// 프로젝트 기수별 필터 옵션
export const PROJECT_FILTER_OPTIONS = [
  {
    id: 1,
    name: '전체',
  },
  {
    id: 2,
    name: '13기',
  },
  {
    id: 3,
    name: '12기',
  },
  {
    id: 4,
    name: '11기',
  },
  {
    id: 5,
    name: '10기',
  },
  {
    id: 6,
    name: '9기',
  },
];
