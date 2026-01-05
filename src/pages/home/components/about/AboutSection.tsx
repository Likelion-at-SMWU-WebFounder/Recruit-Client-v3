import SubTitle from '@shared/components/SubTitle';
import { SUB_TITLE, SUB_CONTENT_CLASSES } from '@pages/home/constants/index';
import AboutCard from '@pages/home/components/about/AboutCard';

const AboutSection = () => {
  const DESKTOP_TABLET_SECTION_CLASS =
    'hidden w-full max-w-[100vw] md:flex md:flex-col md:items-center md:p-[10.5rem_2rem]';
  const MOBILE_SECTION_CLASS =
    'relative flex w-full max-w-[100vw] flex-col items-center justify-center gap-[3.38rem] py-[3.12rem] md:hidden';

  return (
    <>
      {/* 데스크톱, 태블릿 */}
      <section className={DESKTOP_TABLET_SECTION_CLASS}>
        <div className="inline-flex flex-col items-center justify-center gap-[3.125rem]">
          <SubTitle subTitle={SUB_TITLE.SUB_TITLE_1} subDescription={SUB_TITLE.SUB_DESCRIPTION_1} />
          <div className={`${SUB_CONTENT_CLASSES}`}>{SUB_TITLE.SUB_CONTENT_1}</div>
        </div>
        <AboutCard />
      </section>

      {/* 모바일 */}
      <section className={MOBILE_SECTION_CLASS}>
        <div className="inline-flex flex-col items-center justify-center gap-[3.125rem]">
          <SubTitle subTitle={SUB_TITLE.SUB_TITLE_1} subDescription={SUB_TITLE.SUB_DESCRIPTION_1} />
          <AboutCard />
          <div className={`${SUB_CONTENT_CLASSES}`}>{SUB_TITLE.SUB_CONTENT_1}</div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
