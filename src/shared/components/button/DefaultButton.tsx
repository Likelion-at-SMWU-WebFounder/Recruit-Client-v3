import { ArrowUpRight } from 'lucide-react';
import { combineStyles } from '@shared/utils/combineStyles';

export interface DefaultButtonProps {
  /** 버튼 border 스타일 (solid: 보더 있음, none: 보더 없음) */
  border?: 'solid' | 'none';
  /** 버튼 텍스트 */
  children: React.ReactNode;
  /** 버튼 아이콘 여부 */
  isIcon?: boolean;
  /** 버튼 클릭 이벤트 */
  onClick?: () => void;
  /** 버튼 배경 타입 (white: 하얀 버튼, blue: 파란 버튼) */
  backgroundType?: 'white' | 'blue';
  id?: string;
}

const DefaultButton = ({
  border = 'solid',
  children,
  isIcon = true,
  onClick,
  backgroundType = 'white',
  ...props
}: DefaultButtonProps) => {
  // 배경 타입에 따른 기본 스타일
  const backgroundClasses =
    backgroundType === 'white' ? 'bg-white text-blue hover:bg-blue hover:text-white' : 'bg-blue text-white';

  // 기본 스타일
  const baseClasses = `${backgroundClasses} inline-flex justify-center items-center gap-[0.625rem] overflow-hidden cursor-pointer`;

  // 반응형 버튼 사이즈(모바일 기본, md: 태블릿, lg: 데스크톱)
  const sizeClasses = {
    base: 'hd18 px-[1rem] py-[0.75rem] rounded-[0.75rem]', // mobile
    tablet: 'md:hd24 md:px-[1.375rem] md:py-[0.9375rem] md:rounded-[1rem]', // tablet
    desktop: 'lg:hd28', // desktop
  } as const;

  // 반응형 아이콘 사이즈(모바일 기본, md: 태블릿, lg: 데스크톱)
  const iconSizeClasses = 'size-6 md:size-8 md:p-1 lg:size-8 lg:p-1';

  // 보더 및 효과 스타일
  const borderAndEffectClasses = {
    solid: 'border border-blue border-[1.5px] transition ease-out duration-300',
    none: 'border-none',
  } as const;

  const sizeClassName = combineStyles(sizeClasses);
  const borderClassName = borderAndEffectClasses[border];

  return (
    <button type="button" className={`${baseClasses} ${sizeClassName} ${borderClassName}`} onClick={onClick} {...props}>
      {children}
      {isIcon && <ArrowUpRight className={iconSizeClasses} />}
    </button>
  );
};

export default DefaultButton;
