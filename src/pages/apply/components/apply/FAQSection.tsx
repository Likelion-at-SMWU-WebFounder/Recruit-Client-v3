import { useState } from 'react';
import { SECTION_TITLES, SECTION_SUB_TITLES, FAQS } from '../../constants';
import SubTitle from '@/shared/components/SubTitle';

const TW = {
  /* layout */
  section:
    'flex w-full flex-col items-center gap-[0.625rem] bg-[var(--color-white-main)] px-4 py-16 md:px-8 md:py-24 lg:px-[10rem] lg:py-[8.75rem]',

  /* heading */
  headingBox: 'flex min-w-[17.1875rem] flex-col items-center gap-[1rem]',

  /* list */
  listWrap:
    'mt-10 flex w-full flex-col items-start gap-6 self-stretch md:mt-16 md:gap-8 lg:mt-[5rem] lg:gap-[2.4375rem]',

  /* card */
  cardBase:
    'flex w-full flex-col justify-center rounded-[1.25rem] px-[1rem] py-[1rem] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] transition-colors duration-300 md:px-[1.75rem] md:py-[2.125rem] lg:w-[100rem] lg:px-[2.75rem] lg:py-[2.8125rem]',
  cardOpen: 'bg-[rgba(66,132,255,0.04)]',
  cardClosed: 'bg-[#F7FAFF]',

  /* question */
  questionBtn: 'flex w-full items-start justify-between cursor-pointer gap-2',
  questionContent: 'flex items-start gap-1.5 md:gap-2',
  questionPrefix: 'shrink-0 font-bold text-[#1B2634] text-[1rem] md:text-[1.5rem] lg:text-[2rem]',
  questionText:
    'text-left text-[1rem] leading-[1.4] font-semibold text-[#1B2634] md:text-[1.5rem] lg:text-[2rem] break-keep',

  arrow:
    'h-[1.25rem] w-[1.25rem] flex-shrink-0 text-[#1B2634] transition-transform duration-300 md:h-[1.9375rem] md:w-[1.9375rem] lg:h-[3rem] lg:w-[3rem]',
  arrowOpen: 'rotate-180',

  /* answer */
  answerWrap: 'overflow-hidden transition-all duration-300 ease-in-out',
  answerOpen: 'mt-4 opacity-100 lg:mt-6',
  answerClosed: 'max-h-0 opacity-0',
  answerText:
    'text-[0.875rem] leading-[170%] font-medium whitespace-pre-line text-[rgba(27,38,52,0.7)] md:text-[1.125rem] lg:text-[1.5rem] lg:px-[2.125rem] md:px-[1.675rem] px-[1.125rem] break-keep',

  /* footer */
  footer: 'mt-10 text-center text-[0.875rem] font-medium text-[#899099] md:text-[1.125rem] lg:mt-16 lg:text-[1.5rem]',
  footerLink: 'font-semibold text-[#4284FF] underline',
} as const;

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>('f1');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={TW.section}>
      {/* heading */}
      <div className={TW.headingBox}>
        <SubTitle
          mode="light"
          align="center"
          subTitle={SECTION_SUB_TITLES.GENERATION}
          subDescription={SECTION_TITLES.FAQ}
        />
      </div>

      {/* FAQ list */}
      <div className={TW.listWrap}>
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div key={faq.id} className={cx(TW.cardBase, isOpen ? TW.cardOpen : TW.cardClosed)}>
              {/* question */}
              <button onClick={() => toggleFAQ(faq.id)} className={TW.questionBtn}>
                <div className={TW.questionContent}>
                  <span className={TW.questionPrefix}>Q.</span>
                  <span className={TW.questionText}>{faq.question.replace(/^Q\.\s*/, '')}</span>
                </div>
                <svg
                  className={cx(TW.arrow, isOpen && TW.arrowOpen)}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* answer */}
              <div className={cx(TW.answerWrap, isOpen ? TW.answerOpen : TW.answerClosed)}>
                <p className={TW.answerText}>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* footer */}
      <div className={TW.footer}>
        기타 문의사항은{' '}
        <a href="https://open.kakao.com/o/sz4wNDdi" target="_blank" rel="noopener noreferrer" className={TW.footerLink}>
          오픈채팅
        </a>
        으로 연락해주세요!
      </div>
    </section>
  );
};

export default FAQSection;
