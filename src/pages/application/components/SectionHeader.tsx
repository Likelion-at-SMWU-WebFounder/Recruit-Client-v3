import starIcon from '../assets/star-icon.png';

interface SectionHeaderProps {
  title: string;
}

const TW = {
  /* layout */
  container:
    'flex w-full md:w-[52.5625rem] lg:w-[95.426rem] flex-col items-start gap-[0.75rem] md:gap-[0.9375em] lg:gap-[1.0625rem]',

  /* title text */
  title: 'text-[1.125rem] leading-[120%] font-bold text-[var(--color-navyblack)] md:text-[1.625rem] lg:text-[2rem]',

  /* line & icon area */
  row: 'flex w-full items-center gap-[0.69rem] md:gap-[0.94rem] lg:gap-[0.74rem]',

  // 그라데이션 라인: lg에서 고정 너비와 flex-none 적용
  line: `
    flex-1 h-[0.125rem] w-[19.8125rem] rounded-[62.4375rem] 
    bg-[linear-gradient(90deg,#949BA4_0%,rgba(148,155,164,0.20)_100%)]
    md:h-[0.1875rem] md:w-[52.5625rem]
    lg:h-[0.25rem] lg:w-[95.426rem] lg:flex-none
  `,

  /* icon style */
  icon: `
    shrink-0 object-contain 
    w-[1rem] h-[1rem] 
    md:w-[1.625rem] md:h-[1.625rem] 
    lg:w-[2.0625rem] lg:h-[2.0625rem]
  `,
} as const;

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className={TW.container}>
      {/* 섹션 제목 */}
      <h3 className={TW.title}>{title}</h3>

      {/* 하단 장식 라인 섹션 */}
      <div className={TW.row}>
        <div className={TW.line} />
        <img src={starIcon} alt="star icon" className={TW.icon} />
      </div>
    </div>
  );
};

export default SectionHeader;
