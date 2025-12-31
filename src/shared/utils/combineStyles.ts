/**
 * 스타일 객체에서 className을 생성하는 유틸 함수
 * @param styles - base, mobile, tablet, desktop 속성을 가진 스타일 객체
 * @returns 조합된 className 문자열
 */
export const combineStyles = (styles: {
  base?: string;
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string => {
  return [styles.base, styles.mobile, styles.tablet, styles.desktop].filter(Boolean).join(' ');
};
