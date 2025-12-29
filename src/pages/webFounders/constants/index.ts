import type { FilterOptionType } from '@shared/types/filter';

// 웹파운더즈 타이틀, 서브타이틀
export const WEBFOUNDERS_TITLE = 'Web Founders';
export const WEBFOUNDERS_SUBTITLE = '숙명여자대학교 멋사 홈페이지 제작자를 소개합니다';

// 웹파운더즈 기수별 필터 옵션
export const WEBFOUNDERS_FILTER_OPTIONS = [
  {
    id: 1,
    filterValue: '3기',
  },
  {
    id: 2,
    filterValue: '2기',
  },
  {
    id: 3,
    filterValue: '1기',
  },
] as FilterOptionType[];
