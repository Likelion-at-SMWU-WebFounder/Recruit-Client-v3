interface BadgeProps {
  children: React.ReactNode;
}

// 스타일 상수화
const BADGE_STYLES = {
  base: 'bg-gray/20 text-gray rounded-2xl px-[0.875rem] py-[0.25rem] leading-[160%] font-medium',
  mobile: 'text-[0.875rem]',
  tablet: 'md:text-[1.125rem]',
  desktop: 'lg:text-[1.25rem]',
} as const;

const Badge = ({ children }: BadgeProps) => {
  const badgeClassName = [BADGE_STYLES.base, BADGE_STYLES.mobile, BADGE_STYLES.tablet, BADGE_STYLES.desktop].join(' ');

  return <span className={badgeClassName}>{children}</span>;
};

export default Badge;
