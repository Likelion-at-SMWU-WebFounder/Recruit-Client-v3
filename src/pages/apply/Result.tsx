import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/shared/components/Layout';
import ResultBackground from './components/background/ResultBackground';
import { DOCUMENT_RESULT_TEXT, FINAL_RESULT_TEXT } from './constants/result';

// --- 타입 정의 추가 ---
interface TextSegment {
  text: string;
  textMobile?: string;
  isHighlight: boolean;
}

interface LocationState {
  name: string;
  docs?: 'PASS' | 'REJECT';
  interviewTime?: string;
  interview?: 'PASS' | 'REJECT';
  track?: 'pm' | 'fe' | 'be';
}

const MENU_IMAGES_PATH = import.meta.env.VITE_IMAGE_PATH + '/menu';

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const TW = {
  container: 'flex h-full w-full flex-col items-center justify-center',
  logo: 'mb-[1.25rem] w-[7.8094rem] md:w-[14.5406rem] md:mb-[2.63rem] lg:mb-[2.81rem] lg:w-[15.8056rem]',
  contentBox: 'flex w-full flex-col items-center',
  textBase: `
    text-[var(--color-white-main)] font-medium text-center whitespace-pre-line break-keep
    text-[0.875rem] leading-[127%] 
    md:text-[1.3125rem] md:leading-[170%] 
    lg:text-[1.375rem]
  `,
  highlight: 'text-[#78A7FF] font-bold',
  signature: 'font-bold text-[#78A7FF]',
  link: 'underline underline-offset-4',
  sectionGap: 'mt-[2.2225rem] md:mt-[2.23125rem] lg:mt-[2.3375rem]',
  failGap: 'gap-[1.11125rem] md:gap-[2.23125rem] lg:gap-[2.3375rem]',
  flexColCenter: 'flex flex-col items-center',
} as const;

const Result = () => {
  const { pathname, state } = useLocation() as { pathname: string; state: LocationState };
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 393);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => setIsMobile(window.innerWidth <= 393);
    window.addEventListener('resize', handleResize);

    if (!state) {
      const isDocument = pathname.includes('document');
      navigate(isDocument ? '/apply/document' : '/apply/final');
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [state, navigate, pathname]);

  if (!state) return null;

  const isDocument = pathname.includes('document');
  const resultData = isDocument ? DOCUMENT_RESULT_TEXT : FINAL_RESULT_TEXT;
  const isPass = isDocument ? state?.docs === 'PASS' : state?.interview === 'PASS';
  const trackName = state?.track ? FINAL_RESULT_TEXT.TRACK_NAME[state.track] : '';

  const renderSegments = (segments: readonly TextSegment[]) =>
    segments.map((chunk, i) => (
      <span key={i} className={chunk.isHighlight ? TW.highlight : ''}>
        {isMobile && chunk.textMobile ? chunk.textMobile : chunk.text}
      </span>
    ));

  return (
    <Layout menuMode="dark" footerMode="light">
      <ResultBackground paddingClassName="py-[1.63rem] px-[1rem] md:py-[3.69rem] md:px-[1rem] lg:py-[3.75rem] lg:px-[1rem]">
        <div className={TW.container}>
          <img src={`${MENU_IMAGES_PATH}/smwu_lion_logo_light.svg`} alt="SMWU Logo" className={TW.logo} />

          <div className={cx(TW.textBase, TW.contentBox)}>
            <div className="flex flex-col">
              <p>{resultData.GREETING}</p>
              <p>
                {isPass
                  ? isMobile && 'mobileTitle' in resultData.PASS
                    ? (resultData.PASS as { mobileTitle: string }).mobileTitle
                    : resultData.PASS.TITLE
                  : isMobile && 'mobileTHANKS' in resultData.FAIL
                    ? (resultData.FAIL as { mobileTHANKS: string }).mobileTHANKS
                    : resultData.FAIL.THANKS}
              </p>
            </div>

            {isPass ? (
              <div className={TW.flexColCenter}>
                {isDocument ? (
                  <>
                    <p className={TW.sectionGap}>{renderSegments(DOCUMENT_RESULT_TEXT.PASS.DESCRIPTION(state.name))}</p>
                    <div className={cx('flex flex-col', TW.sectionGap)}>
                      <p>
                        {DOCUMENT_RESULT_TEXT.PASS.DETAILS.INTERVIEW_TIME}: {state.interviewTime}
                      </p>
                      <p>{DOCUMENT_RESULT_TEXT.PASS.DETAILS.INTERVIEW_PLACE}</p>
                      <p>{renderSegments(DOCUMENT_RESULT_TEXT.PASS.DETAILS.REPLY_INFO)}</p>
                    </div>
                    <div className={cx('flex flex-col', TW.sectionGap)}>
                      {DOCUMENT_RESULT_TEXT.PASS.NOTES.map((note, idx) => (
                        <p key={idx}>{renderSegments(note)}</p>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className={TW.sectionGap}>
                      {renderSegments(FINAL_RESULT_TEXT.PASS.DESCRIPTION(trackName, state.name))}
                    </p>
                    <p className={cx(TW.textBase, TW.sectionGap, TW.signature)}>{resultData.SIGNATURE}</p>
                    <div className={cx('flex flex-col', TW.sectionGap)}>
                      <p>{FINAL_RESULT_TEXT.PASS.FORM_SECTION}</p>
                      <a
                        href={FINAL_RESULT_TEXT.PASS.FORM_URL}
                        target="_blank"
                        rel="noreferrer"
                        className={cx(TW.textBase, TW.link)}>
                        {FINAL_RESULT_TEXT.PASS.FORM_LINK_TEXT}
                      </a>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className={cx(TW.flexColCenter, TW.sectionGap, TW.failGap)}>
                {isDocument
                  ? (isMobile && 'mobileMESSAGE' in DOCUMENT_RESULT_TEXT.FAIL
                      ? (DOCUMENT_RESULT_TEXT.FAIL as { mobileMESSAGE: readonly string[] }).mobileMESSAGE
                      : DOCUMENT_RESULT_TEXT.FAIL.MESSAGE
                    ).map((msg, idx) => <p key={idx}>{msg}</p>)
                  : FINAL_RESULT_TEXT.FAIL.MESSAGE(state.name).map((msgSegments, idx) => (
                      <p key={idx}>{renderSegments(msgSegments)}</p>
                    ))}
              </div>
            )}
            {(!isPass || isDocument) && (
              <p className={cx(TW.textBase, TW.sectionGap, TW.signature)}>{resultData.SIGNATURE}</p>
            )}
          </div>
        </div>
      </ResultBackground>
    </Layout>
  );
};

export default Result;
