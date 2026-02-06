import SectionHeader from './SectionHeader';
import { AGREEMENT_INFO, AGREEMENT_ERRORS } from '../constants/index';
import CheckMark from './icon/CheckMark';
import bulletIcon from '../assets/bullet-icon.svg';
import type { AgreementKey, AgreementsState } from '../types/index';
import { Fragment } from 'react';

interface AgreementSectionProps {
  agreements: AgreementsState;
  onAgreementChange: (field: AgreementKey, checked: boolean) => void;
  isSubmitted: boolean;
}

// 스타일 토큰 정의
const STYLES = {
  // 최상위 레이아웃
  section: 'flex w-full flex-col items-center gap-[1.5rem] md:gap-[2.0625rem] lg:gap-[2.1875rem]',

  // 중앙 컨테이너
  container: 'flex w-full flex-col items-center gap-[2.625rem] md:gap-[4.375rem] md:w-[54.75rem] lg:w-[97.5rem]',

  // 개별 카드: 부모 컨테이너 너비를 100% 사용
  card: 'flex max-h-[28.75rem] w-full flex-col items-center self-stretch overflow-hidden rounded-[1.25rem] bg-[#F0F5FA] p-[1.5625rem_1.25rem_1.5625rem_1.3125rem] shadow-[1px_1px_6.4px_0_rgba(27,38,52,0.10)] md:max-h-[29.25rem] md:p-[2.5rem_4.8125rem_2.5rem_3.75rem] lg:max-h-[35rem] lg:p-[3rem_3.71875rem]',

  // 타이틀 영역
  titleWrapper: 'flex w-full shrink-0 justify-center',
  titleText:
    'w-full text-left text-[1.125rem] font-semibold text-[var(--color-navyblack-main)] break-keep ' +
    'md:text-[1.625rem] lg:text-[2rem] leading-[120%]',

  // 본문 스크롤 영역
  contentWrapper: 'flex min-h-0 w-full flex-1 justify-center overflow-hidden',
  scrollArea:
    'custom-scrollbar w-full overflow-y-auto pr-2 text-left text-[0.875rem] font-medium text-[rgba(27,38,52,0.70)] md:text-[1rem] lg:text-[1.5rem] lg:leading-[160%] break-keep',

  // 사진 활용 동의 특수 리스트 스타일
  photoUsageBox: 'flex flex-col gap-y-[0.75rem] pl-[0.5rem] md:pl-[1rem] lg:pl-0',
  bulletItem: 'flex items-start gap-x-[0.5rem] lg:gap-x-[0.8125rem]',
  bulletIcon:
    'mt-[0.25rem] aspect-square h-[0.75rem] w-[0.75rem] shrink-0 object-contain lg:mt-[0.65rem] lg:h-[1.0625rem] lg:w-[1.0625rem]',

  // 하단 체크박스 영역
  footerWrapper: 'flex w-full shrink-0 justify-center',
  footerContent: 'flex w-full items-center justify-start pl-[0.5rem] md:pl-[1rem] lg:pl-0',
  label: 'inline-flex cursor-pointer items-start gap-[0.8125rem] md:items-center',

  // 체크박스 커스텀 사각형
  checkboxBox:
    'flex aspect-square h-[1.5625rem] w-[1.5625rem] shrink-0 items-center justify-center rounded-[0.5rem] border-2 transition-all md:h-[2.3125rem] md:w-[2.3125rem] md:rounded-[0.75rem] lg:h-[2.8125rem] lg:w-[2.8125rem] lg:rounded-[1rem]',

  // 라벨 및 에러 메시지 그룹
  labelGroup: 'flex flex-col items-start md:flex-row md:items-center',
  labelTextWrapper: 'flex items-center gap-[0.39rem] md:gap-[0.49rem] lg:gap-[0.69rem]',
  labelText: 'text-[1rem] font-medium text-[var(--color-navyblack-main)] md:text-[1.5rem] lg:text-[1.75rem]',
  requiredStar:
    'text-[1.125rem] leading-normal font-bold text-[var(--color-blue-main)] md:text-[1.3rem] lg:text-[1.5rem]',
  errorMessage:
    'mt-[0.4rem] text-[0.8125rem] font-medium text-[rgba(255,36,36,0.80)] md:mt-0 md:ml-[1.2rem] md:text-[1rem] lg:ml-[2.2rem] lg:text-[1.25rem]',

  // 간격 조절용 (Spacer)
  spacerHeader: 'h-[1rem] shrink-0 md:h-[1.2rem] lg:h-[1.38rem]',
  spacerFooter: 'h-[1.5rem] shrink-0 md:h-[1.8rem] lg:h-[2.31rem]',
} as const;

const AgreementSection = ({ agreements, onAgreementChange, isSubmitted }: AgreementSectionProps) => {
  const agreementKeys = Object.keys(AGREEMENT_INFO) as AgreementKey[];

  const scrollbarStyle = `
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(27, 38, 52, 0.2); border-radius: 10px; }
  `;

  const getCheckboxStyle = (key: AgreementKey, hasError: boolean) => {
    const base = STYLES.checkboxBox;
    if (agreements[key])
      return `${base} border-[var(--color-navyblack-main)] bg-[var(--color-white-main)] drop-shadow-[1px_1px_8.4px_rgba(27,38,52,0.10)]`;
    if (hasError)
      return `${base} border-[rgba(255,36,36,0.80)] bg-[var(--color-white-main)] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)]`;
    return `${base} border-[rgba(27,38,52,0.65)] bg-[var(--color-white-main)] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)]`;
  };

  return (
    <section className={STYLES.section}>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyle }} />
      <SectionHeader title="정보 수집" />
      <div className={STYLES.container}>
        {agreementKeys.map((key) => {
          const info = AGREEMENT_INFO[key];
          const isPhotoUsage = key === 'photoUsage';
          const hasError = isSubmitted && !agreements[key];
          const errorMessage = AGREEMENT_ERRORS[key];

          return (
            <div key={key} className={STYLES.card}>
              {/* 1. 타이틀 */}
              <div className={STYLES.titleWrapper}>
                <h4 className={STYLES.titleText}>
                  {info.title.split('\n').map((line, i, arr) => (
                    <Fragment key={i}>
                      {line}
                      {i < arr.length - 1 && (
                        <>
                          {i === 0 && <br className="lg:hidden" />}
                          {i === 1 && <br className="md:hidden" />}
                        </>
                      )}
                    </Fragment>
                  ))}
                </h4>
              </div>
              <div className={STYLES.spacerHeader} />

              {/* 2. 본문 */}
              <div className={STYLES.contentWrapper}>
                <div className={STYLES.scrollArea}>
                  {isPhotoUsage ? (
                    <div className={STYLES.photoUsageBox}>
                      {info.content.split('\n').map((line, i) => (
                        <div key={i} className={STYLES.bulletItem}>
                          <img src={bulletIcon} alt="bullet" className={STYLES.bulletIcon} />
                          <span className="flex-1">
                            {line.includes('[DBR]')
                              ? line.split('[DBR]').map((part, index, arr) => (
                                  <Fragment key={index}>
                                    {part.replace(/^[•※-]\s*/, '')}
                                    {index < arr.length - 1 && <br className="hidden lg:block" />}
                                  </Fragment>
                                ))
                              : line.replace(/^[•※-]\s*/, '')}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="pl-[0.5rem] whitespace-pre-line md:pl-[1rem] lg:pl-0">{info.content}</div>
                  )}
                </div>
              </div>
              <div className={STYLES.spacerFooter} />

              {/* 3. 동의 체크박스 */}
              <div className={STYLES.footerWrapper}>
                <div className={STYLES.footerContent}>
                  <label className={STYLES.label} onClick={() => onAgreementChange(key, !agreements[key])}>
                    <div className={getCheckboxStyle(key, hasError)}>{agreements[key] && <CheckMark />}</div>

                    <div className={STYLES.labelGroup}>
                      <div className={STYLES.labelTextWrapper}>
                        <span className={STYLES.labelText}>{info.checkbox}</span>
                        <span className={STYLES.requiredStar}>*</span>
                      </div>
                      {hasError && <span className={STYLES.errorMessage}>{errorMessage}</span>}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AgreementSection;
