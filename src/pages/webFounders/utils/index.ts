import type { FounderType } from '@/pages/webFounders/types/founder';
import { WEBFOUNDERS_1TH, WEBFOUNDERS_2TH, WEBFOUNDERS_3TH } from '@pages/webFounders/constants/member';

/**
 * 파트별로 멤버를 필터링하는 유틸 함수
 * @param foundersByPart - 파트별로 그룹화된 멤버 객체
 * @param part - 필터링할 파트명 ('기획디자인', '프론트엔드', '백엔드')
 * @returns 해당 파트의 멤버 배열
 */
export const getFoundersByPart = (
  foundersByPart: { PLAN_DESIGN: FounderType[]; FRONTEND: FounderType[]; BACKEND: FounderType[] },
  part: string
): FounderType[] => {
  switch (part) {
    case '기획디자인':
      return foundersByPart.PLAN_DESIGN;
    case '프론트엔드':
      return foundersByPart.FRONTEND;
    case '백엔드':
      return foundersByPart.BACKEND;
    default:
      return [];
  }
};

/**
 * 기수별로 멤버를 필터링하는 유틸 함수
 * @param filterValue - 필터 값 ('3기', '2기', '1기')
 * @returns 해당 기수의 파트별로 그룹화된 멤버 객체
 */
export const getFoundersByGeneration = (
  filterValue: string
): { PLAN_DESIGN: FounderType[]; FRONTEND: FounderType[]; BACKEND: FounderType[] } => {
  switch (filterValue) {
    case '3기':
      return WEBFOUNDERS_3TH;
    case '2기':
      return WEBFOUNDERS_2TH;
    case '1기':
      return WEBFOUNDERS_1TH;
    default:
      return WEBFOUNDERS_3TH;
  }
};

/**
 * URL을 정규화하는 유틸 함수
 * @param url - 정규화할 URL
 * @returns http/https가 포함된 완전한 URL
 */
export const normalizeUrl = (url: string): string => {
  return url.startsWith('http') ? url : `https://${url}`;
};
