import { useState } from 'react';
import { SECTION_TITLES, FAQS } from '../../constants/index';

const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>('f1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="flex w-full flex-col items-center gap-[0.625rem] bg-[var(--color-white-main)] px-4 py-16 md:px-8 md:py-24 lg:px-[10rem] lg:py-[8.75rem]">
      {/* 글씨 박스 */}
      <div className="flex min-w-[17.1875rem] flex-col items-center gap-[1rem]">
        <span className="text-center text-[0.875rem] leading-[140%] font-semibold text-[#1B2634] uppercase opacity-50 md:text-[1rem] lg:text-[1.25rem]">
          자주 묻는 질문
        </span>
        <h2 className="text-center text-[1.5rem] leading-[140%] font-semibold text-[#1B2634] md:text-[2rem] lg:text-[2.625rem]">
          {SECTION_TITLES.FAQ}
        </h2>
      </div>

      {/* FAQ 리스트 */}
      <div className="mt-10 flex w-full flex-col items-start gap-6 self-stretch md:mt-16 md:gap-8 lg:mt-[5rem] lg:gap-[2.4375rem]">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className={`flex w-full flex-col items-start gap-[0.625rem] rounded-[1.25rem] px-4 py-5 shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] transition-colors duration-300 md:px-6 md:py-8 lg:w-[100rem] lg:px-[2.75rem] lg:py-[2.8125rem] ${
                isOpen ? 'bg-[rgba(66,132,255,0.04)]' : 'bg-[#F7FAFF]'
              }`}>
              {/* 질문 */}
              <button onClick={() => toggleFAQ(faq.id)} className="flex w-full items-start justify-between gap-4">
                <span className="text-left text-[1rem] leading-[140%] font-semibold text-[#1B2634] md:text-[1.5rem] lg:text-[2rem]">
                  {faq.question}
                </span>
                <svg
                  className={`h-5 w-5 flex-shrink-0 text-[#1B2634] transition-transform duration-300 md:h-6 md:w-6 lg:h-8 lg:w-8 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* 답변 */}
              <div
                className={`mt-[0.2em] overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'mt-4 max-h-[500px] opacity-100 lg:mt-6' : 'max-h-0 opacity-0'
                }`}>
                <p className="text-[0.875rem] leading-[170%] font-medium whitespace-pre-line text-[rgba(27,38,52,0.7)] md:text-[1.125rem] lg:text-[1.5rem]">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 기타 문의사항 */}
      <div className="mt-10 text-center text-[0.875rem] font-medium text-[#899099] md:text-[1.125rem] lg:mt-16 lg:text-[1.5rem]">
        기타 문의사항은{' '}
        <a
          href="https://open.kakao.com/o/sExample"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#4284FF] underline">
          오픈채팅
        </a>
        으로 연락해주세요!
      </div>
    </section>
  );
};

export default FAQSection;
