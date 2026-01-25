import { useNavigate } from 'react-router-dom';
import { SUBMIT_MODAL, SUCCESS_MODAL, DUPLICATE_MODAL } from '../constants/index';
import CloseIcon from '../assets/close-icon.svg';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  partName: string;
  submitStatus: 'idle' | 'loading' | 'success' | 'error' | 'duplicate';
}

const SubmitModal = ({ isOpen, onClose, onConfirm, partName, submitStatus }: SubmitModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const isSuccess = submitStatus === 'success';
  const isDuplicate = submitStatus === 'duplicate';
  const isLoading = submitStatus === 'loading';

  const isFinalState = isSuccess || isDuplicate;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div className="relative flex w-full max-w-[43.4375rem] flex-col rounded-[1.25rem] bg-[#F7FAFF] p-8 shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] md:p-12 lg:p-[5rem_3.25rem]">
        {!isFinalState && (
          <button onClick={onClose} className="absolute top-6 right-6 cursor-pointer">
            <img src={CloseIcon} alt="close" className="h-[1rem] w-[1rem]" />
          </button>
        )}

        <div className="flex flex-col items-center gap-8 lg:gap-[2.375rem]">
          <div className="flex w-full flex-col gap-6 lg:gap-[2rem]">
            {/* 제목 영역 */}
            <h2 className="text-[1.75rem] font-semibold break-keep text-[var(--color-navyblack)] md:text-[2rem] lg:text-[2.25rem]">
              {isSuccess ? SUCCESS_MODAL.TITLE : isDuplicate ? DUPLICATE_MODAL.TITLE : SUBMIT_MODAL.TITLE}
            </h2>
            {/* 본문 영역 */}
            {isSuccess ? (
              <div className="text-[1rem] leading-[160%] font-medium break-keep text-[#949BA4] md:text-[1.125rem] lg:text-[1.375rem]">
                <p>{SUCCESS_MODAL.DESC_1}</p>
                <p>
                  {SUCCESS_MODAL.DESC_2_PREFIX}
                  {/* 확인 메일 */}
                  <span className="text-[#4284FF]">{SUCCESS_MODAL.DESC_2_BLUE}</span>
                  {SUCCESS_MODAL.DESC_2_SUFFIX}
                </p>
                <p className="lg:whitespace-nowrap">
                  {SUCCESS_MODAL.DESC_3_PREFIX}
                  {/* '오픈채팅을 통해 문의' */}
                  <span className="text-[#4284FF]">
                    <a
                      href="https://open.kakao.com/..." // 실제 링크 삽입
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer underline underline-offset-4">
                      {SUCCESS_MODAL.DESC_3_BLUE_LINK}
                    </a>
                    {SUCCESS_MODAL.DESC_3_BLUE_PLAIN}
                  </span>
                  {SUCCESS_MODAL.DESC_3_SUFFIX}
                </p>
              </div>
            ) : isDuplicate ? (
              /* 이미 지원 접수*/
              <div className="text-[1rem] leading-[160%] font-medium break-keep text-[#949BA4] md:text-[1.125rem] lg:text-[1.375rem]">
                <p>{DUPLICATE_MODAL.DESC_1}</p>
                <p>
                  {DUPLICATE_MODAL.DESC_2_PREFIX}
                  <span className="text-[#4284FF]">
                    <a
                      href="https://open.kakao.com/..."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer underline underline-offset-4">
                      {DUPLICATE_MODAL.DESC_2_BLUE_LINK}
                    </a>
                  </span>
                  {DUPLICATE_MODAL.DESC_2_SUFFIX}
                </p>
              </div>
            ) : (
              // 파트 및 경고 문구
              <div className="flex flex-col gap-6 lg:gap-[2rem]">
                <p className="text-[1.125rem] font-semibold text-[#4284FF] uppercase lg:text-[1.25rem]">
                  {SUBMIT_MODAL.PART_LABEL} {partName}
                </p>
                <div className="text-[1rem] leading-relaxed font-medium break-keep text-[#949BA4] md:text-[1.125rem] lg:text-[1.375rem]">
                  <p>{SUBMIT_MODAL.WARNING_TEXT_1}</p>
                  <p>{SUBMIT_MODAL.WARNING_TEXT_2}</p>
                </div>
              </div>
            )}
          </div>

          {/* 버튼 영역 */}
          <button
            onClick={isFinalState ? () => navigate('/home') : onConfirm}
            disabled={isLoading}
            className={`group flex items-center justify-center gap-[0.625rem] rounded-[1rem] border-[1.5px] border-[#4284FF] bg-[#F7FAFF] px-[1rem] py-[0.5rem] md:px-[1.875rem] md:py-[0.9375rem] ${isLoading ? 'opacity-50' : 'cursor-pointer hover:bg-[#4284FF]'}`}>
            <span
              className={`text-[1rem] font-bold md:text-[1.375rem] lg:text-[1.5rem] ${isLoading ? 'text-[#4284FF]' : 'text-[#4284FF] group-hover:text-white'}`}>
              {/* 완료 상태면 '홈으로', 그 외엔 '제출하기' */}
              {isLoading ? '제출하기' : isFinalState ? SUCCESS_MODAL.BUTTON : SUBMIT_MODAL.BUTTON_TEXT}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
