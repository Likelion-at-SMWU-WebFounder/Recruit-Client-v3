import { useState } from 'react';
import { SECTION_TITLES, SECTION_SUB_TITLES, FAQS, CONTACT_INFO } from '../../constants';
import SubTitle from '@/shared/components/SubTitle';

const TW = {
  /* layout */
  section:
    'flex w-full flex-col items-center gap-[3.88rem] md:gap-[3.99rem] lg:gap-[5rem] bg-[var(--color-white-main)] px-[1rem] py-[10rem] md:px-[4rem] md:py-[10.53225rem] lg:px-[10rem] lg:py-[8.75rem]',

  /* list */
  listWrap: 'flex w-full flex-col items-start gap-[1.125rem] self-stretch md:gap-[1.75rem] lg:gap-[2.4375rem]',

  /* card (Container) */
  cardBase: `
    flex w-full flex-col justify-center rounded-[0.75rem] md:rounded-[1.25rem] transition-colors duration-300 shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)]
    px-[1rem] py-[1rem] md:px-[2.125rem] md:py-[1.75rem] lg:px-[2.75rem] lg:py-[2.8125rem]
  `,
  cardOpen: 'bg-[rgba(66,132,255,0.04)]',
  cardClosed: 'bg-[var(--color-white-main)]',

  /* question (Trigger) */
  questionBtn: 'flex w-full items-center justify-between cursor-pointer group',
  questionContent: 'flex items-start gap-[0.375rem] md:gap-[0.75rem] lg:gap-[0.875rem]',
  questionPrefix:
    'shrink-0 font-semibold text-[var(--color-navyblack-main)] text-[1.0625rem] md:text-[1.625rem] lg:text-[2.5rem] leading-[120%] md:leading-[140%] lg:leading-[120%]',
  questionText:
    'text-left text-[1rem] leading-[120%] md:leading-[140%] font-semibold text-[var(--color-navyblack-main)] md:text-[1.5rem] lg:text-[2rem] break-keep whitespace-pre-line lg:whitespace-normal',

  /* arrow icon */
  arrow:
    'h-[1.25rem] w-[1.25rem] flex-shrink-0 text-[var(--color-navyblack-main)] transition-transform duration-500 md:h-[1.9375rem] md:w-[1.9375rem] lg:h-[3rem] lg:w-[3rem]',
  arrowOpen: 'rotate-180',

  /* answer */
  answerWrap: 'grid transition-all duration-300 ease-in-out',
  answerOpen: 'grid-rows-[1fr] opacity-100',
  answerClosed: 'grid-rows-[0fr] opacity-0',

  answerInner: 'overflow-hidden transition-all duration-300 ease-in-out',
  answerInnerOpen: 'pt-[0.625rem] md:pt-[1rem] lg:pt-[1.875rem]',
  answerInnerClosed: 'pt-0',

  answerText: `
    font-medium lg:whitespace-pre-line text-[rgba(27,38,52,0.7)] leading-[170%] break-keep
    text-[0.875rem] px-[1.4375rem] md:text-[1.125rem] md:px-[2.375rem] lg:text-[1.5rem] lg:px-[3.375rem]
  `,

  /* footer */
  footer:
    'mt-[1.875rem] text-center text-[0.875rem] font-medium text-[#899099] md:mt-[3.75rem] md:text-[1.125rem] lg:mt-[5rem] lg:text-[1.5rem] leading-[120%]',
  footerLink: 'font-semibold text-[var(--color-blue-main)] underline underline-offset-4',
} as const;

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={TW.section}>
      <div className="flex flex-col items-center">
        <SubTitle
          mode="light"
          align="center"
          subTitle={SECTION_SUB_TITLES.GENERATION}
          subDescription={SECTION_TITLES.FAQ}
        />
      </div>

      <div className={TW.listWrap}>
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div key={faq.id} className={cx(TW.cardBase, isOpen ? TW.cardOpen : TW.cardClosed)}>
              <button onClick={() => toggleFAQ(faq.id)} className={TW.questionBtn}>
                <div className={TW.questionContent}>
                  <span className={TW.questionPrefix}>Q.</span>
                  <span className={TW.questionText}>{faq.question.replace(/^Q\.\s*/, '')}</span>
                </div>
                <svg
                  className={cx(TW.arrow, isOpen && TW.arrowOpen)}
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 24L24.1862 32.149L34.8817 24"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className={cx(TW.answerWrap, isOpen ? TW.answerOpen : TW.answerClosed)}>
                <div className={cx(TW.answerInner, isOpen ? TW.answerInnerOpen : TW.answerInnerClosed)}>
                  <p className={TW.answerText}>{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={TW.footer}>
        {CONTACT_INFO.FOOTER_MESSAGE_PREFIX}
        <a href={CONTACT_INFO.KAKAOTALK_CHAT_LINK} target="_blank" rel="noopener noreferrer" className={TW.footerLink}>
          {CONTACT_INFO.KAKAOTALK_CHAT_NAME}
        </a>
        {CONTACT_INFO.FOOTER_MESSAGE_SUFFIX}
      </div>
    </section>
  );
};

export default FAQSection;
