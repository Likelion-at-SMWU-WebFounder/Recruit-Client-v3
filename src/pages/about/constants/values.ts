// about 페이지에서 사용되는 core value card 데이터 상수화

// value card의 keyword
const VALUES_KEYWORDS = {
  KEYWORD_1: 'Grow Together',
  KEYWORD_2: 'Challenge & Hack',
  KEYWORD_3: 'Responsibility & Grit',
};

// value card의 keyword에서 하이라이트 되어 있는 단어
const VALUES_HIGHLIGHTED_WORDS = {
  HIGHLIGHTED_WORD_1: 'Together',
  HIGHLIGHTED_WORD_2: 'Challenge',
  HIGHLIGHTED_WORD_3: 'Grit',
};

// value card의 description
const VALUES_DESCRIPTIONS = {
  DESCRIPTION_1: '서로의 지식을 나누며 함께 성장',
  DESCRIPTION_2: '해커톤·프로젝트로 한계 돌파',
  DESCRIPTION_3: '어려움을 버티며 끝까지 완주',
};

// value card의 배경 이미지
const VALUES_IMAGES = {
  IMAGE_1: 'bg-card-grow.svg',
  IMAGE_2: 'bg-card-challenge.svg',
  IMAGE_3: 'bg-card-grit.svg',
};

// core value card 데이터 상수화
export const VALUES_DATA = [
  {
    keyword: VALUES_KEYWORDS.KEYWORD_1,
    description: VALUES_DESCRIPTIONS.DESCRIPTION_1,
    image: VALUES_IMAGES.IMAGE_1,
    highlightedWord: VALUES_HIGHLIGHTED_WORDS.HIGHLIGHTED_WORD_1,
  },
  {
    keyword: VALUES_KEYWORDS.KEYWORD_2,
    description: VALUES_DESCRIPTIONS.DESCRIPTION_2,
    image: VALUES_IMAGES.IMAGE_2,
    highlightedWord: VALUES_HIGHLIGHTED_WORDS.HIGHLIGHTED_WORD_2,
  },
  {
    keyword: VALUES_KEYWORDS.KEYWORD_3,
    description: VALUES_DESCRIPTIONS.DESCRIPTION_3,
    image: VALUES_IMAGES.IMAGE_3,
    highlightedWord: VALUES_HIGHLIGHTED_WORDS.HIGHLIGHTED_WORD_3,
  },
];
