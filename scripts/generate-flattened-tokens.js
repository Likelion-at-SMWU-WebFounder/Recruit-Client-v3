// generate-flattened-tokens.js
// 1. token.json 파일을 읽어와서 token.flattened.json 파일을 생성

import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('tokens/token.json', 'utf-8'));

/**
 * Token Studio 기본 패턴:
 * {
 *   "global": { ... }
 * }
 */
if (!raw.global) {
  throw new Error('루트에 "global" 토큰 세트가 필요합니다');
}

const root = raw.global;

// 만약 global 안에 또 global이 있으면 펼쳐줌
const flattened = {
  ...root,
  ...(root.global ?? {}),
};

// global.global 제거 (global 안에 global이 있으면 제거)
delete flattened.global;

const OUTPUT_PATH = 'tokens/token.flattened.json';
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(flattened, null, 2));

console.log(`✅ token.flattened.json이 성공적으로 생성되었습니다: ${OUTPUT_PATH}`);
