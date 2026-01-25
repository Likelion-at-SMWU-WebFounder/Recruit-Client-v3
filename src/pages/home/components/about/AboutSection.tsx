import { useNavigate } from 'react-router-dom';
import { ROUTER_URL } from '@/shared/constants/url';

import SubTitle from '@shared/components/SubTitle';
import { SUB_TITLE, TEXT_CONTENT_CLASSES } from '@pages/home/constants/index';
import { ABOUT_BUTTON_TEXT, ABOUT_CONTENT_TEXT } from '@pages/home/constants/about';

import AboutCard from '@pages/home/components/about/AboutCard';
import DefaultButton from '@shared/components/button/DefaultButton';

const DESKTOP_TABLET_SECTION_CLASS =
  'hidden w-full max-w-[100vw] h-[100dvh] pt-[5rem] md:inline-flex md:flex-col md:justify-center md:items-center';
const MOBILE_SECTION_CLASS =
  'relative flex w-full max-w-[100vw] h-[100dvh] flex-col items-center justify-center py-[3.12rem] md:hidden';
const MOBILE_SUB_CONTENT_CLASSES = `${TEXT_CONTENT_CLASSES} w-[22rem] text-center`;

const AboutSection = () => {
  const navigate = useNavigate();
  const handleAboutClick = () => {
    navigate(ROUTER_URL.ABOUT);
  };
  return (
    <>
      {/* 데스크톱, 태블릿 */}
      <section className={DESKTOP_TABLET_SECTION_CLASS}>
        <div className="mb-[3rem] inline-flex flex-col items-center justify-center gap-[1.25rem] text-center">
          <SubTitle subTitle={SUB_TITLE.SUB_TITLE_1} subDescription={SUB_TITLE.SUB_DESCRIPTION_1} />
          <div className={`${TEXT_CONTENT_CLASSES} hidden lg:block`}>{ABOUT_CONTENT_TEXT.desktop}</div>
          <div className={`${TEXT_CONTENT_CLASSES} lg:hidden`}>{ABOUT_CONTENT_TEXT.tablet}</div>
        </div>
        <AboutCard />
        <div className="mt-[2rem]">
          <DefaultButton onClick={handleAboutClick} backgroundType="white">
            {ABOUT_BUTTON_TEXT.desktop_tablet}
          </DefaultButton>
        </div>
      </section>

      {/* 모바일 */}
      <section className={MOBILE_SECTION_CLASS}>
        <div className="inline-flex flex-col items-center justify-center gap-[3.125rem]">
          <SubTitle subTitle={SUB_TITLE.SUB_TITLE_1} subDescription={SUB_TITLE.SUB_DESCRIPTION_1} />
          <AboutCard />
          <div className={MOBILE_SUB_CONTENT_CLASSES}>{ABOUT_CONTENT_TEXT.mobile}</div>
        </div>
        <div className="mt-[2.5rem]">
          <DefaultButton onClick={handleAboutClick} backgroundType="white">
            {ABOUT_BUTTON_TEXT.mobile}
          </DefaultButton>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
