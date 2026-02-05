import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '@/shared/components/Layout';
import ResultBackground from './components/background/ResultBackground';
import { RESULT_CHECK_CONTENT } from './constants/resultCheck';
import ResultCheckButton from './components/button/ResultCheckButton';
import { postDocsResult, postInterviewResult } from './apis/result';
import EyeToggleIcon from '../application/components/icon/EyeToggleIcon';

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
  eyeButton:
    'absolute right-[1rem] md:right-[1.5rem] flex items-center justify-center cursor-pointer select-none text-[var(--color-white-main)]',
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
                const hasValue = formData[item.id as keyof typeof formData].length > 0;

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
                          isPasswordField && hasValue && 'pr-[3rem] md:pr-[4rem]'
                        )}
                        onChange={(e) => handleInputChange(item.id as keyof typeof formData, e.target.value)}
                      />
                      {isPasswordField && hasValue && (
                        <button
                          type="button"
                          className={TW.eyeButton}
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}>
                          <EyeToggleIcon isVisible={showPassword} />
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
