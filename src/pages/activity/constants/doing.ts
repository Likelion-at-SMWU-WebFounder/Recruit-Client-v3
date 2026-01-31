const DOING_IMAGE_PATH = import.meta.env.VITE_IMAGE_PATH + '/activity/doing/image';
const DOING_ICON_PATH = import.meta.env.VITE_IMAGE_PATH + '/activity/doing/icon';

export const DOING_DATA = [
  {
    id: 1,
    title: '정기 세미나',
    term: [],
    description: [
      '체계적인 세미나로\n개발의 기초부터 심화까지',
      '주 1회 파트별 진행하는\n세미나로 기초부터 심화까지\n체계적으로 학습합니다',
    ],
    icon_dark: `${DOING_ICON_PATH}/seminar_icon.svg`,
    icon_white: `${DOING_ICON_PATH}/seminar_white_icon.svg`,
    image: `${DOING_IMAGE_PATH}/seminar.webp`,
  },
  {
    id: 2,
    title: '아이디어톤',
    term: [1, 2],
    description: [
      '나만의 반짝이는 아이디어로\n세상을 바꾸다',
      '교내 부원들과 함께 팀을 이뤄\n아이디어를 설계하고\n다른 학교들과 경쟁합니다',
    ],
    icon_dark: `${DOING_ICON_PATH}/ideathon_icon.svg`,
    icon_white: `${DOING_ICON_PATH}/ideathon_white_icon.svg`,
    image: `${DOING_IMAGE_PATH}/ideathon.webp`,
  },
  {
    id: 3,
    title: '중앙 해커톤',
    term: [1],
    description: [
      '전국 규모 무대에서\n우리의 서비스를 증명하다',
      '교내에서 총 세 팀을 이루어\n연 1,600명 참여의 해커톤에서\n실제 서비스를 배포합니다',
    ],
    icon_dark: `${DOING_ICON_PATH}/hackathon_icon.svg`,
    icon_white: `${DOING_ICON_PATH}/hackathon_white_icon.svg`,
    image: `${DOING_IMAGE_PATH}/hackathon.webp`,
  },

  {
    id: 4,
    title: '연합 해커톤',
    term: [2],
    description: [
      '타대와 함께 팀이 되어 \n협업 경험의 끝을',
      '여성·4호선 대학 연합을 통해\n타 학교와 협업하며\n서비스를 배포하고, 성장합니다 ',
    ],
    icon_dark: `${DOING_ICON_PATH}/joint_icon.svg`,
    icon_white: `${DOING_ICON_PATH}/joint_white_icon.svg`,
    image: `${DOING_IMAGE_PATH}/joint.webp`,
  },
  {
    id: 5,
    title: '파이널 프로젝트',
    term: [2],
    description: [
      '배움의 끝에서\n하나의 결과를 완성하다',
      '12월 파이널 프로젝트로\n지금까지 쌓아온 지식과 경험을\n하나의 결과로 완성합니다',
    ],
    icon_dark: `${DOING_ICON_PATH}/final_icon.svg`,
    icon_white: `${DOING_ICON_PATH}/final_white_icon.svg`,
    image: `${DOING_IMAGE_PATH}/final.webp`,
  },
  {
    id: 6,
    title: '스터디',
    term: [1, 2],
    description: [
      '함께 모여\n원하는 방식으로 깊어지다',
      '코딩테스트·맛집 탐방 등\n원하는 주제로 직접 개설하고\n지식과 친목을 나눕니다',
    ],
    icon_dark: `${DOING_ICON_PATH}/study_icon.svg`,
    icon_white: `${DOING_ICON_PATH}/study_white_icon.svg`,
    image: `${DOING_IMAGE_PATH}/study.webp`,
  },
  {
    id: 7,
    title: '선배와의 대화',
    term: [2],
    description: [
      '먼저 걸어본 길에서\n답을 찾다',
      '멋대 선배 멘토링 세션을 통해\n커리어 경험과 인사이트를\n얻을 수 있습니다',
    ],
    icon_dark: `${DOING_ICON_PATH}/senior_icon.svg`,
    icon_white: `${DOING_ICON_PATH}/senior_white_icon.svg`,
    image: `${DOING_IMAGE_PATH}/senior.webp`,
  },
  {
    id: 8,
    title: '운영진 활동',
    term: [1, 2],
    description: [
      '하나부터 열까지 동아리를\n직접 만들어가는 경험',
      '세미나 자료 제작·멘토링 및\n행사 기획·운영, 프로젝트까지\n직접 주도합니다',
    ],
    icon_dark: `${DOING_ICON_PATH}/management_team_icon.svg`,
    icon_white: `${DOING_ICON_PATH}/management_team_white_icon.svg`,
    image: `${DOING_IMAGE_PATH}/management_team.webp`,
  },
];
