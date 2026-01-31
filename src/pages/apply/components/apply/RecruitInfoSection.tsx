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

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const TW = {
  // layout
  section:
    'flex h-auto w-full items-center justify-center bg-[--color-white-main] px-[1rem] py-[10rem] md:py-[12.0625rem] lg:px-[10.15625rem] lg:py-[13.3125rem]',
  container: 'flex w-full flex-col items-center',

  // heading
  headingBox: 'mb-[4.5rem] flex flex-col items-center md:mb-[6.89rem] lg:mb-[5.44rem]',

  // common text (content)
  contentText:
    'text-[0.875rem] font-medium text-[var(--color-white-main)] md:text-[1rem] lg:text-[1.5rem] leading-[120%]',
  contentTitle:
    'text-[1rem] font-bold text-[var(--color-white-main)] md:text-[1.125rem] lg:text-[1.75rem] leading-[120%]',
  preline: 'whitespace-pre-line break-keep',

  // qualification list
  qualList: 'flex flex-col items-start gap-[1.25rem] text-left md:gap-[1.25rem] lg:gap-[1.5rem]',
  qualItem: 'flex items-start gap-2 lg:gap-3',
  qualDot:
    'mt-[0.4rem] h-[0.2rem] w-[0.2rem] flex-shrink-0 rounded-full bg-[var(--color-white-main)] md:mt-[0.5rem] md:h-[0.2rem] md:w-[0.2rem] lg:h-[0.3rem] lg:w-[0.3rem] lg:mt-[0.7rem]',

  // activity/bonus blocks
  infoBlockWrap: 'flex flex-col items-start gap-[2.8125rem] text-left md:gap-[3.0625rem] lg:gap-[3.125rem]',
  infoBlock: '',
  infoTextGap: 'mt-[0.75rem]',

  // bonus link
  link: cx(
    'mt-[0.75rem] inline-flex items-center gap-1',
    'text-[0.875rem] font-medium text-[var(--color-white-main)]',
    'md:text-[1rem] lg:text-[1.5rem] leading-[120%]',
    'border-b border-b-[var(--color-white-main)] border-opacity-50 pb-[0.1rem] hover:border-opacity-100 transition-all'
  ),
  linkIcon:
    'flex-shrink-0 stroke-[var(--color-white-main)] lg:stroke-[2px] stroke-[1.5px] w-[0.61881rem] h-[0.72194rem] lg:w-[0.75rem] lg:h-[0.875rem]',

  // mobile tabs
  mobileWrap: 'flex h-[19.875rem] w-full flex-row items-stretch justify-center gap-2 md:hidden',
  mobileCardBase:
    'relative flex overflow-hidden rounded-[1.25rem] transition-all duration-500 ease-in-out cursor-pointer shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)]',
  mobileCardActive: 'w-[15.8125rem] h-[19.875rem] bg-[var(--color-blue-main)] py-[1.5625rem] px-[0.9rem] items-start',
  mobileCardInactive: 'w-[2.75rem] h-[19.875rem] bg-[var(--color-white-main)] items-center justify-center',
  mobileCardActiveTitle: 'text-center text-[1.25rem] font-semibold text-[var(--color-white-main)] leading-[120%]',
  mobileCardInactiveTitle:
    'whitespace-nowrap -rotate-90 text-[1.25rem] font-semibold text-[var(--color-navyblack-main)] leading-[120%] transition-all duration-500',

  // desktop tabs
  desktopWrap: 'hidden w-full flex-row items-start justify-center md:flex lg:gap-[1.38rem] gap-[1rem]',
  desktopBtnBase: 'flex flex-col items-center rounded-[1.25rem] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)]',
  desktopActive:
    'h-[20.6875rem] w-[18rem] bg-[var(--color-blue-main)] py-[1.5625rem] px-[0.9rem] lg:h-[29.0625rem] lg:w-[32.3125rem] lg:py-[3.03125rem] lg:px-[2.3125rem]',
  desktopInactive: 'h-[4.9375rem] w-[18rem] bg-[#F7FAFF] lg:h-[8.8125rem] lg:w-[32.3125rem] cursor-pointer',
  desktopActiveInner: 'flex w-full flex-col items-center justify-between lg:gap-[3.125rem] gap-[1.8125rem]',
  desktopActiveTitle:
    'text-center text-[1.5625rem] font-semibold text-[var(--color-white-main)] lg:text-[2.25rem] leading-[120%]',
  desktopInactiveTitle:
    'flex h-full w-full items-center justify-center text-center text-[1.5625rem] font-semibold text-[var(--color-navyblack-main)] lg:text-[2.25rem] leading-[120%]',
} as const;

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
        <p className={cx(TW.contentText, 'mt-[0.5rem]')}>{ACTIVITY_INFO.sessionTime}</p>
      </div>
      <div className={TW.infoBlock}>
        <h4 className={TW.contentTitle}>{ACTIVITY_INFO.feeTitle}</h4>
        <p className={cx(TW.infoTextGap, TW.contentText)}>{ACTIVITY_INFO.feeAmount}</p>
        <p className={cx(TW.contentText, 'mt-[0.5rem]')}>{ACTIVITY_INFO.feeNote}</p>
      </div>
    </div>
  );

  const renderBonusContent = () => (
    <div className={TW.infoBlockWrap}>
      <div className={TW.infoBlock}>
        <h4 className={TW.contentTitle}>{BONUS_INFO.courseTitle}</h4>
        <a href={BONUS_LINK.PROGRAMMERS_COURSE} target="_blank" rel="noopener noreferrer" className={TW.link}>
          {BONUS_INFO.courseLink}
          <svg className={TW.linkIcon} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.898 0.999547L0.99849 10.899M10.898 0.999547H2.4127M10.898 0.999547V9.48483"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <p className={cx(TW.contentText, 'mt-[0.5rem]')}>{BONUS_INFO.courseNote}</p>
      </div>
      <div className={TW.infoBlock}>
        <h4 className={TW.contentTitle}>{BONUS_INFO.verifyTitle}</h4>
        <p className={cx(TW.infoTextGap, TW.contentText)}>{BONUS_INFO.verifyMethod}</p>
        <p className={cx(TW.contentText, 'mt-[0.5rem]')}>{BONUS_INFO.verifyFile}</p>
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

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cx(TW.mobileCardBase, isActive ? TW.mobileCardActive : TW.mobileCardInactive)}>
                {/* 1. 활성화 상태 컨텐츠 (가로로 돌아왔을 때) */}
                <div
                  className={cx(
                    'w-full transition-all duration-500',
                    isActive ? 'opacity-100 delay-300' : 'hidden opacity-0'
                  )}>
                  <h3 className={TW.mobileCardActiveTitle}>{tab.label}</h3>
                  <div className="mt-[2.1875rem] w-[14.0125rem]">{renderContent(tab.id)}</div>
                </div>

                {/* 2. 비활성화 상태 타이틀 (세로로 서 있을 때) */}
                <span className={cx(TW.mobileCardInactiveTitle, isActive ? 'hidden opacity-0' : 'opacity-100')}>
                  {tab.label}
                </span>
              </button>
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
