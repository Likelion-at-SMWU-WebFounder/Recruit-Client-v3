const PART_IMAGE_PATH = import.meta.env.VITE_IMAGE_PATH + '/home/part';

export const PART_DATA = [
  {
    id: 1,
    part: '기획·디자인',
    explain: '사용자 관점에서 문제를 정의하고\n구조와 경험을 설계합니다',
    image: PART_IMAGE_PATH + '/part-plan-design.webp',
  },
  {
    id: 2,
    part: '프론트엔드',
    explain: '사용자가 만나는\n모든 인터페이스를 구현합니다',
    image: PART_IMAGE_PATH + '/part-frontend.webp',
  },
  {
    id: 3,
    part: '백엔드',
    explain: '데이터와 서버를 설계하고\n서비스의 핵심 로직을 책임집니다',
    image: PART_IMAGE_PATH + '/part-backend.webp',
  },
];

export const PART_BUTTON_TEXT = '활동 자세히 보기';
