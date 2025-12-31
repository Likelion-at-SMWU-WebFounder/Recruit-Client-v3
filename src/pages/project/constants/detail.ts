const PROJECT_IMAGES_PATH = import.meta.env.VITE_IMAGE_PATH + '/project';

// 프로젝트 상세 페이지 타이틀
export const PROJECT_DETAIL_TITLES = {
  overview: '개요',
  teamMembers: '프로젝트 참여 팀원',
  service: '서비스 설명',
};

// 프로젝트 상세 페이지 정보 라벨
export const PROJECT_INFO_LABELS = {
  category: '참여 행사',
  no: '참여 기수',
  techStack: '기술 스택',
  award: '수상 여부',
  link: '링크',
};

// 프로젝트 상세 페이지 정보 아이콘 경로
export const PROJECT_INFO_ICONS_PATHS = {
  googleDrive: PROJECT_IMAGES_PATH + '/icons/google-drive.webp',
  githubOrg: PROJECT_IMAGES_PATH + '/icons/github-org.webp',
  githubFe: PROJECT_IMAGES_PATH + '/icons/github-fe.webp',
  githubBe: PROJECT_IMAGES_PATH + '/icons/github-be.webp',
  figma: PROJECT_IMAGES_PATH + '/icons/figma.webp',
};
