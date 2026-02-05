import React from 'react';

interface ModalButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

// 1. 스타일 토큰 정의
const STYLES = {
  button: (disabled: boolean) => `
    /* 레이아웃 및 정렬 */
    inline-flex items-center justify-center gap-[0.625rem]
    
    /* 형태 및 테두리 */
    md:rounded-[1rem] rounded-[0.625rem] md:border-[1.5px] border-[1px] border-solid border-[#4284FF]
    
    /* 기본 색상 및 폰트 */
    bg-[#F7FAFF] text-[#4284FF] font-bold leading-[120%]
    transition-all duration-200
    
    /* 호버 시 색상 반전 */
    hover:bg-[#4284FF] hover:text-[#F7FAFF]
    
    /* 비활성화 상태 제어 */
    ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
    px-[1rem] py-[0.5rem] text-[1rem]
    md:text-[1.25rem]
    md:px-[1.875rem] md:py-[0.9375rem] lg:text-[1.5rem]
  `,
} as const;

const ModalButton = ({ onClick, children, disabled }: ModalButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} className={STYLES.button(!!disabled)}>
      {children}
    </button>
  );
};

export default ModalButton;
