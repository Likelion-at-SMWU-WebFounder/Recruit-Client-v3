import { combineStyles } from '@shared/utils/combineStyles';

interface BadgeProps {
  children: React.ReactNode;
}

// 스타일 상수화
const BADGE_STYLES = {
  base: 'bg-gray/20 text-gray rounded-2xl px-[0.875rem] py-[0.25rem] leading-[160%] font-medium group-hover:text-[#6978B2] group-hover:bg-blue/13',
  mobile: 'text-[0.875rem]',
  tablet: 'md:text-[1.125rem]',
  desktop: 'lg:text-[1.25rem]',
} as const;

const Badge = ({ children }: BadgeProps) => {
  const badgeClassName = combineStyles(BADGE_STYLES);

  return <span className={badgeClassName}>{children}</span>;
};

export default Badge;
