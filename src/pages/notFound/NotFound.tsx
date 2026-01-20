import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { combineStyles } from '@shared/utils/combineStyles';
import DefaultButton from '@shared/components/button/DefaultButton';
import { ROUTER_URL } from '@shared/constants/url';
import errorIcon from './assets/error-icon.svg';

// Not Found 페이지 스타일 상수화
const NOT_FOUND_STYLES = {
  container: {
    base: 'flex h-[100dvh] flex-col items-center justify-center',
  },
  content: {
    base: 'flex flex-col items-center gap-[1.62rem] text-center',
    tablet: 'md:gap-[2.25rem]',
  },
  errorIcon: {
    base: 'w-[3.9375rem] h-[3.9375rem] aspect-square',
    tablet: 'md:w-[6rem] md:h-[6rem]',
    desktop: 'lg:w-[6.3rem] lg:h-[6.3rem]',
  },
  messageContainer: {
    base: 'flex flex-col gap-[1rem]',
    tablet: 'md:gap-[1.62rem]',
  },
  messageTitle: {
    base: 'text-navyblack/90 text-[1.75rem] font-bold leading-[150%] tracking-[-0.0385rem]',
    tablet: 'md:text-[3rem] md:tracking-[-0.066rem]',
    desktop: 'lg:text-[3.25rem] tracking-[-0.0715rem]',
  },
  description: {
    base: 'text-navyblack/70 text-[1rem] font-medium leading-[170%]',
    tablet: 'md:text-[1.5rem]',
    desktop: 'lg:text-[1.75rem] leading-[180%]',
  },
  lineBreak: {
    base: 'block',
    tablet: 'md:hidden',
  },
} as const;

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGoHome = () => {
    navigate(ROUTER_URL.HOME);
  };

  const containerClassName = combineStyles(NOT_FOUND_STYLES.container);
  const contentClassName = combineStyles(NOT_FOUND_STYLES.content);
  const errorIconClassName = combineStyles(NOT_FOUND_STYLES.errorIcon);
  const messageContainerClassName = combineStyles(NOT_FOUND_STYLES.messageContainer);
  const messageTitleClassName = combineStyles(NOT_FOUND_STYLES.messageTitle);
  const descriptionClassName = combineStyles(NOT_FOUND_STYLES.description);
  const lineBreakClassName = combineStyles(NOT_FOUND_STYLES.lineBreak);

  return (
    <div className={containerClassName}>
      <div className={contentClassName}>
        {/* 404 에러 아이콘 */}
        <img src={errorIcon} alt="에러 아이콘" className={errorIconClassName} />

        {/* 에러 메시지 */}
        <div className={messageContainerClassName}>
          <h2 className={messageTitleClassName}>잘못된 접근입니다.</h2>
          <p className={descriptionClassName}>
            방문하시려는 페이지의 주소가 잘못 입력되었거나,
            <br />
            페이지의 주소가 변경 혹은 삭제되어 <br className={lineBreakClassName} /> 요청하신 페이지를 찾을 수 없습니다.
          </p>
        </div>

        {/* 홈으로 가기 버튼 */}
        <DefaultButton onClick={handleGoHome} isIcon={false}>
          홈으로 바로가기
        </DefaultButton>
      </div>
    </div>
  );
};

export default NotFound;
