import { useState } from 'react';
import {
  SECTION_TITLES,
  SECTION_SUB_TITLES,
  RECRUIT_INFO_TABS,
  QUALIFICATIONS,
  ACTIVITY_INFO,
  BONUS_INFO,
  BONUS_LINK,
} from '../../constants/index';
import SubTitle from '@/shared/components/SubTitle';

const TW = {
  // layout
  section:
    'flex h-auto w-full items-center justify-center bg-[--color-white-main] px-[1rem] py-[10rem] md:px-[4rem] md:py-[12.35738rem] md:px-[4.0625rem] lg:px-[10.15625rem] lg:py-[13.3125rem]',
  container: 'flex w-full flex-col items-center',

  // heading
  headingBox: 'mb-[4.5rem] flex flex-col items-center md:mb-[6.89rem] lg:mb-[5.44rem]',

  // common text (content)
  contentText: 'text-[0.875rem] font-medium text-[var(--color-white-main)] md:text-[1rem] lg:text-[1.5rem] break-keep',
  contentTitle:
    'text-[1rem] font-semibold text-[var(--color-white-main)] md:text-[1.125rem] lg:text-[1.75rem] break-keep',
  preline: 'whitespace-pre-line break-keep',

  // qualification list
  qualList: 'flex flex-col items-start gap-2 text-left md:gap-3',
  qualItem: 'flex items-start gap-2',
  qualDot: 'mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#F7FAFF] md:mt-2 md:h-1.5 md:w-1.5',

  // activity/bonus blocks
  infoBlockWrap: 'flex flex-col items-start gap-4 text-left md:gap-6',
  infoBlock: '',
  infoTextGap: 'mt-1 md:mt-2',

  // bonus link
  link: 'mt-1 inline-flex items-center gap-1 text-[0.875rem] font-medium text-[#F7FAFF] underline md:mt-2 md:text-[1rem] lg:text-[1.25rem]',
  linkIcon: 'h-3 w-3 md:h-4 md:w-4',

  // mobile tabs
  mobileWrap: 'flex h-[28.0625rem] w-[22.5625rem] flex-row items-start justify-center gap-2 md:hidden',
  mobileCardActive:
    'flex h-[19.875rem] w-[15.8125rem] flex-col items-center gap-[2.1875rem] rounded-[1.25rem] bg-[#4284FF] pt-[1.5625rem] pr-[0.625rem] pb-[2.375rem] pl-[0.625rem] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)]',
  mobileCardActiveTitle: 'text-center text-[1.25rem] font-semibold text-[#F7FAFF]',
  mobileCardInactiveWrap: 'relative h-[19.875rem] w-[2.75rem]',
  mobileCardInactiveBtn:
    'absolute top-0 left-0 flex h-[2.75rem] w-[19.875rem] origin-top-left translate-y-[19.875rem] -rotate-90 items-center justify-center rounded-[1.25rem] bg-[#F7FAFF] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] cursor-pointer',
  mobileCardInactiveTitle: 'text-center text-[1.25rem] font-semibold text-[#1B2634]',

  // desktop tabs
  desktopWrap: 'hidden w-full flex-row items-start justify-center gap-4 md:flex lg:gap-6',
  desktopBtnBase: 'flex flex-col items-center rounded-[1.25rem] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)]',
  desktopActive:
    'h-auto w-[14rem] gap-6 bg-[#4284FF] p-5 lg:h-[29.0625rem] lg:w-[32.3125rem] lg:p-[3.03125rem_2.3125rem]',
  desktopInactive: 'h-[5rem] w-[14rem] bg-[#F7FAFF] lg:h-[8.8125rem] lg:w-[32.3125rem] cursor-pointer',
  desktopActiveInner: 'flex w-full flex-col items-center gap-6',
  desktopActiveTitle: 'text-center text-[1.5625rem] font-semibold text-[#F7FAFF] lg:text-[2.25rem]',
  desktopInactiveTitle:
    'flex h-full w-full items-center justify-center text-center text-[1.5625rem] font-semibold text-[#1B2634] lg:text-[2.25rem]',
} as const;

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const RecruitInfoSection = () => {
  const [activeTab, setActiveTab] = useState<string>('qualification');

  const renderQualificationContent = () => (
    <ul className={TW.qualList}>
      {QUALIFICATIONS.map((item, index) => (
        <li key={index} className={TW.qualItem}>
          <span className={TW.qualDot} />
          <span className={cx(TW.contentText, TW.preline)}>{item}</span>
        </li>
      ))}
    </ul>
  );

  const renderActivityContent = () => (
    <div className={TW.infoBlockWrap}>
      <div className={TW.infoBlock}>
        <h4 className={TW.contentTitle}>{ACTIVITY_INFO.sessionTitle}</h4>
        <p className={cx(TW.infoTextGap, TW.contentText)}>{ACTIVITY_INFO.sessionPeriod}</p>
        <p className={TW.contentText}>{ACTIVITY_INFO.sessionTime}</p>
      </div>
      <div className={TW.infoBlock}>
        <h4 className={TW.contentTitle}>{ACTIVITY_INFO.feeTitle}</h4>
        <p className={cx(TW.infoTextGap, TW.contentText)}>{ACTIVITY_INFO.feeAmount}</p>
        <p className={TW.contentText}>{ACTIVITY_INFO.feeNote}</p>
      </div>
    </div>
  );

  const renderBonusContent = () => (
    <div className={TW.infoBlockWrap}>
      <div className={TW.infoBlock}>
        <h4 className={TW.contentTitle}>{BONUS_INFO.courseTitle}</h4>
        <a href={BONUS_LINK.PROGRAMMERS_COURSE} target="_blank" rel="noopener noreferrer" className={TW.link}>
          {BONUS_INFO.courseLink}
          <svg className={TW.linkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
        <p className={TW.contentText}>{BONUS_INFO.courseNote}</p>
      </div>
      <div className={TW.infoBlock}>
        <h4 className={TW.contentTitle}>{BONUS_INFO.verifyTitle}</h4>
        <p className={cx(TW.infoTextGap, TW.contentText, TW.preline)}>{BONUS_INFO.verifyMethod}</p>
      </div>
    </div>
  );

  const renderContent = (tabId: string) => {
    switch (tabId) {
      case 'qualification':
        return renderQualificationContent();
      case 'activity':
        return renderActivityContent();
      case 'bonus':
        return renderBonusContent();
      default:
        return null;
    }
  };

  return (
    <section className={TW.section}>
      <div className={TW.container}>
        {/* heading */}
        <div className={TW.headingBox}>
          <SubTitle
            mode="light"
            align="center"
            subTitle={SECTION_SUB_TITLES.GENERATION}
            subDescription={SECTION_TITLES.RECRUIT_INFO}
          />
        </div>

        {/* mobile */}
        <div className={TW.mobileWrap}>
          {RECRUIT_INFO_TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return isActive ? (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={TW.mobileCardActive}>
                <h3 className={TW.mobileCardActiveTitle}>{tab.label}</h3>
                <div className="w-full">{renderContent(tab.id)}</div>
              </button>
            ) : (
              <div key={tab.id} className={TW.mobileCardInactiveWrap}>
                <button onClick={() => setActiveTab(tab.id)} className={TW.mobileCardInactiveBtn}>
                  <span className={TW.mobileCardInactiveTitle}>{tab.label}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* tablet/desktop */}
        <div className={TW.desktopWrap}>
          {RECRUIT_INFO_TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cx(TW.desktopBtnBase, isActive ? TW.desktopActive : TW.desktopInactive)}>
                {isActive ? (
                  <div className={TW.desktopActiveInner}>
                    <h3 className={TW.desktopActiveTitle}>{tab.label}</h3>
                    <div className="w-full">{renderContent(tab.id)}</div>
                  </div>
                ) : (
                  <span className={TW.desktopInactiveTitle}>{tab.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecruitInfoSection;
