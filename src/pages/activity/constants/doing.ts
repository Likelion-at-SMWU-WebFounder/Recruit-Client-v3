const DOING_IMAGE_PATH = import.meta.env.VITE_IMAGE_PATH + '/activity/doing/image';
const DOING_ICON_PATH = import.meta.env.VITE_IMAGE_PATH + '/activity/doing/icon';

export const DOING_DATA = [
  {
    id: 1,
    title: '정기 세미나',
    term: [],
    description: '체계적인 세미나로\n개발의 기초부터 심화까지',
    icon: `${DOING_ICON_PATH}/seminar_icon.svg`,
    image: `${DOING_IMAGE_PATH}/regular_seminar.webp`,
  },
  {
    id: 2,
    title: '아이디어톤',
    term: [1, 2],
    description: '',
    icon_dark: `${DOING_ICON_PATH}/ideathon_icon.svg`,
    icon_white: `${DOING_ICON_PATH}/ideathon_white_icon.svg`,
    image: `${DOING_IMAGE_PATH}/ideathon.webp`,
  },
  {
    id: 3,
    title: '중앙 해커톤',
    term: [1],
    description: '처음부터 끝까지 내 손으로\n만드는 서비스',
    icon_dark: `${DOING_ICON_PATH}/hackathon_icon.svg`,
    icon_white: `${DOING_ICON_PATH}/hackathon_white_icon.svg`,
    image: `${DOING_IMAGE_PATH}/central_hackathon.webp`,
  },

  {
    id: 4,
    title: '연합 해커톤',
    term: [2],
    description: '타대와 함께 팀이 되어 \n협업 경험의 끝을',
    icon: `${DOING_ICON_PATH}/joint_icon.svg`,
    image: `${DOING_IMAGE_PATH}/joint_hackathon.webp`,
  },
  {
    id: 5,
    title: '파이널 프로젝트',
    term: [2],
    description: '마지막으로..',
    icon: `${DOING_ICON_PATH}/seminar_icon.svg`, // 파이널 아이콘으로 수정
    image: `${DOING_IMAGE_PATH}/final_project.webp`,
  },
];
