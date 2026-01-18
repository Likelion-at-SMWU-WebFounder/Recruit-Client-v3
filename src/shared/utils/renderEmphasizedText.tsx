import { Fragment, type ReactNode } from 'react';

type RenderEmphasizedTextOptions = {
  emphasisClassName?: string;
  partClassName?: string;
};

export const renderEmphasizedText = (text: string, options: RenderEmphasizedTextOptions = {}): ReactNode[] => {
  const { emphasisClassName = 'font-[600] md:font-[800]', partClassName = 'text-gray' } = options;

  // 별(*) 강조 텍스트와 괄호 형식 텍스트를 모두 자동으로 처리
  return text.split(/(\*[^*]+\*|\([A-Z]+\))/g).map((segment, index) => {
    if (!segment) {
      return null;
    }

    const key = `segment-${index}`;

    // 강조된 텍스트 처리 (*텍스트*)
    if (segment.startsWith('*') && segment.endsWith('*')) {
      return (
        <span key={key} className={emphasisClassName}>
          {segment.slice(1, -1)}
        </span>
      );
    }

    // 괄호 형식 파트 텍스트 처리 (FE), (PM), (BE)
    if (segment.match(/^\([A-Z]+\)$/)) {
      return (
        <span key={key} className={partClassName}>
          {segment}
        </span>
      );
    }

    // 일반 텍스트 처리
    return <Fragment key={key}>{segment}</Fragment>;
  });
};
