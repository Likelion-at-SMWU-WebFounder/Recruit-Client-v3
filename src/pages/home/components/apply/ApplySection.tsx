import { useNavigate } from 'react-router-dom';
import { ROUTER_URL } from '@/shared/constants/url';

import SubTitle from '@shared/components/SubTitle';
import DefaultButton from '@shared/components/button/DefaultButton';

import { SUB_TITLE } from '@pages/home/constants/index';
import { combineStyles } from '@shared/utils/combineStyles';
import { APPLY_BUTTON_TEXT } from '@pages/home/constants/apply';

// ApplySection 스타일 상수화
const APPLY_SECTION_STYLES = {
  container: {
    base: 'relative flex h-[100dvh] w-full max-w-[100vw] flex-col justify-center items-center overflow-hidden bg-cover bg-center bg-no-repeat',
  },
  content: {
    base: 'inline-flex flex-col items-center justify-center z-10 ',
    desktop: 'lg:gap-[35rem]',
    tablet: 'md:gap-[25rem]',
    mobile: 'gap-[20rem]',
  },
};
const ApplySection = () => {
  const APPLY_BACKGROUND_IMAGES_PATH = import.meta.env.VITE_IMAGE_PATH + '/home/apply/apply-background.webp';

  const containerClassName = combineStyles(APPLY_SECTION_STYLES.container);

  const contentClassName = combineStyles(APPLY_SECTION_STYLES.content);

  const navigate = useNavigate();
  const handleApplyClick = () => {
    navigate(ROUTER_URL.APPLY);
  };

  return (
    <div
      className={containerClassName}
      style={{
        background: `url(${APPLY_BACKGROUND_IMAGES_PATH})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 z-10 bg-black/[0.62]" />

      <div className={contentClassName}>
        <SubTitle subTitle={SUB_TITLE.SUB_TITLE_6} subDescription={SUB_TITLE.SUB_DESCRIPTION_6} mode="dark" />

        <DefaultButton onClick={handleApplyClick} backgroundType="white" className="cta-guide">
          {' '}
          {/* cta-guide: GA4 트리거 적용 */}
          {APPLY_BUTTON_TEXT}
        </DefaultButton>
      </div>
    </div>
  );
};

export default ApplySection;
