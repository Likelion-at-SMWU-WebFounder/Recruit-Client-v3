export const ACTIVITY_CONTENT_TEXT = {
  desktop:
    '정기 세미나부터 해커톤, 파이널 프로젝트까지 숙멋사의\n활동은 도전으로 가득합니다. 실무 중심의 커리큘럼과 협업\n환경 속에서 직접 아이디어를 실현하고 부딪치며 성장합니다.\n혼자가 아닌, 함께라서 더 큰 변화를 만들어냅니다.',
  tablet:
    '정기 세미나부터 해커톤, 파이널 프로젝트까지\n숙멋사의 활동은 도전으로 가득합니다.실무 중\n심의 커리큘럼과 협업 환경 속에서 직접 아이디\n어를 실현하고 부딪치며 성장합니다. 혼자가 아\n닌, 함께라서 더 큰 변화를 만들어냅니다.',
  mobile:
    '정기 세미나부터 해커톤, 파이널 프로젝트까지\n숙멋사의 활동은 도전으로 가득합니다.\n실무 중심의 커리큘럼과 협업 환경 속에서\n직접 아이디어를 실현하고 부딪치며 성장합니다.\n혼자가 아닌, 함께라서 더 큰 변화를 만들어냅니다.',
};

const ACTIVITY_IMAGES_PATH = import.meta.env.VITE_IMAGE_PATH + '/home/activity';

export const ACTIVITY_DATA = {
  hackathon: {
    title: '해커톤',
    description: '해커톤 참여를 통해 아이디어를 기획부터 구현까지 빠르게 실현합니다.',
    icon: ACTIVITY_IMAGES_PATH + '/hackathon_icon.svg',
    image: ACTIVITY_IMAGES_PATH + '/hackathon.webp',
  },
  seminar: {
    title: '세미나',
    description: '매주 화요일 7시부터 9시까지 각 파트별로 정기 세미나를 진행합니다.',
    icon: ACTIVITY_IMAGES_PATH + '/seminar_icon.svg',
    image: ACTIVITY_IMAGES_PATH + '/seminar.webp',
  },
};
