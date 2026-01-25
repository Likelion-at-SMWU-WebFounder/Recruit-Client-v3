import { useState } from 'react';
import ReusableBackground from './components/background/ReusableBackground';
import Layout from '@/shared/components/Layout';
import { NOTIFY_CONTENT } from './constants/notify';

const CARD_STYLE = `
  relative flex flex-col items-center justify-center overflow-hidden rounded-[1.25rem] 
  border border-[#F7FAFF]/10 bg-[#F7FAFF]/12 shadow-[1px_1px_25.5px_4px_rgba(27,38,52,0.12)] backdrop-blur-md
  w-[19.9375rem] h-[23.4375rem] py-[3rem]
  md:w-[47.875rem] md:h-[37.5rem] md:py-[5rem]
  lg:w-[65.375rem] lg:h-[35.4375rem] lg:py-[6.97rem]
`;

const INPUT_BOX_STYLE = `
  flex items-center gap-[0.625rem] rounded-[1rem] border-[1.5px] bg-[#F7FAFF]/01 
  px-[0.8rem] py-[0.6rem] shadow-[1px_1px_8.4px_2px_rgba(247,250,255,0.05)] transition-colors
  w-[16rem] md:w-[35rem] lg:w-[51.3125rem] lg:px-[1.375rem] lg:py-[1.0625rem]
`;

const NotifySection = () => {
  const [email, setEmail] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const errorMessage = !isTouched
    ? ''
    : email.length === 0
      ? NOTIFY_CONTENT.EMPTY_MSG
      : !validateEmail(email)
        ? NOTIFY_CONTENT.ERROR_MSG
        : '';
  const hasError = errorMessage !== '';

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsTouched(true);
  };

  return (
    <Layout menuMode="dark" footerMode="light">
      <ReusableBackground className="h-[53.25rem] md:h-[85.375rem] lg:h-[67.5rem]" isAnimated={false}>
        <div className="flex justify-center px-4">
          <div className={CARD_STYLE}>
            <div className="flex flex-col items-center gap-[2.5rem] md:gap-[3rem] lg:gap-[3.75rem]">
              <div className="flex flex-col items-center gap-[0.75rem] md:gap-[1.25rem] lg:gap-[1.81rem]">
                <h2 className="text-center text-[1.25rem] font-bold text-[#F7FAFF] md:text-[1.875rem] lg:text-[2.25rem]">
                  {NOTIFY_CONTENT.TITLE}
                </h2>
                <p className="px-4 text-center text-[0.75rem] font-normal text-[#F7FAFF] md:px-0 md:text-[1.125rem] lg:text-[1.375rem]">
                  {NOTIFY_CONTENT.DESC}
                </p>
              </div>

              {/* 입력창 및 에러 섹션 */}
              <div className="flex flex-col items-center">
                <div className="mb-[0.5rem] flex h-[1.5rem] items-center justify-center md:mb-[1rem] md:h-[2rem] lg:h-[2.5rem]">
                  {hasError && (
                    <span className="text-center text-[0.875rem] font-medium text-[#FF5757] md:text-[1rem] lg:text-[1.25rem]">
                      {errorMessage}
                    </span>
                  )}
                </div>

                <div className={`${INPUT_BOX_STYLE} ${hasError ? 'border-[#FF5757]' : 'border-[#F7FAFF]/75'}`}>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder={NOTIFY_CONTENT.PLACEHOLDER}
                    className="w-full bg-transparent text-[0.875rem] font-medium text-[#F7FAFF] outline-none placeholder:text-[#F7FAFF]/55 md:text-[1.4rem] lg:text-[1.75rem]"
                  />
                </div>
              </div>

              {/* 신청 버튼 */}
              <button
                onClick={() => setIsTouched(true)}
                className="flex cursor-pointer items-center justify-center gap-[0.625rem] rounded-[1rem] bg-[#F7FAFF] px-[1rem] py-[0.6rem] transition-colors hover:bg-[#F7FAFF]/90 md:px-[1.2rem] md:py-[0.8rem] lg:px-[1.375rem] lg:py-[0.9375rem]">
                <span className="text-[1rem] font-bold text-[#4284FF] md:text-[1.25rem] lg:text-[1.5rem]">
                  {NOTIFY_CONTENT.BTN}
                </span>
              </button>
            </div>
          </div>
        </div>
      </ReusableBackground>
    </Layout>
  );
};

export default NotifySection;
