import { ArrowUpRight } from 'lucide-react';

export interface DefaultButtonProps {
  /** 버튼 border 스타일 (solid: 보더 있음, none: 보더 없음) */
  border?: 'solid' | 'none';
  /** 버튼 텍스트 */
  children: React.ReactNode;
  /** 버튼 아이콘 여부 */
  isIcon?: boolean;
  /** 버튼 클릭 이벤트 */
  onClick?: () => void;
}

const DefaultButton = ({ border = 'solid', children, isIcon = true, onClick, ...props }: DefaultButtonProps) => {
  // 기본 스타일
  const baseClasses =
    'bg-white text-blue hover:bg-blue hover:text-white inline-flex justify-center items-center gap-2.5 overflow-hidden cursor-pointer';

  // 반응형 버튼 사이즈(모바일 기본, md: 태블릿, lg: 데스크톱)
  const sizeClasses = [
    'h-[3.0625rem] px-4 py-3 text-[1.125rem] font-bold rounded-xl', // mobile
    'md:h-[4rem] md:px-5 md:py-3.5 md:text-[1.5rem] md:font-bold md:rounded-2xl', // tablet
    'lg:h-[4.34125rem] lg:px-5 lg:py-3.5 lg:text-[1.75rem] lg:font-bold lg:rounded-2xl', // desktop
  ].join(' ');

  // 반응형 아이콘 사이즈(모바일 기본, md: 태블릿, lg: 데스크톱)
  const iconSizeClasses = 'size-6 md:size-8 md:p-1 lg:size-8 lg:p-1';

  // 보더 및 효과 스타일
  const borderAndEffectClasses = {
    solid:
      'outline outline-[1.50px] outline-offset-[-1.50px] outline-blue transition ease-out duration-300 shadow-[1px_1px_25.5px_4px_rgba(27,38,52,0.12)]',
    none: '',
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${sizeClasses} ${borderAndEffectClasses[border]}`}
      onClick={onClick}
      {...props}>
      {children}
      {isIcon && <ArrowUpRight className={iconSizeClasses} />}
    </button>
  );
};

export default DefaultButton;
