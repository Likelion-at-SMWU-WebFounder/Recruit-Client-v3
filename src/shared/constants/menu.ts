import { ROUTER_URL } from './url';

export const MENU_ITEMS = {
  HOME: {
    key: 'home',
    label: '홈',
    path: ROUTER_URL.HOME,
  },
  ABOUT: {
    key: 'about',
    label: '소개',
    path: ROUTER_URL.ABOUT,
  },
  ACTIVITY: {
    key: 'activity',
    label: '활동',
    path: ROUTER_URL.ACTIVITY,
  },
  PROJECT: {
    key: 'project',
    label: '프로젝트',
    path: ROUTER_URL.PROJECT,
  },
  APPLY: {
    key: 'apply',
    label: '지원하기',
    path: ROUTER_URL.APPLY,
  },
} as const;

export const MENU_ORDER = [
  MENU_ITEMS.HOME,
  MENU_ITEMS.ABOUT,
  MENU_ITEMS.ACTIVITY,
  MENU_ITEMS.PROJECT,
  MENU_ITEMS.APPLY,
] as const;

// 메뉴 컴포넌트에서 사용되는 이미지 경로
const MENU_IMAGES_PATH = import.meta.env.VITE_IMAGE_PATH + '/menu';

export const logo = {
  dark: MENU_IMAGES_PATH + '/smwu_lion_logo_dark.svg',
  light: MENU_IMAGES_PATH + '/smwu_lion_logo_light.svg',
};
export const apply_arrow = {
  dark: MENU_IMAGES_PATH + '/arrow_dark.svg',
  light: MENU_IMAGES_PATH + '/arrow_light.svg',
  active: MENU_IMAGES_PATH + '/arrow_active.svg',
};
