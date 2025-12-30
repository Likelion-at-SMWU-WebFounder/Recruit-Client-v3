import { useState } from 'react';
import { SECTION_TITLES, RECRUIT_INFO_TABS, QUALIFICATIONS, ACTIVITY_INFO, BONUS_INFO } from '../constants/index';

const RecruitInfoSection = () => {
  const [activeTab, setActiveTab] = useState<string>('qualification');

  const renderQualificationContent = () => (
    <ul className="flex flex-col items-start gap-3 text-left">
      {QUALIFICATIONS.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F7FAFF]" />
          <span className="text-[0.875rem] leading-normal font-medium whitespace-pre-line text-[#F7FAFF] md:text-[1.25rem] lg:text-[1.5rem]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );

  const renderActivityContent = () => (
    <div className="flex flex-col items-start gap-6 text-left">
      <div>
        <h4 className="text-[0.875rem] font-semibold text-[#F7FAFF] md:text-[1.25rem] lg:text-[1.5rem]">
          {ACTIVITY_INFO.sessionTitle}
        </h4>
        <p className="mt-2 text-[0.75rem] font-medium text-[#F7FAFF] md:text-[1rem] lg:text-[1.25rem]">
          {ACTIVITY_INFO.sessionPeriod}
        </p>
        <p className="text-[0.75rem] font-medium text-[#F7FAFF] md:text-[1rem] lg:text-[1.25rem]">
          {ACTIVITY_INFO.sessionTime}
        </p>
      </div>
      <div>
        <h4 className="text-[0.875rem] font-semibold text-[#F7FAFF] md:text-[1.25rem] lg:text-[1.5rem]">
          {ACTIVITY_INFO.feeTitle}
        </h4>
        <p className="mt-2 text-[0.75rem] font-medium text-[#F7FAFF] md:text-[1rem] lg:text-[1.25rem]">
          {ACTIVITY_INFO.feeAmount}
        </p>
        <p className="text-[0.75rem] font-medium text-[#F7FAFF] md:text-[1rem] lg:text-[1.25rem]">
          {ACTIVITY_INFO.feeNote}
        </p>
      </div>
    </div>
  );

  const renderBonusContent = () => (
    <div className="flex flex-col items-start gap-6 text-left">
      <div>
        <h4 className="text-[0.875rem] font-semibold text-[#F7FAFF] md:text-[1.25rem] lg:text-[1.5rem]">
          {BONUS_INFO.courseTitle}
        </h4>
        <a
          href="https://programmers.co.kr/learn/courses/2"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-[0.75rem] font-medium text-[#F7FAFF] underline md:text-[1rem] lg:text-[1.25rem]">
          {BONUS_INFO.courseLink}
          <svg className="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
        <p className="text-[0.75rem] font-medium text-[#F7FAFF] md:text-[1rem] lg:text-[1.25rem]">
          {BONUS_INFO.courseNote}
        </p>
      </div>
      <div>
        <h4 className="text-[0.875rem] font-semibold text-[#F7FAFF] md:text-[1.25rem] lg:text-[1.5rem]">
          {BONUS_INFO.verifyTitle}
        </h4>
        <p className="mt-2 text-[0.75rem] font-medium whitespace-pre-line text-[#F7FAFF] md:text-[1rem] lg:text-[1.25rem]">
          {BONUS_INFO.verifyMethod}
        </p>
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
    <section className="flex h-auto w-full items-center justify-center bg-[#F0F4FA] px-4 py-16 md:px-8 md:py-20 lg:h-[67.5rem] lg:px-[10.15625rem] lg:py-[13.3125rem]">
      <div className="flex w-full flex-col items-center">
        {/* 글씨 박스 */}
        <div className="mb-10 flex min-w-[17.1875rem] flex-col items-center gap-[1rem] lg:mb-16">
          <span className="text-center text-[0.875rem] leading-[140%] font-semibold text-[#1B2634] uppercase opacity-50 md:text-[1rem] lg:text-[1.25rem]">
            13기 아기사자
          </span>
          <h2 className="text-center text-[1.5rem] leading-[140%] font-semibold text-[#1B2634] md:text-[2rem] lg:text-[2.625rem]">
            {SECTION_TITLES.RECRUIT_INFO}
          </h2>
        </div>

        {/* 탭 컨테이너 - 가로 배치 */}
        <div className="flex w-full flex-row items-start justify-center gap-3 md:gap-4 lg:gap-6">
          {RECRUIT_INFO_TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center rounded-[1.25rem] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] ${
                  isActive
                    ? 'h-auto w-[6.5rem] bg-[#4284FF] p-4 md:h-auto md:w-[14rem] md:p-5 lg:h-[29.0625rem] lg:w-[32.3125rem] lg:p-[3.03125rem_2.3125rem]'
                    : 'h-[3rem] w-[6.5rem] bg-[#F7FAFF] md:h-[5rem] md:w-[14rem] lg:h-[8.8125rem] lg:w-[32.3125rem]'
                }`}>
                {isActive ? (
                  <div className="flex w-full flex-col items-center gap-4 lg:gap-6">
                    {/* 펼쳐진 상태 제목 */}
                    <h3 className="text-center text-[0.875rem] font-semibold text-[#F7FAFF] md:text-[1.5rem] lg:text-[2.25rem]">
                      {tab.label}
                    </h3>
                    {/* 펼쳐진 상태 내용 */}
                    <div className="w-full">{renderContent(tab.id)}</div>
                  </div>
                ) : (
                  /* 안 펴진 상태 제목 */
                  <span className="flex h-full w-full items-center justify-center text-center text-[0.75rem] font-semibold text-[#1B2634] md:text-[1.25rem] lg:text-[2.25rem]">
                    {tab.label}
                  </span>
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
