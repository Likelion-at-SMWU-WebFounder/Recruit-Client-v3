import SubTitle from '@shared/components/SubTitle';
import { SUB_TITLE, TEXT_CONTENT_CLASSES } from '@pages/home/constants/index';
import { ACTIVITY_CONTENT_TEXT } from '@pages/home/constants/activity';

const DESKTOP_TABLET_SECTION_CLASS =
  'hidden w-full max-w-[100vw] h-[100dvh] pt-[5rem] md:inline-flex md:justify-center md:items-center';
const MOBILE_SECTION_CLASS =
  'relative flex w-full max-w-[100vw] h-[100dvh] flex-col items-center justify-center py-[3.12rem] md:hidden';
const MOBILE_SUB_CONTENT_CLASSES = `${TEXT_CONTENT_CLASSES} w-[22rem] text-center`;

const ActivitySection = () => {
  return (
    <>
      {/* 데스크톱, 태블릿 */}
      <section className={DESKTOP_TABLET_SECTION_CLASS}>
        <div className="mb-[3rem] inline-flex flex-col items-start justify-center gap-[1.25rem]">
          <SubTitle subTitle={SUB_TITLE.SUB_TITLE_1} subDescription={SUB_TITLE.SUB_DESCRIPTION_1} align="left" />
          <div className={`${TEXT_CONTENT_CLASSES} hidden lg:block`}>{ACTIVITY_CONTENT_TEXT.desktop}</div>
          <div className={`${TEXT_CONTENT_CLASSES} lg:hidden`}>{ACTIVITY_CONTENT_TEXT.tablet}</div>
        </div>
        <div className="">활동사진</div>
      </section>

      {/* 모바일 */}
      <section className={MOBILE_SECTION_CLASS}>
        <div className="inline-flex flex-col items-center justify-center gap-[3.125rem]">
          <SubTitle subTitle={SUB_TITLE.SUB_TITLE_1} subDescription={SUB_TITLE.SUB_DESCRIPTION_1} />
          <div className={MOBILE_SUB_CONTENT_CLASSES}>{ACTIVITY_CONTENT_TEXT.mobile}</div>
        </div>
      </section>
    </>
  );
};

export default ActivitySection;
