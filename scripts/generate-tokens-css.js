// generate-tokens-css.js
// 2. tokens.flattened.json 파일을 읽어와서 tokens.css 파일을 생성

import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { readFileSync, writeFileSync } from 'fs';

register(StyleDictionary);

const sd = new StyleDictionary({
  source: ['tokens/token.flattened.json'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'src/shared/styles/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            selector: ':root',
          },
        },
      ],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();

// Shadow 값 후처리: [object Object]를 CSS 형식으로 변환
const TOKENS_CSS_PATH = 'src/shared/styles/tokens.css';
const tokensContent = readFileSync(TOKENS_CSS_PATH, 'utf-8');

// token.flattened.json에서 shadow 값을 읽어서 CSS 형식으로 변환
const tokenData = JSON.parse(readFileSync('tokens/token.flattened.json', 'utf-8'));

// Shadow 값을 CSS 형식으로 변환하는 함수
const convertShadowToCSS = (shadowValue) => {
  if (!shadowValue || typeof shadowValue !== 'object') return null;
  const { x = '0', y = '0', blur = '0', spread = '0', color = '#000000' } = shadowValue;
  return `${x}px ${y}px ${parseFloat(blur).toFixed(1)}px ${spread}px ${color}`;
};

// Shadow 값 매핑
const shadowMap = {};
if (tokenData.Effect?.shadow) {
  Object.entries(tokenData.Effect.shadow).forEach(([key, token]) => {
    if (token.value && typeof token.value === 'object') {
      shadowMap[`--effect-shadow-${key}`] = convertShadowToCSS(token.value);
    }
  });
}

// Card ActivityCard shadow
if (tokenData.Effect?.Card?.ActivityCard?.value) {
  shadowMap['--effect-card-activity-card'] = convertShadowToCSS(tokenData.Effect.Card.ActivityCard.value);
}

// CSS 파일에서 [object Object]를 실제 shadow 값으로 교체
let updatedContent = tokensContent;
Object.entries(shadowMap).forEach(([varName, cssValue]) => {
  if (cssValue) {
    // --effect-shadow-default: [object Object]; -> --effect-shadow-default: 0px 0px 22.7px 0px #1b263421;
    const regex = new RegExp(`(${varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}):\\s*\\[object Object\\];`, 'g');
    updatedContent = updatedContent.replace(regex, `$1: ${cssValue};`);
  }
});

writeFileSync(TOKENS_CSS_PATH, updatedContent, 'utf-8');
console.log(`✅ tokens.css가 성공적으로 생성되었습니다: ${TOKENS_CSS_PATH}`);
