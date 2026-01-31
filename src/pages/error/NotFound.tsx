import { combineStyles } from '@shared/utils/combineStyles';
import ErrorLayout from './components/ErrorLayout';
import { ERROR_MESSAGES } from './constants';

// 모바일에서만 줄바꿈 적용하기 위한 스타일 상수화
const LINE_BREAK_STYLES = {
  base: 'block',
  tablet: 'md:hidden',
} as const;

const NotFound = () => {
  const lineBreakClassName = combineStyles(LINE_BREAK_STYLES);

  return (
    <ErrorLayout title={ERROR_MESSAGES.NOT_FOUND.TITLE}>
      <>
        {ERROR_MESSAGES.NOT_FOUND.DESCRIPTION_LINE1}
        <br />
        {ERROR_MESSAGES.NOT_FOUND.DESCRIPTION_LINE2} <br className={lineBreakClassName} />{' '}
        {ERROR_MESSAGES.NOT_FOUND.DESCRIPTION_LINE3}
      </>
    </ErrorLayout>
  );
};

export default NotFound;
