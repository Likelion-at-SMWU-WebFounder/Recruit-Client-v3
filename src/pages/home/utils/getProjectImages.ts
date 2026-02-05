import { allProjectsData } from '@pages/project/constants/project/allProjectData';

export const getProjectImages = (): string[] => {
  const images: string[] = [];

  // allProjectsData에서 모든 프로젝트의 대표 이미지(첫 번째 이미지)를 가져옴
  allProjectsData.forEach((project) => {
    if (project.images && project.images.length > 0) {
      images.push(project.images[0]);
    }
  });

  // 이미지가 부족하면 반복해서 추가 (최소 20개 확보)
  while (images.length < 20) {
    images.push(...images.slice(0, Math.min(images.length, 20 - images.length)));
  }

  return images;
};

// 배열을 두 부분으로 나누는 유틸리티 함수
export const splitImagesIntoTwoRows = (images: string[]): [string[], string[]] => {
  const mid = Math.ceil(images.length / 2);
  const firstRow = images.slice(0, mid);
  const secondRow = images.slice(mid);

  return [firstRow, secondRow];
};
