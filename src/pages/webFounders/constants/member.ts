import type { FounderType } from '@/pages/webFounders/types/founder';

const WEBFOUNDERS_IMAGE_PATH = import.meta.env.VITE_IMAGE_PATH + '/webfounders/members';

// 3기 웹파운더즈 멤버
export const WEBFOUNDERS_3TH = {
  // 기획디자인 파트
  PLAN_DESIGN: [
    {
      id: 1,
      name: '강주은',
      no: '12기',
      part: '프론트엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/3th/KangJuEun.webp',
      responsibilities: '홈, 소개, 프로젝트 페이지 UI/UX 기획 및 디자인',
      linkedin: 'https://www.linkedin.com/in/jueun-kang-ux/',
      email: 'next.kje@gmail.com',
      notion: 'https://jueunkang-resume.notion.site/',
    },
    {
      id: 2,
      name: '김보미',
      no: '12기',
      part: '기획디자인',
      image: WEBFOUNDERS_IMAGE_PATH + '/3th/KimBoMi.webp',
      responsibilities: '홈, 지원하기 페이지 UI/UX 기획 및 디자인',
      instagram: 'https://www.instagram.com/for._.me._.03/',
      email: 'kbm03@sookmyung.ac.kr',
      notion: 'https://www.notion.so/s-PORTFOLIO-190d7663959380338aa1e160876b6658?source=copy_link/',
    },
    {
      id: 3,
      name: '박우현',
      no: '12기',
      part: '기획디자인',
      image: WEBFOUNDERS_IMAGE_PATH + '/3th/ParkWooHyun.webp',
      responsibilities: '홈, 활동, 웹파운더즈 페이지 UI/UX 기획 및 디자인',
      notion: 'https://parkwoohyun-portfolio.notion.site/2cab6ad4cd4680a38852fdd465aa79f4?source=copy_link/',
      email: 'parkwh0122@gmail.com',
      github: 'https://github.com/WooHyunn',
    },
  ] as FounderType[],

  // 프론트엔드 파트
  FRONTEND: [
    {
      id: 4,
      name: '성윤정',
      no: '12기',
      part: '프론트엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/3th/SeongYunJung.webp',
      responsibilities: '소개, 프로젝트, 웹파운더즈 페이지 프론트엔드 개발',
      email: 'syj91105@gmail.com',
      github: 'https://github.com/ynzung',
    },
    {
      id: 5,
      name: '유동은',
      no: '12기',
      part: '프론트엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/3th/YouDongEun.webp',
      responsibilities: '홈, 활동 페이지 프론트엔드 개발',
      linkedin: 'https://www.linkedin.com/in/dongeun-you/',
      email: 'ehddms3@sookmyung.ac.kr',
      github: 'https://github.com/uehddms',
    },
    {
      id: 6,
      name: '이현정',
      no: '12기',
      part: '프론트엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/3th/LeeHyeonJeong.webp',
      responsibilities: '지원 페이지 프론트엔드 개발',
      email: 'lhjlhj10088@gmail.com',
      github: 'https://github.com/hyhy-j',
    },
  ] as FounderType[],

  // 백엔드 파트
  BACKEND: [
    {
      id: 7,
      name: '경민서',
      no: '12기',
      part: '백엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/3th/KyungMinSeo.webp',
      responsibilities: '서버 유지보수, 배포 및 운영',
      instagram: 'https://www.instagram.com/rrudalstj/',
      email: 'kyungminseo10@gmail.com',
      github: 'https://github.com/mxinseo',
    },
    {
      id: 8,
      name: '서문지',
      no: '12기',
      part: '백엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/3th/SeoMunJi.webp',
      responsibilities: '서버 유지보수, 배포 및 운영',
      instagram: 'https://www.instagram.com/m0.0nji/',
      email: 'tjanswl@sookmyung.ac.kr',
      github: 'https://github.com/SEOMUNJI',
    },
    {
      id: 9,
      name: '유채민',
      no: '12기',
      part: '백엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/3th/YuChaeMin.webp',
      responsibilities: '서버 유지보수, 배포 및 운영',
      linkedin: 'https://www.linkedin.com/in/chaeminyu/',
      email: 'chaemin.u@gmail.com',
      github: 'https://github.com/chaeminyu',
    },
    {
      id: 10,
      name: '정지윤',
      no: '12기',
      part: '백엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/3th/JungJiYoon.webp',
      responsibilities: '서버 유지보수, 배포 및 운영',
      email: 'jiyoon3849@gmail.com',
      github: 'https://github.com/y11n',
    },
    {
      id: 11,
      name: '홍상희',
      no: '12기',
      part: '백엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/3th/HongSangHee.webp',
      responsibilities: '서버 유지보수, 배포 및 운영',
      email: 'hongdabagi@gmail.com',
      github: 'https://github.com/SangHee-Hong',
    },
  ] as FounderType[],
};

// 2기 웹파운더즈 멤버
export const WEBFOUNDERS_2TH = {
  // 기획디자인 파트
  PLAN_DESIGN: [
    {
      id: 1,
      name: '강주은',
      no: '11기',
      part: '프론트엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/2th/KangJuEun.webp',
    },
  ] as FounderType[],

  // 프론트엔드 파트
  FRONTEND: [
    {
      id: 2,
      name: '이선아',
      no: '11기',
      part: '프론트엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/2th/LeeSeonAh.webp',
    },
    {
      id: 3,
      name: '이예지',
      no: '11기',
      part: '프론트엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/2th/LeeYeJi.webp',
    },
    {
      id: 4,
      name: '조성하',
      no: '11기',
      part: '프론트엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/2th/ChoSungHa.webp',
    },
  ] as FounderType[],

  // 백엔드 파트
  BACKEND: [
    {
      id: 5,
      name: '김원희',
      no: '11기',
      part: '백엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/2th/KimWonHee.webp',
    },
    {
      id: 6,
      name: '윤서희',
      no: '11기',
      part: '백엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/2th/YoonSeoHee.webp',
    },
    {
      id: 7,
      name: '이서현',
      no: '11기',
      part: '백엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/2th/LeeSeoHyun.webp',
    },
  ] as FounderType[],
};

// 1기 웹파운더즈 멤버
export const WEBFOUNDERS_1TH = {
  // 기획디자인 파트
  PLAN_DESIGN: [
    {
      id: 1,
      name: '소희수',
      no: '10기',
      part: '기획디자인',
      image: WEBFOUNDERS_IMAGE_PATH + '/1th/SohHeeSu.webp',
    },
  ] as FounderType[],

  // 프론트엔드 파트
  FRONTEND: [
    {
      id: 2,
      name: '나유진',
      no: '10기',
      part: '프론트엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/1th/NaYuJin.webp',
    },
    {
      id: 3,
      name: '배지윤',
      no: '10기',
      part: '프론트엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/1th/BaeJiYoon.webp',
    },
    {
      id: 4,
      name: '양은수',
      no: '10기',
      part: '프론트엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/1th/YangEunSoo.webp',
    },
  ] as FounderType[],

  // 백엔드 파트
  BACKEND: [
    {
      id: 5,
      name: '박소윤',
      no: '10기',
      part: '백엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/1th/ParkSoYun.webp',
    },
    {
      id: 6,
      name: '이수민',
      no: '10기',
      part: '백엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/1th/LeeSuMin.webp',
    },
    {
      id: 7,
      name: '임아현',
      no: '10기',
      part: '백엔드',
      image: WEBFOUNDERS_IMAGE_PATH + '/1th/LimAHyeon.webp',
    },
  ] as FounderType[],
};
