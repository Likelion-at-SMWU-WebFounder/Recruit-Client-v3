import starIcon from '../assets/star-icon.png';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-[0.75rem] md:gap-[2.1875rem]">
      <h3 className="text-[1.5rem] font-bold text-[var(--color-navyblack)] md:text-[2rem]">{title}</h3>
      <div className="flex w-full items-center gap-[0.5rem] md:gap-[1rem]">
        <div
          className="h-[0.2rem] flex-1 rounded-[62.4375rem] md:h-[0.25rem] lg:w-[95.426rem] lg:flex-none"
          style={{
            background: 'linear-gradient(90deg, #949BA4 0%, rgba(148, 155, 164, 0.20) 100%)',
          }}
        />
        <img
          src={starIcon}
          alt="star icon"
          className="h-[1.5rem] w-[1.5rem] shrink-0 object-contain md:h-[2.0625rem] md:w-[2.02513rem]"
        />
      </div>
    </div>
  );
};

export default SectionHeader;
