import { useNavigate } from 'react-router-dom';
import { SUBMIT_MODAL, SUCCESS_MODAL, DUPLICATE_MODAL } from '../constants/index';
import CloseIcon from '../assets/close-icon.svg';
import ModalButton from './button/ModalButton';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  partName: string;
  submitStatus: 'idle' | 'loading' | 'success' | 'error' | 'duplicate';
}

// 1. 스타일 토큰 정의
const STYLES = {
  // 배경 및 모달 본체
  overlay: 'fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4',
  modalContainer:
    'relative flex w-full lg:max-w-[43.4375rem] md:max-w-[39.3125rem] max-w-[21.4375rem] flex-col rounded-[1.25rem] bg-[var(--color-white-main)] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] p-[1.9375rem_1.625rem] md:px-[3.3125rem] md:py-[4.25rem] lg:p-[5rem_3.25rem]',

  // 닫기 버튼
  closeButton: 'absolute top-6 right-6 cursor-pointer',
  closeIcon: 'h-[0.8125rem] w-[0.8125rem] md:h-[1.28913rem] md:w-[1.28913rem]',

  // 레이아웃 구성
  contentLayout: 'flex flex-col items-center gap-[1.5rem] md:gap-[2.125rem] lg:gap-[2.375rem]',
  infoWrapper: 'flex w-full flex-col gap-[0.375rem] md:gap-[0.625rem]',

  // 텍스트 스타일
  title:
    'text-[1.375rem] font-bold md:font-semibold break-keep text-[var(--color-navyblack)] md:text-[2rem] lg:text-[2.25rem] leading-[120%]',
  description: `
    text-[0.875rem] leading-[160%] font-medium break-keep text-[#899099] 
    md:text-[1.25rem] lg:text-[1.375rem]
    whitespace-pre-line md:whitespace-normal 
    md:tracking-[-0.02em] lg:tracking-normal
  `,

  // 강조 및 링크 스타일
  blueText: 'text-[#4284FF] font-bold lg:font-semibold',
  link: 'cursor-pointer underline underline-offset-4',
  partLabel:
    'text-[0.875rem] font-semibold text-[#4284FF] md:text-[1.125rem] uppercase lg:text-[1.25rem] leading-[120%]',

  // 경고 문구 박스 (제출 전)
  warningBox: 'flex flex-col gap-[1.125rem] md:gap-[1.875rem] lg:gap-[2rem]',

  // 하단 버튼 영역
  buttonWrapper: (isLoading: boolean) => `${isLoading ? 'opacity-50' : ''} transition-opacity`,
} as const;

const SubmitModal = ({ isOpen, onClose, onConfirm, partName, submitStatus }: SubmitModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const isSuccess = submitStatus === 'success';
  const isDuplicate = submitStatus === 'duplicate';
  const isLoading = submitStatus === 'loading';
  const isFinalState = isSuccess || isDuplicate;

  return (
    <div className={STYLES.overlay}>
      <div className={STYLES.modalContainer}>
        {/* 최종 상태(성공/중복)가 아닐 때만 닫기 버튼 노출 */}
        {!isFinalState && (
          <button onClick={onClose} className={STYLES.closeButton}>
            <img src={CloseIcon} alt="close" className={STYLES.closeIcon} />
          </button>
        )}

        <div className={STYLES.contentLayout}>
          <div className={STYLES.infoWrapper}>
            {/* 제목 영역 */}
            <h2 className={STYLES.title}>
              {isSuccess ? SUCCESS_MODAL.TITLE : isDuplicate ? DUPLICATE_MODAL.TITLE : SUBMIT_MODAL.TITLE}
            </h2>

            {/* 본문 영역: 상태에 따른 분기 처리 */}
            {isSuccess ? (
              <div className={`${STYLES.description} mt-[0.75rem] md:mt-[1.25rem] lg:mt-[1.375rem]`}>
                <span>{SUCCESS_MODAL.DESC_1}</span>
                <span className="md:hidden"> </span>
                <br className="hidden md:block" />
                <span>
                  {SUCCESS_MODAL.DESC_2_PREFIX}
                  <br className="md:hidden" />
                  <span className={STYLES.blueText}>{SUCCESS_MODAL.DESC_2_BLUE}</span>
                  {SUCCESS_MODAL.DESC_2_SUFFIX}
                </span>
                <span className="md:hidden"> </span>
                <br className="hidden md:block" />
                <span className="lg:whitespace-nowrap">
                  {SUCCESS_MODAL.DESC_3_PREFIX}
                  <span className={STYLES.blueText}>
                    <a
                      href="https://open.kakao.com/o/sz4wNDdi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={STYLES.link}>
                      {SUCCESS_MODAL.DESC_3_BLUE_LINK}
                    </a>
                    {SUCCESS_MODAL.DESC_3_BLUE_PLAIN}
                  </span>
                  {SUCCESS_MODAL.DESC_3_SUFFIX}
                </span>
              </div>
            ) : isDuplicate ? (
              <div className={`${STYLES.description} mt-[0.75rem] md:mt-[1.25rem] lg:mt-[1.375rem]`}>
                <p>{DUPLICATE_MODAL.DESC_1}</p>
                <p>
                  {DUPLICATE_MODAL.DESC_2_PREFIX}
                  <span className={STYLES.blueText}>
                    <a
                      href="https://open.kakao.com/o/sz4wNDdi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={STYLES.link}>
                      {DUPLICATE_MODAL.DESC_2_BLUE_LINK}
                    </a>
                  </span>
                  {DUPLICATE_MODAL.DESC_2_SUFFIX}
                </p>
              </div>
            ) : (
              /* 제출 확인 (기본 상태) */
              <div className={STYLES.warningBox}>
                <p className={STYLES.partLabel}>
                  {SUBMIT_MODAL.PART_LABEL} {partName}
                </p>
                <div className={STYLES.description}>
                  {SUBMIT_MODAL.WARNING_TEXT_1}
                  <br className="hidden md:block" />
                  <span className="md:hidden"> </span>
                  {SUBMIT_MODAL.WARNING_TEXT_2}
                </div>
              </div>
            )}
          </div>
          {/* 하단 버튼 영역 */}
          <div className={STYLES.buttonWrapper(isLoading)}>
            <ModalButton
              disabled={isLoading}
              onClick={() => {
                if (isLoading) return;
                if (isFinalState) {
                  navigate('/');
                } else {
                  onConfirm();
                }
              }}>
              {isLoading ? '제출하기' : isFinalState ? SUCCESS_MODAL.BUTTON : SUBMIT_MODAL.BUTTON_TEXT}
            </ModalButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
