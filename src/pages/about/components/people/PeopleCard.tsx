import { renderEmphasizedText } from '@/shared/utils/renderEmphasizedText';

interface PeopleCardProps {
  icon: string;
  keyword: string;
  description: string;
  isOpen?: boolean;
  onClick?: () => void;
}

const PeopleCard = ({ icon, keyword, description, isOpen, onClick }: PeopleCardProps) => {
  // 첫 번째 줄바꿈만 유지하고 나머지는 공백으로 변환 (태블릿, 모바일 화면에서 필요)
  const processedDescription = description.replace(/\n/g, (_, offset) => {
    return offset === description.indexOf('\n') ? '\n' : ' ';
  });

  return (
    <>
      {/* 데스크톱 */}
      <div className="hidden h-[35.5rem] w-[40rem] flex-col items-start gap-[3rem] rounded-[1.25rem] px-[4.75rem] py-[5.88rem] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] lg:flex">
        <img src={icon} alt={keyword} className="w-[5rem]" />
        <div className="text-navyblack text-[2rem] font-[600] lg:text-[2rem]">{keyword}</div>
        <div className="text-navyblack/70 text-[1.5rem] leading-[200%] font-[600] whitespace-pre-line">
          {renderEmphasizedText(description)}
        </div>
      </div>

      {/* 태블릿, 모바일 */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        className={`flex w-[22.5625rem] cursor-pointer flex-col items-start rounded-[0.5rem] py-[1.5rem] pr-[2.3125rem] pl-[1rem] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] md:flex md:w-[56rem] md:rounded-[1.25rem] md:px-[4.75rem] md:py-[2rem] md:pr-[5.875rem] md:pl-[2.44rem] lg:hidden ${
          isOpen ? 'gap-[1.25rem]' : 'opacity-60'
        }`}
        onClick={onClick}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick?.();
          }
        }}>
        <div className="flex items-center gap-[0.75rem] md:gap-[1.25rem]">
          <img src={icon} alt={keyword} className="w-[1.5rem] md:w-[3.25rem]" />
          <div className="text-navyblack text-[1.25rem] leading-[140%] font-[600] md:text-[1.75rem]">{keyword}</div>
        </div>
        <div
          className={`${
            isOpen ? 'grid grid-rows-[1fr] opacity-100' : 'grid grid-rows-[0fr] opacity-0'
          } w-full transition-[grid-template-rows,opacity] duration-300 ease-in-out`}>
          <div className="overflow-hidden">
            <div className="text-navyblack/70 text-[1rem] leading-[180%] font-[500] md:text-[1.25rem] md:font-[600] md:whitespace-pre-line">
              {renderEmphasizedText(processedDescription)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeopleCard;
