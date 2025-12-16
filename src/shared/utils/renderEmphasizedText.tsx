import { Fragment, type ReactNode } from 'react';

type RenderEmphasizedTextOptions = {
  emphasisClassName?: string;
};

export const renderEmphasizedText = (text: string, options: RenderEmphasizedTextOptions = {}): ReactNode[] => {
  const { emphasisClassName = 'font-[700] md:font-[800]' } = options;

  // 강조된 텍스트 추출
  return text.split(/(\*[^*]+\*)/g).map((segment, index) => {
    if (!segment) {
      return null;
    }

    // 키 생성
    const key = `segment-${index}`;

    // 강조된 텍스트 처리
    if (segment.startsWith('*') && segment.endsWith('*')) {
      return (
        <span key={key} className={emphasisClassName}>
          {segment.slice(1, -1)}
        </span>
      );
    }

    // 일반 텍스트 처리
    return <Fragment key={key}>{segment}</Fragment>;
  });
};
