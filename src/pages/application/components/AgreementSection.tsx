import SectionHeader from './SectionHeader';
import { AGREEMENT_INFO, AGREEMENT_ERRORS } from '../constants/index';
import CheckMark from './CheckMark';
import bulletIcon from '../assets/bullet-icon.svg';
import type { AgreementKey, AgreementsState } from '../types/index';

interface AgreementSectionProps {
  agreements: AgreementsState;
  onAgreementChange: (field: AgreementKey, checked: boolean) => void;
  isSubmitted: boolean;
}

const AgreementSection = ({ agreements, onAgreementChange, isSubmitted }: AgreementSectionProps) => {
  const agreementKeys = Object.keys(AGREEMENT_INFO) as AgreementKey[];

  const scrollbarStyle = `
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(27, 38, 52, 0.2); border-radius: 10px; }
  `;

  return (
    <section className="mx-auto flex w-full flex-col items-center gap-[2.1875rem] self-stretch px-4 md:px-0 lg:w-[98.18744rem]">
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyle }} />
      <SectionHeader title="정보 수집" />

      {agreementKeys.map((key) => {
        const info = AGREEMENT_INFO[key];
        const isPhotoUsage = key === 'photoUsage';
        const hasError = isSubmitted && !agreements[key];
        const errorMessage = AGREEMENT_ERRORS[key];

        return (
          <div
            key={key}
            className="flex max-h-[25.375rem] w-full flex-col items-center self-stretch overflow-hidden rounded-[1.25rem] bg-[#F0F5FA] p-[1.5625rem_1.25rem_1.5625rem_1.3125rem] shadow-[1px_1px_6.4px_0_rgba(27,38,52,0.10)] md:max-h-[29.25rem] md:p-[2.5rem_4.8125rem_2.5rem_3.75rem] lg:max-h-[35rem] lg:w-[98.18744rem] lg:p-[3rem_3.71875rem]">
            {/* 1. 타이틀 영역 */}
            <div className="flex w-full shrink-0 justify-center">
              <h4 className="w-full text-left text-[1.25rem] font-semibold text-[var(--color-navyblack)] md:text-[1.5rem] lg:w-[90.0625rem] lg:text-[2rem]">
                {info.title}
              </h4>
            </div>
            <div className="h-[1rem] shrink-0 md:h-[1.2rem] lg:h-[1.38rem]" />

            {/* 2. 본문 영역 */}
            <div className="flex min-h-0 w-full flex-1 justify-center overflow-hidden">
              <div className="custom-scrollbar w-full overflow-y-auto pr-2 text-left text-[0.875rem] font-medium text-[rgba(27,38,52,0.70)] md:text-[1rem] lg:w-[87.125rem] lg:text-[1.5rem] lg:leading-[160%]">
                {isPhotoUsage ? (
                  <div className="flex flex-col gap-y-[0.75rem] pl-[0.5rem] md:pl-[1rem] lg:pl-0">
                    {info.content.split('\n').map((line, i) => (
                      <div key={i} className="flex items-start gap-x-[0.5rem] lg:gap-x-[0.8125rem]">
                        <img
                          src={bulletIcon}
                          alt="bullet"
                          className="mt-[0.25rem] aspect-square h-[0.75rem] w-[0.75rem] shrink-0 object-contain lg:mt-[0.65rem] lg:h-[1.0625rem] lg:w-[1.0625rem]"
                        />
                        <span className="flex-1">{line.replace(/^[•※-]\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pl-[0.5rem] whitespace-pre-line md:pl-[1rem] lg:pl-0">{info.content}</div>
                )}
              </div>
            </div>
            <div className="h-[1.5rem] shrink-0 md:h-[1.8rem] lg:h-[2.31rem]" />

            {/* 3. 체크란 영역 */}
            <div className="flex w-full shrink-0 justify-center">
              <div className="flex w-full items-center justify-start pl-[0.5rem] md:pl-[1rem] lg:w-[87.125rem] lg:pl-0">
                <label
                  className="inline-flex cursor-pointer items-start gap-[0.8125rem] md:items-center"
                  onClick={() => onAgreementChange(key, !agreements[key])}>
                  <div
                    className={`flex aspect-square h-[1.75rem] w-[1.75rem] shrink-0 items-center justify-center rounded-[0.5rem] border-2 transition-all md:h-[2.2rem] md:w-[2.2rem] md:rounded-[0.75rem] lg:h-[2.8125rem] lg:w-[2.8125rem] lg:rounded-[1rem] ${
                      agreements[key]
                        ? 'border-[var(--color-navyblack)] bg-[var(--color-white)] drop-shadow-[1px_1px_8.4px_rgba(27,38,52,0.10)]'
                        : hasError
                          ? 'border-[var(--Color-error-red,rgba(255,36,36,0.80))] bg-[var(--color-white)] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)]'
                          : 'border-[var(--color-gray)] bg-[var(--color-white)] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)]'
                    }`}>
                    {agreements[key] && <CheckMark />}
                  </div>

                  {/* 텍스트/에러 메시지 */}
                  <div className="flex flex-col items-start md:flex-row md:items-center">
                    <div className="flex items-center gap-[0.39rem] md:gap-[0.49rem] lg:gap-[0.69rem]">
                      <span className="text-[1rem] font-medium text-[var(--color-navyblack)] md:text-[1.25rem] lg:text-[1.75rem]">
                        {info.checkbox}
                      </span>
                      <span className="text-[1.125rem] leading-normal font-bold text-[var(--Color-blue-main,#4284FF)] md:text-[1.3rem] lg:text-[1.5rem]">
                        *
                      </span>
                    </div>
                    {hasError && (
                      <span className="mt-[0.4rem] text-[0.8125rem] font-medium text-[var(--Color-error-red,rgba(255,36,36,0.80))] md:mt-0 md:ml-[1.2rem] md:text-[1rem] lg:ml-[2.2rem] lg:text-[1.25rem]">
                        {errorMessage}
                      </span>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default AgreementSection;
