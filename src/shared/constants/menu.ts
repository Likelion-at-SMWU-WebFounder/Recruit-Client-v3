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

// (순서가 중요한 경우)
export const MENU_ORDER = [
  MENU_ITEMS.HOME,
  MENU_ITEMS.ABOUT,
  MENU_ITEMS.ACTIVITY,
  MENU_ITEMS.PROJECT,
  MENU_ITEMS.APPLY,
] as const;
