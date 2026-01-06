// home 페이지 about 섹션 이미지 경로
export const ABOUT_IMAGE_PATH = import.meta.env.VITE_IMAGE_PATH + '/home/about';

export const ABOUT_US_IMAGES_PATH = [
  ABOUT_IMAGE_PATH + '/about1.webp',
  ABOUT_IMAGE_PATH + '/about2.webp',
  ABOUT_IMAGE_PATH + '/about3.webp',
  ABOUT_IMAGE_PATH + '/about4.webp',
  ABOUT_IMAGE_PATH + '/about5.webp',
  ABOUT_IMAGE_PATH + '/about6.webp',
  ABOUT_IMAGE_PATH + '/about7.webp',
];

export const ABOUT_BUTTON_TEXT = { desktop_tablet: '더 알아보기', mobile: '동아리 더 알아보기' };

export const ABOUT_CONTENT_TEXT = {
  desktop:
    '숙명여자대학교 멋쟁이사자처럼은 전국 대학 연합 개발·창업 동아리인 ‘멋쟁이사자처럼’의 숙명여대 지부로,\n올해 14기를 맞이했습니다. 웹 서비스 기획부터 개발까지 실무 경험을 쌓을 수 있는 활동 중심의 커뮤니티입니다.',
  tablet:
    '숙명여자대학교 멋쟁이사자처럼은 전국 대학 연합 개발·창업 동아리인\n‘멋쟁이사자처럼’의 숙명여대 지부로, 올해 14기를 맞이했습니다.\n웹 서비스 기획부터 개발까지 실무 경험을 쌓을 수 있는 활동 중심의 커뮤니티입니다.',
  mobile:
    '숙명여자대학교 멋쟁이사자처럼은 전국 대학 연합\n개발·창업 동아리인 ‘멋쟁이사자처럼’의\n숙명여대 지부로, 올해 14기를 맞이했습니다.\n\n웹 서비스 기획부터 개발까지 실무 경험을 쌓을 수\n있는 활동 중심의 커뮤니티입니다.',
};
