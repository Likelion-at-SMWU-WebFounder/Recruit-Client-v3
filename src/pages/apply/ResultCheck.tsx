import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '@/shared/components/Layout';
import ResultBackground from './components/background/ResultBackground';
import { RESULT_CHECK_CONTENT } from './constants/resultCheck';
import ResultCheckButton from './components/button/ResultCheckButton';
import { postDocsResult, postInterviewResult } from './apis/result';

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const TW = {
  /* layout */
  container: 'flex h-full w-full flex-col items-center justify-center',
  contentWrap: 'flex w-full flex-col items-center gap-[1.875rem] md:gap-[3.75rem] lg:gap-[3.87rem]',

  /* heading & error section */
  headerBox: 'flex w-full flex-col items-center gap-[0.31rem] lg:gap-[0.44rem]',
  title:
    'text-center text-[1.375rem] font-bold text-[var(--color-white-main)] md:text-[2rem] lg:text-[2.25rem] leading-[120%]',
  errorContainer: 'flex items-center justify-center',
  errorText: `text-[#FF5757] text-center text-[0.875rem] font-medium md:text-[1.125rem] lg:text-[1.25rem] leading-[120%]`,

  /* form section */
  formWrap: 'flex w-full flex-col gap-[1.875rem] md:gap-[3.375rem] lg:gap-[3.3125rem]',
  inputBox: 'flex flex-col gap-[0.75rem] md:gap-[1.25rem] lg:gap-[1.375rem]',
  label: 'text-[1.125rem] font-semibold text-[var(--color-white-main)] md:text-[2rem] lg:text-[2rem] leading-[120%]',

  inputContainer: 'relative flex w-full items-center',

  /* input base & status */
  inputBase: `
    flex w-full items-center md:rounded-[1rem] rounded-[0.625rem] lg:border-[1.5px] md:border-[1.3px] border-[1px] bg-[var(--color-white-main)]/01 
    px-[0.90625rem] py-[0.8125rem] md:px-[1.5rem] md:py-[1.25rem] lg:px-[1.375rem] lg:py-[1.15625rem]
    text-[var(--color-white-main)] outline-none transition-all
    text-[0.9375rem] md:text-[1.375rem] lg:text-[1.5rem] font-medium leading-[120%]
    placeholder:text-[var(--color-white-main)]/55
  `,
  inputDefault: 'border-[var(--color-white-main)]/75',
  inputError: 'border-[#FF5757]',

  /* eye icon style */
  eyeButton: 'absolute right-[1rem] md:right-[1.5rem] flex items-center justify-center cursor-pointer select-none',
  eyeIcon: 'w-[1.25rem] h-[1.25rem] md:w-[1.625rem] md:h-[1.625rem] aspect-square',
} as const;

type ErrorType = 'REQUIRED' | 'NOT_FOUND' | null;

const ResultCheck = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', id: '', password: '' });
  const [errorType, setErrorType] = useState<ErrorType>(null);
  const [showPassword, setShowPassword] = useState(false);

  const isDocument = pathname === RESULT_CHECK_CONTENT.DOCUMENT.PATH;
  const currentTitle = isDocument ? RESULT_CHECK_CONTENT.DOCUMENT.TITLE : RESULT_CHECK_CONTENT.FINAL.TITLE;

  // 페이지 진입 시 스크롤 최상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorType) setErrorType(null);
  };

  /* 결과 확인 및 페이지 이동 로직 */
  const handleCheck = async () => {
    if (!formData.name || !formData.id || !formData.password) {
      setErrorType('REQUIRED');
      return;
    }

    const body = {
      name: formData.name,
      studentId: formData.id,
      password: formData.password,
    };

    const res = isDocument ? await postDocsResult(body) : await postInterviewResult(body);

    if (res.ok) {
      const nextPath = isDocument ? RESULT_CHECK_CONTENT.DOCUMENT.PATH : RESULT_CHECK_CONTENT.FINAL.PATH;
      navigate(`${nextPath}/result`, { state: res.data.result });
      return;
    }
    setErrorType('NOT_FOUND');
  };

  const errorMessage =
    errorType === 'REQUIRED'
      ? RESULT_CHECK_CONTENT.ERROR_MESSAGES.REQUIRED
      : errorType === 'NOT_FOUND'
        ? RESULT_CHECK_CONTENT.ERROR_MESSAGES.NOT_FOUND
        : '';

  return (
    <Layout menuMode="dark" footerMode="light">
      <ResultBackground>
        <div className={TW.container}>
          <div className={TW.contentWrap}>
            {/* 타이틀 및 에러 메시지 섹션 */}
            <div className={TW.headerBox}>
              <h2 className={TW.title}>{currentTitle}</h2>
              <div className={TW.errorContainer}>{errorType && <p className={TW.errorText}>{errorMessage}</p>}</div>
            </div>

            {/* 입력 리스트 섹션 */}
            <div className={TW.formWrap}>
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
                const isPasswordField = item.id === 'password';

                return (
                  <div key={item.id} className={TW.inputBox}>
                    <label className={TW.label}>{item.label}</label>
                    <div className={TW.inputContainer}>
                      <input
                        type={isPasswordField ? (showPassword ? 'text' : 'password') : item.type}
                        value={formData[item.id as keyof typeof formData]}
                        placeholder={item.ph}
                        className={cx(
                          TW.inputBase,
                          hasError ? TW.inputError : TW.inputDefault,
                          isPasswordField && 'pr-[3rem] md:pr-[4rem]'
                        )}
                        onChange={(e) => handleInputChange(item.id as keyof typeof formData, e.target.value)}
                      />

                      {isPasswordField && (
                        <button
                          type="button"
                          className={TW.eyeButton}
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}>
                          {showPassword ? (
                            <svg
                              className={TW.eyeIcon}
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.9987 9.75C12.1367 9.75 11.3101 10.0924 10.7006 10.7019C10.0911 11.3114 9.7487 12.138 9.7487 13C9.7487 13.862 10.0911 14.6886 10.7006 15.2981C11.3101 15.9076 12.1367 16.25 12.9987 16.25C13.8607 16.25 14.6873 15.9076 15.2968 15.2981C15.9063 14.6886 16.2487 13.862 16.2487 13C16.2487 12.138 15.9063 11.3114 15.2968 10.7019C14.6873 10.0924 13.8607 9.75 12.9987 9.75ZM12.9987 18.4167C11.5621 18.4167 10.1844 17.846 9.16854 16.8302C8.15272 15.8143 7.58203 14.4366 7.58203 13C7.58203 11.5634 8.15272 10.1857 9.16854 9.16984C10.1844 8.15402 11.5621 7.58333 12.9987 7.58333C14.4353 7.58333 15.813 8.15402 16.8289 9.16984C17.8447 10.1857 18.4154 11.5634 18.4154 13C18.4154 14.4366 17.8447 15.8143 16.8289 16.8302C15.813 17.846 14.4353 18.4167 12.9987 18.4167ZM12.9987 4.875C7.58203 4.875 2.9562 8.24417 1.08203 13C2.9562 17.7558 7.58203 21.125 12.9987 21.125C18.4154 21.125 23.0412 17.7558 24.9154 13C23.0412 8.24417 18.4154 4.875 12.9987 4.875Z"
                                fill="#F7FAFF"
                              />
                            </svg>
                          ) : (
                            <svg
                              className={TW.eyeIcon}
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.8145 9.75L16.2487 13.1733V13C16.2487 12.138 15.9063 11.3114 15.2968 10.7019C14.6873 10.0924 13.8607 9.75 12.9987 9.75H12.8145ZM8.1562 10.6167L9.83537 12.2958C9.7812 12.5233 9.7487 12.7508 9.7487 13C9.7487 13.862 10.0911 14.6886 10.7006 15.2981C11.3101 15.9076 12.1367 16.25 12.9987 16.25C13.237 16.25 13.4754 16.2175 13.7029 16.1633L15.382 17.8425C14.6562 18.2 13.8545 18.4167 12.9987 18.4167C11.5621 18.4167 10.1844 17.846 9.16854 16.8302C8.15272 15.8143 7.58203 14.4366 7.58203 13C7.58203 12.1442 7.7987 11.3425 8.1562 10.6167ZM2.16536 4.62583L4.63537 7.09583L5.12287 7.58333C3.33537 8.99167 1.92703 10.8333 1.08203 13C2.9562 17.7558 7.58203 21.125 12.9987 21.125C14.6779 21.125 16.2812 20.8 17.7437 20.215L18.2095 20.67L21.3729 23.8333L22.7487 22.4575L3.5412 3.25M12.9987 7.58333C14.4353 7.58333 15.813 8.15402 16.8289 9.16984C17.8447 10.1857 18.4154 11.5634 18.4154 13C18.4154 13.6933 18.2745 14.365 18.0254 14.9717L21.1995 18.1458C22.8245 16.7917 24.1245 15.015 24.9154 13C23.0412 8.24417 18.4154 4.875 12.9987 4.875C11.482 4.875 10.0304 5.14583 8.66537 5.63333L11.0162 7.9625C11.6337 7.72417 12.2945 7.58333 12.9987 7.58333Z"
                                fill="#F7FAFF"
                              />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <ResultCheckButton onClick={handleCheck}>{RESULT_CHECK_CONTENT.BUTTON}</ResultCheckButton>
          </div>
        </div>
      </ResultBackground>
    </Layout>
  );
};

export default ResultCheck;
