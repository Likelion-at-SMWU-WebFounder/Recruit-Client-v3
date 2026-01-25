import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from '@/shared/components/Layout';
import ResultBackground from './components/background/ResultBackground';
import { RESULT_CHECK_CONTENT } from './constants/resultCheck';

const INPUT_STYLE = `
  flex w-full items-center rounded-[1rem] border-[1.5px] bg-[#F7FAFF]/01 
  px-[1rem] py-[0.7rem] md:px-[1.375rem] md:py-[1rem] 
  text-[#F7FAFF] outline-none transition-all
  text-[0.9375rem] md:text-[1.375rem] lg:text-[1.5rem]
  placeholder:text-[#F7FAFF]/55 shadow-[1px_1px_8.4px_2px_rgba(247,250,255,0.05)]
`;

const BUTTON_STYLE = `
  flex items-center justify-center rounded-[1rem] bg-[#F7FAFF] 
  text-[#4284FF] font-bold transition-all cursor-pointer
  px-[1.5rem] py-[0.7rem] md:px-[2rem] md:py-[0.9375rem]
  text-[1rem] md:text-[1.375rem] lg:text-[1.5rem]
  hover:bg-[#4284FF] hover:text-[#F7FAFF]
`;

const ERROR_TEXT_STYLE = `
  text-[#FF5757] text-center
  text-[0.875rem] font-normal 
  md:text-[1.125rem] md:font-medium 
  lg:text-[1.25rem] lg:font-medium
`;

const ResultCheck = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', id: '', password: '' });
  const [errorType, setErrorType] = useState<'REQUIRED' | 'NOT_FOUND' | null>(null);

  const isDocument = pathname === RESULT_CHECK_CONTENT.DOCUMENT.PATH;
  const currentTitle = isDocument ? RESULT_CHECK_CONTENT.DOCUMENT.TITLE : RESULT_CHECK_CONTENT.FINAL.TITLE;

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorType) setErrorType(null);
  };

  /** 결과 확인 및 페이지 이동 로직 */
  const handleCheck = async () => {
    if (!formData.name || !formData.id || !formData.password) {
      setErrorType('REQUIRED');
      return;
    }

    try {
      console.log('데이터 제출:', formData);

      if (isDocument) {
        // 1. 서류 심사 결과 데이터 예시
        const docResult = {
          name: formData.name,
          docs: 'PASS',
          interviewTime: '02.27(목) 10:00~10:40',
        };
        navigate(`${RESULT_CHECK_CONTENT.DOCUMENT.PATH}/result`, { state: docResult });
      } else {
        // 2. 최종 심사 결과 데이터 예시
        const finalResult = {
          name: formData.name,
          interview: 'REJECT',
          track: 'FRONTEND',
        };
        navigate(`${RESULT_CHECK_CONTENT.FINAL.PATH}/result`, { state: finalResult });
      }
    } catch (error) {
      setErrorType('NOT_FOUND');
      console.error(error);
    }
  };

  return (
    <Layout menuMode="dark" footerMode="light">
      <ResultBackground>
        <div className="flex h-full w-full max-w-[51.3125rem] flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center gap-[1.875rem] md:gap-[3.75rem] lg:gap-[4.0625rem]">
            {/* 타이틀 및 에러 메시지 섹션 */}
            <div className="flex w-full flex-col items-center gap-[0.31rem] md:gap-[0.31rem] lg:gap-[0.44rem]">
              <h2 className="text-center text-[1.375rem] font-bold text-[#F7FAFF] md:text-[2rem] lg:text-[2.25rem]">
                {currentTitle}
              </h2>

              <div className="flex min-h-[1.25rem] items-center justify-center md:min-h-[1.75rem] lg:min-h-[2rem]">
                {errorType && (
                  <p className={ERROR_TEXT_STYLE}>
                    {errorType === 'REQUIRED'
                      ? RESULT_CHECK_CONTENT.ERROR_MESSAGES.REQUIRED
                      : RESULT_CHECK_CONTENT.ERROR_MESSAGES.NOT_FOUND}
                  </p>
                )}
              </div>
            </div>

            {/* 입력 리스트 섹션 */}
            <div className="flex w-full flex-col gap-[1.875rem] md:gap-[3.375rem] lg:gap-[2.2rem]">
              {[
                {
                  id: 'name',
                  label: RESULT_CHECK_CONTENT.LABELS.NAME,
                  ph: RESULT_CHECK_CONTENT.PLACEHOLDERS.NAME,
                  type: 'text',
                },
                {
                  id: 'id',
                  label: RESULT_CHECK_CONTENT.LABELS.ID,
                  ph: RESULT_CHECK_CONTENT.PLACEHOLDERS.ID,
                  type: 'text',
                },
                {
                  id: 'password',
                  label: RESULT_CHECK_CONTENT.LABELS.PASSWORD,
                  ph: RESULT_CHECK_CONTENT.PLACEHOLDERS.PASSWORD,
                  type: 'password',
                },
              ].map((item) => {
                const isFieldEmpty = errorType === 'REQUIRED' && !formData[item.id as keyof typeof formData];
                const isNotFound = errorType === 'NOT_FOUND';
                const hasError = isFieldEmpty || isNotFound;

                return (
                  <div key={item.id} className="flex flex-col gap-[0.4rem] md:gap-[0.7rem] lg:gap-[1rem]">
                    <label className="text-[1.125rem] font-semibold text-[#F7FAFF] md:text-[1.75rem] lg:text-[2rem]">
                      {item.label}
                    </label>
                    <input
                      type={item.type}
                      value={formData[item.id as keyof typeof formData]}
                      placeholder={item.ph}
                      className={`${INPUT_STYLE} ${hasError ? 'border-[#FF5757]' : 'border-[#F7FAFF]/75'}`}
                      onChange={(e) => handleInputChange(item.id as keyof typeof formData, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>

            <button type="button" className={BUTTON_STYLE} onClick={handleCheck}>
              {RESULT_CHECK_CONTENT.BUTTON}
            </button>
          </div>
        </div>
      </ResultBackground>
    </Layout>
  );
};

export default ResultCheck;
