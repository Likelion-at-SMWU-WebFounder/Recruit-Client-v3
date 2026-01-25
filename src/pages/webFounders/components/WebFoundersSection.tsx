import WebFoundersCard from '@pages/webFounders/components/WebFoundersCard';
import type { FounderType } from '@/pages/webFounders/types/founder';
import { combineStyles } from '@shared/utils/combineStyles';

interface WebFoundersSectionProps {
  title: string;
  founders: FounderType[];
}

// 웹파운더즈 섹션 스타일 상수화
const WEBFOUNDERS_SECTION_STYLES = {
  container: {
    base: 'space-y-[0.94rem]',
    tablet: 'md:space-y-[2.5rem]',
  }, // 웹파운더즈 섹션 컨테이너 스타일
  titleText: {
    base: 'text-navyblack hd22',
    tablet: 'md:hd30',
    desktop: 'lg:hd42',
  }, // 웹파운더즈 섹션 타이틀 스타일
  grid: {
    base: 'grid grid-cols-2 gap-[1rem]',
    tablet: 'md:grid-cols-3 md:gap-[0.8rem]',
    desktop: 'lg:grid-cols-4 lg:gap-[1.5rem]',
  }, // 웹파운더즈 섹션 그리드 스타일
} as const;

const WebFoundersSection = ({ title, founders }: WebFoundersSectionProps) => {
  // 스타일 클래스명
  const containerClassName = combineStyles(WEBFOUNDERS_SECTION_STYLES.container);
  const titleTextClassName = combineStyles(WEBFOUNDERS_SECTION_STYLES.titleText);
  const gridClassName = combineStyles(WEBFOUNDERS_SECTION_STYLES.grid);

  return (
    <div className={containerClassName}>
      <div className={titleTextClassName}>{title}</div>

      <div className={gridClassName}>
        {founders.map((founder) => (
          <WebFoundersCard key={founder.id} founder={founder} />
        ))}
      </div>
    </div>
  );
};

export default WebFoundersSection;
