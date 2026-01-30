import { useNavigate } from 'react-router-dom';
import { combineStyles } from '@shared/utils/combineStyles';

import { ROUTER_URL } from '@shared/constants/url';
import { JOIN_IMAGE_ALT, JOIN_BUTTON_TEXT } from '@pages/about/constants/join';
import { SUB_TITLE } from '@pages/about/constants/index';

import SubTitle from '@shared/components/SubTitle';
import DefaultButton from '@shared/components/button/DefaultButton';

import joinImage from '@pages/about/assets/join/join-image.png';

// JoinSection 스타일 상수화
const JOIN_SECTION_STYLES = {
  container: {
    base: 'w-full max-w-[100vw] space-y-[4.25rem] px-[1rem] pt-[4.875rem] pb-[6.25rem]',
    tablet: 'md:space-y-[5.56rem] md:px-[4rem] md:pt-[5.875rem] md:pb-[7rem]',
    desktop: 'lg:space-y-[5rem] lg:px-[13.9375rem] lg:py-[4.25rem]',
  },
  imageWrapper: {
    base: 'group relative w-full max-w-[100vw] rounded-[1.25rem]',
  },
  image: {
    base: 'h-auto w-full rounded-[1.25rem]',
  },
  overlay: {
    base: 'pointer-events-none absolute inset-0 rounded-[1.25rem] bg-black/0 transition-colors duration-300 group-hover:bg-black/70',
    desktop: 'lg:block',
  }, // 호버 오버레이 스타일 (데스크톱 버전에서만 노출)
  overlayButton: {
    base: 'absolute inset-0 hidden items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100',
    desktop: 'lg:flex',
  }, // 호버 오버레이 버튼 스타일 (데스크톱 버전에서만 노출)
  mobileButton: {
    base: 'mt-[3.75rem] flex justify-center',
    desktop: 'lg:hidden',
  }, // 모바일 버튼 스타일
} as const;

const JoinSection = () => {
  const navigate = useNavigate();
  const handleJoinClick = () => {
    navigate(ROUTER_URL.APPLY);
  };

  const containerClassName = combineStyles(JOIN_SECTION_STYLES.container);
  const imageWrapperClassName = combineStyles(JOIN_SECTION_STYLES.imageWrapper);
  const imageClassName = combineStyles(JOIN_SECTION_STYLES.image);
  const overlayClassName = combineStyles(JOIN_SECTION_STYLES.overlay);
  const overlayButtonClassName = combineStyles(JOIN_SECTION_STYLES.overlayButton);
  const mobileButtonClassName = combineStyles(JOIN_SECTION_STYLES.mobileButton);

  return (
    <div className={containerClassName}>
      <SubTitle subTitle={SUB_TITLE.SUB_TITLE_4} subDescription={SUB_TITLE.SUB_DESCRIPTION_4} />

      {/* 이미지 + desktop 호버 오버레이: tablet, mobile에서는 이미지만 노출 */}
      <div className={imageWrapperClassName}>
        <img src={joinImage} alt={JOIN_IMAGE_ALT} className={imageClassName} loading="lazy" />

        {/* 호버 오버레이 + 가운데 버튼: desktop에서만 노출 */}
        <div className={overlayClassName} />

        <div className={overlayButtonClassName}>
          <DefaultButton onClick={handleJoinClick} backgroundType="blue" className="cta-guide">
            {' '}
            {/* cta-guide: GA4 트리거 적용 */}
            {JOIN_BUTTON_TEXT}
          </DefaultButton>
        </div>
      </div>

      {/* tablet, mobile 버튼 */}
      <div className={mobileButtonClassName}>
        <DefaultButton onClick={handleJoinClick} backgroundType="blue" className="cta-guide">
          {' '}
          {/* cta-guide: GA4 트리거 적용 */}
          {JOIN_BUTTON_TEXT}
        </DefaultButton>
      </div>
    </div>
  );
};

export default JoinSection;
