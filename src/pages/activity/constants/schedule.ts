const SCHEDULE_IMAGE_PATH = import.meta.env.VITE_IMAGE_PATH + '/activity/schedule';

export const SCHEDULE_DATA = [
  {
    id: 1,
    title: '정기 세미나 시작',
    date: '2026.03.10',
    images: [
      `${SCHEDULE_IMAGE_PATH}/seminar1.webp`,
      `${SCHEDULE_IMAGE_PATH}/seminar2.webp`,
      `${SCHEDULE_IMAGE_PATH}/seminar3.webp`,
    ],
  },
  {
    id: 2,
    title: '스터디 시작',
    date: '2026.03.17',
    images: [
      `${SCHEDULE_IMAGE_PATH}/study1.webp`,
      `${SCHEDULE_IMAGE_PATH}/study2.webp`,
      `${SCHEDULE_IMAGE_PATH}/study3.webp`,
    ],
  },
  {
    id: 3,
    title: '아이디어톤',
    date: '2026.05',
    images: [
      `${SCHEDULE_IMAGE_PATH}/ideathon1.webp`,
      `${SCHEDULE_IMAGE_PATH}/ideathon2.webp`,
      `${SCHEDULE_IMAGE_PATH}/ideathon3.webp`,
    ],
  },
  {
    id: 4,
    title: '여기톤',
    date: '2026.07',
    images: [
      `${SCHEDULE_IMAGE_PATH}/herethon1.webp`,
      `${SCHEDULE_IMAGE_PATH}/herethon2.webp`,
      `${SCHEDULE_IMAGE_PATH}/herethon3.webp`,
    ],
  },
  {
    id: 5,
    title: '중앙 해커톤',
    date: '2026.08',
    images: [
      `${SCHEDULE_IMAGE_PATH}/hackathon1.webp`,
      `${SCHEDULE_IMAGE_PATH}/hackathon2.webp`,
      `${SCHEDULE_IMAGE_PATH}/hackathon3.webp`,
    ],
  },
  {
    id: 6,
    title: '4호선톤',
    date: '2026.11',
    images: [
      `${SCHEDULE_IMAGE_PATH}/line4thon1.webp`,
      `${SCHEDULE_IMAGE_PATH}/line4thon2.webp`,
      `${SCHEDULE_IMAGE_PATH}/line4thon3.webp`,
    ],
  },
  {
    id: 7,
    title: '선배와의 대화',
    date: '2026.11.10',
    images: [
      `${SCHEDULE_IMAGE_PATH}/senior1.webp`,
      `${SCHEDULE_IMAGE_PATH}/senior2.webp`,
      `${SCHEDULE_IMAGE_PATH}/senior3.webp`,
    ],
  },
  {
    id: 8,
    title: '파이널 프로젝트',
    date: '2026.12.29',
    images: [
      `${SCHEDULE_IMAGE_PATH}/final1.webp`,
      `${SCHEDULE_IMAGE_PATH}/final2.webp`,
      `${SCHEDULE_IMAGE_PATH}/final3.webp`,
    ],
  },
];
