// generate-theme-css.js
// 3. tokens.css 파일을 읽어와서 theme.css 파일을 생성

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const TOKENS_CSS_PATH = 'src/shared/styles/tokens.css';
const THEME_CSS_PATH = 'src/shared/styles/theme.css';

// tokens.css 파일 읽기
const tokensContent = readFileSync(TOKENS_CSS_PATH, 'utf-8');

// CSS 변수 추출 정규식
const variableRegex = /--([^:]+):\s*([^;]+);/g;

// 모든 변수 추출
const variables = new Map();
let match;
while ((match = variableRegex.exec(tokensContent)) !== null) {
  const [, name, value] = match;
  variables.set(`--${name}`, value.trim());
}

// 변수 이름을 카테고리별로 분류
const categorizeVariable = (varName) => {
  if (varName.includes('color-')) return 'color';
  if (varName.includes('font-size-')) return 'font-size';
  if (varName.includes('font-weights-')) return 'font-weight';
  if (varName.includes('font-families-')) return 'font-family';
  if (varName.includes('line-heights-')) return 'line-height';
  if (varName.includes('letter-spacing-')) return 'letter-spacing';
  if (varName.includes('effect-') || varName.includes('shadow')) return 'shadow';
  if (varName.includes('text-case-')) return 'text-case';
  if (varName.includes('text-decoration-')) return 'text-decoration';
  if (varName.includes('paragraph-spacing-')) return 'paragraph-spacing';
  if (varName.includes('paragraph-indent-')) return 'paragraph-indent';
  if (varName.includes('header-')) return 'header';
  if (varName.includes('body-')) return 'body';
  return 'other';
};

// 변수들을 카테고리별로 그룹화
const categorized = {
  color: [],
  'font-size': [],
  'font-weight': [],
  'font-family': [],
  'line-height': [],
  'letter-spacing': [],
  shadow: [],
  'text-case': [],
  'text-decoration': [],
  'paragraph-spacing': [],
  'paragraph-indent': [],
  header: [],
  body: [],
  other: [],
};

variables.forEach((value, varName) => {
  const category = categorizeVariable(varName);
  categorized[category].push({ varName, value });
});

// 색상 변수 이름 변환 함수
const transformColorName = (varName) => {
  // --color-white-main -> --color-white
  // --color-white-background -> --color-white-background
  const match = varName.match(/--color-([^-]+(?:-[^-]+)*)/);
  if (match) {
    const colorName = match[1];
    // main은 제거
    if (colorName.endsWith('-main')) {
      return `--color-${colorName.replace('-main', '')}`;
    }
    return `--color-${colorName}`;
  }
  return null;
};

// 폰트 크기 변수 이름 변환
const transformFontSizeName = (varName) => {
  const match = varName.match(/--font-size-(\d+)/);
  if (match) {
    return `--font-size-${match[1]}`;
  }
  return null;
};

// 폰트 웨이트 변수 이름 변환
const transformFontWeightName = (varName) => {
  const match = varName.match(/--font-weights-pretendard-(\d+)/);
  if (match) {
    return `--font-weight-pretendard-${match[1]}`;
  }
  return null;
};

// 폰트 패밀리 변수 이름 변환
const transformFontFamilyName = (varName) => {
  const match = varName.match(/--font-families-(\w+)/);
  if (match) {
    return `--font-family-${match[1]}`;
  }
  return null;
};

// 라인 높이 변수 이름 변환
const transformLineHeightName = (varName) => {
  const match = varName.match(/--line-heights-(\d+)/);
  if (match) {
    return `--line-height-${match[1]}`;
  }
  return null;
};

// 레터 스페이싱 변수 이름 변환
const transformLetterSpacingName = (varName) => {
  const match = varName.match(/--letter-spacing-(\d+)/);
  if (match) {
    return `--letter-spacing-${match[1]}`;
  }
  return null;
};

// 섀도우 변수 이름 변환
const transformShadowName = (varName) => {
  // --effect-shadow-default -> --shadow-default
  // --effect-card-activity-card -> --shadow-card-activity-card
  if (varName.includes('card-activity-card')) {
    return '--shadow-card-activity-card';
  }
  const match = varName.match(/--effect-shadow-(.+)/);
  if (match) {
    return `--shadow-${match[1]}`;
  }
  return null;
};

// 텍스트 케이스 변수 이름 변환
const transformTextCaseName = (varName) => {
  const match = varName.match(/--text-case-(\w+)/);
  if (match) {
    return `--text-case-${match[1]}`;
  }
  return null;
};

// 텍스트 데코레이션 변수 이름 변환
const transformTextDecorationName = (varName) => {
  const match = varName.match(/--text-decoration-(\w+)/);
  if (match) {
    return `--text-decoration-${match[1]}`;
  }
  return null;
};

// 패러그래프 스페이싱 변수 이름 변환
const transformParagraphSpacingName = (varName) => {
  const match = varName.match(/--paragraph-spacing-(\d+)/);
  if (match) {
    return `--paragraph-spacing-${match[1]}`;
  }
  return null;
};

// 패러그래프 인덴트 변수 이름 변환
const transformParagraphIndentName = (varName) => {
  const match = varName.match(/--paragraph-indent-(\d+)/);
  if (match) {
    return `--paragraph-indent-${match[1]}`;
  }
  return null;
};

// 색상 그룹화 (메인 색상, variants 등)
const groupColors = (colors) => {
  const groups = {
    main: [],
    white: [],
    blue: [],
    navyblack: [],
    gray: [],
    dim: [],
    error: [],
  };

  colors.forEach(({ varName, value }) => {
    const transformed = transformColorName(varName);
    if (!transformed) return;

    const colorVar = { name: transformed, varName, value };

    // Main colors: -main으로 끝나는 것들
    if (varName.includes('-main') && !varName.includes('opacity')) {
      groups.main.push(colorVar);
    } else if (varName.includes('error-red')) {
      groups.error.push(colorVar);
    } else if (varName.includes('white-') && !varName.includes('-main')) {
      groups.white.push(colorVar);
    } else if (varName.includes('blue-') && !varName.includes('-main')) {
      groups.blue.push(colorVar);
    } else if (varName.includes('navyblack-') && !varName.includes('-main')) {
      groups.navyblack.push(colorVar);
    } else if (varName.includes('gray-') && !varName.includes('-main')) {
      groups.gray.push(colorVar);
    } else if (varName.includes('dim-')) {
      groups.dim.push(colorVar);
    }
  });

  // Main colors 정렬: orange, blue, white, gray, navyblack, black 순서
  const mainOrder = ['orange', 'blue', 'white', 'gray', 'navyblack', 'black'];

  // Error colors 정렬: error-red, error-red-darkmode 순서
  groups.error.sort((a, b) => {
    if (a.varName.includes('darkmode')) return 1;
    if (b.varName.includes('darkmode')) return -1;
    return 0;
  });
  groups.main.sort((a, b) => {
    const aIndex = mainOrder.findIndex((color) => a.varName.includes(color));
    const bIndex = mainOrder.findIndex((color) => b.varName.includes(color));
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  return groups;
};

// theme.css 생성
let themeContent = `@import 'tailwindcss';
@import './tokens.css';

@theme {
  /* ===== Colors ===== */
`;

// 색상 섹션 생성
const colorGroups = groupColors(categorized.color);

// Main colors
themeContent += `  /* Main colors */\n`;
colorGroups.main.forEach(({ name, varName }) => {
  themeContent += `  ${name}: var(${varName});\n`;
});

// White variants
if (colorGroups.white.length > 0) {
  themeContent += `\n  /* White variants */\n`;
  colorGroups.white.forEach(({ name, varName }) => {
    themeContent += `  ${name}: var(${varName});\n`;
  });
}

// Blue variants
if (colorGroups.blue.length > 0) {
  themeContent += `\n  /* Blue variants */\n`;
  colorGroups.blue.forEach(({ name, varName }) => {
    themeContent += `  ${name}: var(${varName});\n`;
  });
}

// Navyblack variants
if (colorGroups.navyblack.length > 0) {
  themeContent += `\n  /* Navyblack variants */\n`;
  colorGroups.navyblack.forEach(({ name, varName }) => {
    themeContent += `  ${name}: var(${varName});\n`;
  });
}

// Gray variants
if (colorGroups.gray.length > 0) {
  themeContent += `\n  /* Gray variants */\n`;
  colorGroups.gray.forEach(({ name, varName }) => {
    themeContent += `  ${name}: var(${varName});\n`;
  });
}

// Dim colors
if (colorGroups.dim.length > 0) {
  themeContent += `\n  /* Dim colors */\n`;
  colorGroups.dim.forEach(({ name, varName }) => {
    themeContent += `  ${name}: var(${varName});\n`;
  });
}

// Error colors
if (colorGroups.error.length > 0) {
  themeContent += `\n  /* Error colors */\n`;
  colorGroups.error.forEach(({ name, varName }) => {
    themeContent += `  ${name}: var(${varName});\n`;
  });
}

// Typography 섹션
themeContent += `\n  /* ===== Typography ===== */\n`;

// Font families
if (categorized['font-family'].length > 0) {
  themeContent += `  /* Font families */\n`;
  themeContent += `  --font-family-GMarketSans: 'GMarketSans', sans-serif;\n`;
  categorized['font-family'].forEach(({ varName }) => {
    const transformed = transformFontFamilyName(varName);
    if (transformed) {
      themeContent += `  ${transformed}: var(${varName});\n`;
    }
  });
}

// Font sizes
if (categorized['font-size'].length > 0) {
  themeContent += `\n  /* Font sizes */\n`;
  categorized['font-size']
    .sort((a, b) => {
      const aNum = parseInt(a.varName.match(/\d+/)?.[0] || '0');
      const bNum = parseInt(b.varName.match(/\d+/)?.[0] || '0');
      return aNum - bNum;
    })
    .forEach(({ varName }) => {
      const transformed = transformFontSizeName(varName);
      if (transformed) {
        themeContent += `  ${transformed}: var(${varName});\n`;
      }
    });
}

// Font weights
if (categorized['font-weight'].length > 0) {
  themeContent += `\n  /* Font weights */\n`;
  categorized['font-weight']
    .sort((a, b) => {
      const aNum = parseInt(a.varName.match(/\d+/)?.[0] || '0');
      const bNum = parseInt(b.varName.match(/\d+/)?.[0] || '0');
      return aNum - bNum;
    })
    .forEach(({ varName }) => {
      const transformed = transformFontWeightName(varName);
      if (transformed) {
        themeContent += `  ${transformed}: var(${varName});\n`;
      }
    });
}

// Line heights
if (categorized['line-height'].length > 0) {
  themeContent += `\n  /* Line heights */\n`;
  categorized['line-height']
    .sort((a, b) => {
      const aNum = parseInt(a.varName.match(/\d+/)?.[0] || '0');
      const bNum = parseInt(b.varName.match(/\d+/)?.[0] || '0');
      return aNum - bNum;
    })
    .forEach(({ varName }) => {
      const transformed = transformLineHeightName(varName);
      if (transformed) {
        themeContent += `  ${transformed}: var(${varName});\n`;
      }
    });
}

// Letter spacing
if (categorized['letter-spacing'].length > 0) {
  themeContent += `\n  /* Letter spacing */\n`;
  categorized['letter-spacing']
    .sort((a, b) => {
      const aNum = parseInt(a.varName.match(/\d+/)?.[0] || '0');
      const bNum = parseInt(b.varName.match(/\d+/)?.[0] || '0');
      return aNum - bNum;
    })
    .forEach(({ varName }) => {
      const transformed = transformLetterSpacingName(varName);
      if (transformed) {
        themeContent += `  ${transformed}: var(${varName});\n`;
      }
    });
}

// Shadows 섹션
if (categorized.shadow.length > 0) {
  themeContent += `\n  /* ===== Shadows ===== */\n`;
  categorized.shadow.forEach(({ varName }) => {
    const transformed = transformShadowName(varName);
    if (transformed) {
      themeContent += `  ${transformed}: var(${varName});\n`;
    }
  });
}

// Text utilities 섹션
themeContent += `\n  /* ===== Text utilities ===== */\n`;

if (categorized['text-case'].length > 0) {
  categorized['text-case'].forEach(({ varName }) => {
    const transformed = transformTextCaseName(varName);
    if (transformed) {
      themeContent += `  ${transformed}: var(${varName});\n`;
    }
  });
}

if (categorized['text-decoration'].length > 0) {
  categorized['text-decoration'].forEach(({ varName }) => {
    const transformed = transformTextDecorationName(varName);
    if (transformed) {
      themeContent += `  ${transformed}: var(${varName});\n`;
    }
  });
}

if (categorized['paragraph-spacing'].length > 0) {
  categorized['paragraph-spacing'].forEach(({ varName }) => {
    const transformed = transformParagraphSpacingName(varName);
    if (transformed) {
      themeContent += `  ${transformed}: var(${varName});\n`;
    }
  });
}

if (categorized['paragraph-indent'].length > 0) {
  categorized['paragraph-indent'].forEach(({ varName }) => {
    const transformed = transformParagraphIndentName(varName);
    if (transformed) {
      themeContent += `  ${transformed}: var(${varName});\n`;
    }
  });
}

themeContent += `}\n\n`;

// Typography Utilities 섹션
themeContent += `/* ===== Typography Utilities ===== */\n`;

// Header typography utilities
if (categorized.header.length > 0) {
  themeContent += `/* Header typography */\n`;
  categorized.header
    .sort((a, b) => {
      // hd42, hd36 등 숫자 순서로 정렬
      const aMatch = a.varName.match(/hd(\d+)/);
      const bMatch = b.varName.match(/hd(\d+)/);
      if (aMatch && bMatch) {
        return parseInt(bMatch[1]) - parseInt(aMatch[1]); // 내림차순
      }
      return 0;
    })
    .forEach(({ varName }) => {
      const match = varName.match(/--header-hd(\d+)(?:-(\w+))?/);
      if (match) {
        const size = match[1];
        const variant = match[2] || '';
        const utilityName = variant ? `hd${size}-${variant}` : `hd${size}`;
        themeContent += `@utility ${utilityName} {\n`;
        themeContent += `  font: var(${varName});\n`;
        themeContent += `}\n\n`;
      }
    });
}

// Body typography utilities
if (categorized.body.length > 0) {
  themeContent += `/* Body typography */\n`;
  categorized.body
    .sort((a, b) => {
      // bd32, bd30 등 숫자 순서로 정렬
      const aMatch = a.varName.match(/bd(\d+)/);
      const bMatch = b.varName.match(/bd(\d+)/);
      if (aMatch && bMatch) {
        return parseInt(bMatch[1]) - parseInt(aMatch[1]); // 내림차순
      }
      return 0;
    })
    .forEach(({ varName }) => {
      const match = varName.match(/--body-bd(\d+)/);
      if (match) {
        const size = match[1];
        themeContent += `@utility bd${size} {\n`;
        themeContent += `  font: var(${varName});\n`;
        themeContent += `}\n\n`;
      }
    });
}

// 파일 쓰기
writeFileSync(THEME_CSS_PATH, themeContent, 'utf-8');
console.log(`✅ theme.css가 성공적으로 생성되었습니다: ${THEME_CSS_PATH}`);
