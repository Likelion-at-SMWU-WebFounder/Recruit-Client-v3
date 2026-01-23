import starIcon from '../assets/star-icon.png';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-[0.75rem] md:gap-[1.5rem] lg:gap-[2.1875rem]">
      <h3 className="text-[1.25rem] leading-[140%] font-bold text-[var(--color-navyblack)] md:text-[1.625rem] lg:text-[2rem]">
        {title}
      </h3>

      <div className="flex w-full items-center gap-[0.5rem] md:gap-[0.75rem] lg:gap-[1rem]">
        <div
          className="h-[0.15rem] flex-1 rounded-[62.4375rem] md:h-[0.2rem] lg:h-[0.25rem] lg:w-[95.426rem] lg:flex-none"
          style={{
            background: 'linear-gradient(90deg, #949BA4 0%, rgba(148, 155, 164, 0.20) 100%)',
          }}
        />
        <img
          src={starIcon}
          alt="star icon"
          className="h-[1.25rem] w-[1.25rem] shrink-0 object-contain md:h-[1.625rem] md:w-[1.625rem] lg:h-[2.0625rem] lg:w-[2.02513rem]"
        />
      </div>
    </div>
  );
};

export default SectionHeader;
