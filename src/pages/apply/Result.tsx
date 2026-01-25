import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '@/shared/components/Layout';
import ResultBackground from './components/background/ResultBackground';
import { DOCUMENT_RESULT_TEXT } from './constants/result';

interface LocationState {
  name: string;
  docs: 'PASS' | 'REJECT';
  interviewTime: string;
}

const MENU_IMAGES_PATH = import.meta.env.VITE_IMAGE_PATH + '/menu';

const TEXT_STYLE =
  'text-[var(--color-white)] font-medium md:leading-[170%] leading-[127%] text-center lg:text-[1.375rem] md:text-[1.3125rem] text-[0.875rem] whitespace-pre-line break-keep';
const HIGHLIGHT_STYLE = 'text-[#78A7FF] font-bold';
const SECTION_GAP = 'mt-[2rem] md:mt-[3.5rem]';

const DocumentResult = () => {
  const { state } = useLocation() as { state: LocationState };
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) navigate('/apply/document');
  }, [state, navigate]);

  if (!state) return null;

  const { name, docs, interviewTime } = state;
  const isPass = docs === 'PASS';
  const { PASS, FAIL, GREETING, SIGNATURE } = DOCUMENT_RESULT_TEXT;

  const renderText = (text: string) => {
    let parts: (string | React.ReactNode)[] = [text];
    PASS.HIGHLIGHTS.forEach((hl) => {
      parts = parts.flatMap((part) => {
        if (typeof part !== 'string') return part;
        return part.split(hl).flatMap((sub, i, arr) =>
          i < arr.length - 1
            ? [
                sub,
                <span key={hl + i} className={HIGHLIGHT_STYLE}>
                  {hl}
                </span>,
              ]
            : [sub]
        );
      });
    });
    return parts;
  };

  return (
    <Layout menuMode="dark" footerMode="light">
      <ResultBackground>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <img
            src={`${MENU_IMAGES_PATH}/smwu_lion_logo_light.svg`}
            alt="SMWU Logo"
            className="mb-[2.5rem] w-[12rem] lg:mb-[3.5rem] lg:w-[15rem]"
          />

          <div className={`${TEXT_STYLE} flex w-full flex-col items-center`}>
            <div className="flex flex-col">
              <p>{GREETING}</p>
              <p>{isPass ? PASS.TITLE : FAIL.THANKS}</p>
            </div>

            {isPass ? (
              <>
                <p className={SECTION_GAP}>{PASS.DESCRIPTION(name)}</p>

                <div className={`flex flex-col ${SECTION_GAP}`}>
                  <p>
                    {PASS.DETAILS.INTERVIEW_TIME}: {interviewTime}
                  </p>
                  <p>{PASS.DETAILS.INTERVIEW_PLACE}</p>
                  <p>{renderText(PASS.DETAILS.REPLY_INFO)}</p>
                </div>

                <div className={`flex flex-col ${SECTION_GAP}`}>
                  {PASS.NOTES.map((note, idx) => (
                    <p key={idx}>{renderText(note)}</p>
                  ))}
                </div>
              </>
            ) : (
              <div className={`flex flex-col items-center ${SECTION_GAP} gap-[2rem] lg:gap-[3.5rem]`}>
                {FAIL.MESSAGE.map((msg, idx) => (
                  <p key={idx} className="opacity-90">
                    {msg}
                  </p>
                ))}
              </div>
            )}

            <p className={`${TEXT_STYLE} ${SECTION_GAP}`}>{SIGNATURE}</p>
          </div>
        </div>
      </ResultBackground>
    </Layout>
  );
};

export default DocumentResult;
