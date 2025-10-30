interface IdentityCardProps {
  identity: string;
  description1: string;
  description2: string;
  isOpen: boolean;
  onClick?: () => void;
  isAdditionalInfo?: boolean;
}

const OPEN_CARD_CLASSES = 'bg-blue text-white/90 md:whitespace-pre-line';
const CLOSED_CARD_CLASSES = 'bg-white text-navyblack md:whitespace-pre-line shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)]';
const CARD_CLASSES =
  'w-[21.125rem] md:w-[30rem] lg:w-[40rem] rounded-[0.75rem] px-[2.25rem] py-[1.75rem] md:rounded-[1.25rem] md:px-[2rem] md:py-[2.5rem] lg:px-[3rem]';
const IDENTITY_TEXT_CLASSES = 'text-[1.25rem] font-[700] md:text-[1.5rem] lg:text-[2rem]';
const DESCRIPTION_TEXT_CLASSES =
  'text-[1rem] font-[500] md:text-[1.125rem] lg:text-[1.5rem] leading-[1.8rem] md:leading-[2.025rem] lg:leading-[2.7rem]';

const IdentityCard = ({
  identity,
  description1,
  description2,
  isOpen,
  onClick,
  isAdditionalInfo,
}: IdentityCardProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      className={`${CARD_CLASSES} ${isOpen ? OPEN_CARD_CLASSES : CLOSED_CARD_CLASSES} flex cursor-pointer flex-col ${
        isOpen ? 'gap-[1.69rem] md:gap-[3.12rem]' : 'gap-0'
      } transition-colors duration-300`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick?.();
        }
      }}>
      <div className={IDENTITY_TEXT_CLASSES}>{identity}</div>
      <div
        className={`${
          isOpen ? 'grid grid-rows-[1fr] opacity-100' : 'grid grid-rows-[0fr] opacity-0'
        } transition-[grid-template-rows,opacity] duration-300 ease-in-out`}>
        <div className="overflow-hidden">
          <div className={`${DESCRIPTION_TEXT_CLASSES} flex flex-col gap-[1.81rem] md:gap-[2rem] lg:gap-[2.69rem]`}>
            <div>{description1}</div>
            <div className={isAdditionalInfo ? 'opacity-60' : ''}>{description2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityCard;
