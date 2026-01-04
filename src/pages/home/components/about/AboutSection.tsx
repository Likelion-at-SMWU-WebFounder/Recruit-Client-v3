import SubTitle from '@shared/components/SubTitle';
import { SUB_TITLE, SUB_CONTENT_CLASSES } from '@pages/home/constants/index';
// import { ABOUT_IMAGE_PATH } from '@pages/home/constants/about';

const AboutSection = () => {
  const DESKTOP_TABLET_SECTION_CLASS =
    'hidden h-[100dvh] w-full max-w-[100vw] md:flex md:flex-col md:items-center md:p-[10.5rem_2rem]';
  const MOBILE_SECTION_CLASS =
    'relative flex w-full max-w-[100vw] flex-col items-center justify-center gap-[3.38rem] py-[3.12rem] md:hidden';

  return (
    <>
      {/* 태블릿/데스크톱: 카드 */}
      <section className={DESKTOP_TABLET_SECTION_CLASS}>
        <div className="inline-flex flex-col items-center justify-center gap-[3.125rem]">
          <SubTitle subTitle={SUB_TITLE.SUB_TITLE_1} subDescription={SUB_TITLE.SUB_DESCRIPTION_1} />
          <div className={`${SUB_CONTENT_CLASSES}`}>{SUB_TITLE.SUB_CONTENT_1}</div>
        </div>
        <div className=""></div>
      </section>

      {/* 모바일: 카드 */}
      <section className={MOBILE_SECTION_CLASS}></section>
    </>
  );
};

export default AboutSection;
