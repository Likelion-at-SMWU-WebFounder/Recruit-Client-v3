import { PROJECT_IMAGES } from '@/pages/home/constants/project';

export const getProjectImages = (): string[] => {
  const images: string[] = [];

  // 모든 기수와 카테고리의 이미지들을 플랫한 배열로 변환
  Object.values(PROJECT_IMAGES).forEach((generation) => {
    Object.values(generation).forEach((category) => {
      images.push(...category);
    });
  });

  return images;
};

// 배열을 두 부분으로 나누는 유틸리티 함수
export const splitImagesIntoTwoRows = (images: string[]): [string[], string[]] => {
  const mid = Math.ceil(images.length / 2);
  const firstRow = images.slice(0, mid);
  const secondRow = images.slice(mid);

  return [firstRow, secondRow];
};
