import SubTitle from '@shared/components/SubTitle';
import { SUB_TITLE } from '@pages/home/constants/index';
import { combineStyles } from '@shared/utils/combineStyles';

// ApplySection 스타일 상수화
const APPLY_SECTION_STYLES = {
  container: {
    base: 'relative flex h-[100dvh] w-full max-w-[100vw] flex-col items-center overflow-hidden bg-cover bg-center bg-no-repeat ',
  },
  textContainer: {
    base: 'inline-flex flex-col items-center justify-center gap-[1.25rem]',
    tablet: 'md:mt-[6rem]',
  },
};
const ApplySection = () => {
  const APPLY_BACKGROUND_IMAGES_PATH = import.meta.env.VITE_IMAGE_PATH + '/home/apply/home-apply.webp';

  const containerClassName = combineStyles(APPLY_SECTION_STYLES.container);
  const textContainerClassName = combineStyles(APPLY_SECTION_STYLES.textContainer);

  return (
    <div className={containerClassName} style={{ backgroundImage: `url(${APPLY_BACKGROUND_IMAGES_PATH})` }}>
      <div className={textContainerClassName}>
        <SubTitle subTitle={SUB_TITLE.SUB_TITLE_6} subDescription={SUB_TITLE.SUB_DESCRIPTION_6} mode="dark" />
      </div>
    </div>
  );
};

export default ApplySection;
