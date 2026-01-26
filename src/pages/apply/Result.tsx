import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '@/shared/components/Layout';
import ResultBackground from './components/background/ResultBackground';
import { DOCUMENT_RESULT_TEXT, FINAL_RESULT_TEXT } from './constants/result';

interface LocationState {
  name: string;
  docs?: 'PASS' | 'REJECT';
  interviewTime?: string;
  interview?: 'PASS' | 'REJECT';
  track?: 'pm' | 'fe' | 'be';
}

const MENU_IMAGES_PATH = import.meta.env.VITE_IMAGE_PATH + '/menu';

const TEXT_STYLE =
  'text-[var(--color-white-main)] font-medium md:leading-[170%] leading-[127%] text-center lg:text-[1.375rem] md:text-[1.3125rem] text-[0.875rem] whitespace-pre-line break-keep';
const HIGHLIGHT_STYLE = 'text-[#78A7FF] font-bold';
const SECTION_GAP = 'mt-[2rem] md:mt-[3.5rem]';

const ApplyResult = () => {
  const { pathname, state } = useLocation() as { pathname: string; state: LocationState };
  const navigate = useNavigate();

  const isDocument = pathname.includes('document');
  const resultData = isDocument ? DOCUMENT_RESULT_TEXT : FINAL_RESULT_TEXT;
  const isPass = isDocument ? state?.docs === 'PASS' : state?.interview === 'PASS';
  const trackName = state.track ? FINAL_RESULT_TEXT.TRACK_NAME[state.track] : '';

  useEffect(() => {
    if (!state) navigate(isDocument ? '/apply/document' : '/apply/final');
  }, [state, navigate, isDocument]);

  if (!state) return null;

  const renderSegments = (segments: readonly { text: string; isHighlight: boolean }[]) =>
    segments.map((chunk, i) => (
      <span key={i} className={chunk.isHighlight ? HIGHLIGHT_STYLE : ''}>
        {chunk.text}
      </span>
    ));

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
              <p>{resultData.GREETING}</p>
              <p>{isPass ? resultData.PASS.TITLE : resultData.FAIL.THANKS}</p>
            </div>

            {isPass ? (
              <div className="flex flex-col items-center">
                {isDocument ? (
                  <>
                    <p className={SECTION_GAP}>{renderSegments(DOCUMENT_RESULT_TEXT.PASS.DESCRIPTION(state.name))}</p>
                    <div className={`flex flex-col ${SECTION_GAP}`}>
                      <p>
                        {DOCUMENT_RESULT_TEXT.PASS.DETAILS.INTERVIEW_TIME}: {state.interviewTime}
                      </p>
                      <p>{DOCUMENT_RESULT_TEXT.PASS.DETAILS.INTERVIEW_PLACE}</p>
                      <p>{renderSegments(DOCUMENT_RESULT_TEXT.PASS.DETAILS.REPLY_INFO)}</p>
                    </div>
                    <div className={`flex flex-col ${SECTION_GAP}`}>
                      {DOCUMENT_RESULT_TEXT.PASS.NOTES.map((note, idx) => (
                        <p key={idx}>{renderSegments(note)}</p>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className={SECTION_GAP}>
                      {renderSegments(FINAL_RESULT_TEXT.PASS.DESCRIPTION(trackName, state.name))}
                    </p>
                    <div className={`flex flex-col ${SECTION_GAP}`}>
                      <p>{FINAL_RESULT_TEXT.PASS.FORM_SECTION}</p>
                      <a
                        href={FINAL_RESULT_TEXT.PASS.FORM_URL}
                        target="_blank"
                        rel="noreferrer"
                        className={`${TEXT_STYLE} underline underline-offset-4`}>
                        {FINAL_RESULT_TEXT.PASS.FORM_LINK_TEXT}
                      </a>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className={`flex flex-col items-center ${SECTION_GAP} gap-[2rem] lg:gap-[3.5rem]`}>
                {isDocument
                  ? DOCUMENT_RESULT_TEXT.FAIL.MESSAGE.map((msg, idx) => (
                      <p key={idx} className="opacity-90">
                        {msg}
                      </p>
                    ))
                  : FINAL_RESULT_TEXT.FAIL.MESSAGE(state.name).map((msgSegments, idx) => (
                      <p key={idx} className="opacity-90">
                        {renderSegments(msgSegments)}
                      </p>
                    ))}
              </div>
            )}

            <p className={`${TEXT_STYLE} ${SECTION_GAP} font-bold text-[#78A7FF]`}>{resultData.SIGNATURE}</p>
          </div>
        </div>
      </ResultBackground>
    </Layout>
  );
};

export default ApplyResult;
