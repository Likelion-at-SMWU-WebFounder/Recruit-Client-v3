import { combineStyles } from '@shared/utils/combineStyles';

interface IdentityCardProps {
  identity: string;
  description1: string;
  description2: string;
  isOpen: boolean;
  onClick?: () => void;
  isAdditionalInfo?: boolean;
}

// IdentityCard 스타일 상수화
const IDENTITY_CARD_STYLES = {
  card: {
    base: 'flex cursor-pointer flex-col transition-colors duration-300',
    mobile: 'w-[21.125rem] rounded-[0.75rem] px-[2.25rem] py-[1.75rem]',
    tablet: 'md:w-[30rem] md:rounded-[1.25rem] md:px-[2rem] md:py-[2.5rem] md:whitespace-pre-line',
    desktop: 'lg:w-[40rem] lg:px-[3rem]',
  },
  open: {
    base: 'bg-blue text-white/90 gap-[1.69rem]',
    tablet: 'md:gap-[3.12rem]',
  }, // IdentityCard 열림 상태 스타일
  closed: {
    base: 'bg-white text-navyblack gap-0 shadow-default',
  }, // IdentityCard 닫힘 상태 스타일
  identity: {
    open: {
      base: 'hd20-semibold',
      tablet: 'md:hd28',
      desktop: 'lg:hd32',
    },
    closed: {
      base: 'hd20-semibold',
      tablet: 'md:hd28-semibold',
      desktop: 'lg:hd32-semibold',
    },
  },
  description: {
    base: 'text-[1rem] font-[500] leading-[1.8rem]',
    tablet: 'md:text-[1.125rem] md:leading-[2.025rem]',
    desktop: 'lg:text-[1.5rem] lg:leading-[2.7rem]',
  },
  descriptionContainer: {
    base: 'transition-[grid-template-rows,opacity] duration-300 ease-out',
    open: 'grid grid-rows-[1fr] opacity-100',
    closed: 'grid grid-rows-[0fr] opacity-0',
  }, // 설명 컨테이너 스타일 (열림, 닫힘 상태 스타일)
  descriptionContent: {
    base: 'flex flex-col gap-[1.81rem]',
    tablet: 'md:gap-[2rem]',
    desktop: 'lg:gap-[2.69rem]',
  },
} as const;

const IdentityCard = ({
  identity,
  description1,
  description2,
  isOpen,
  onClick,
  isAdditionalInfo,
}: IdentityCardProps) => {
  const cardClassName = `${combineStyles(IDENTITY_CARD_STYLES.card)} ${isOpen ? combineStyles(IDENTITY_CARD_STYLES.open) : combineStyles(IDENTITY_CARD_STYLES.closed)}`;
  const identityClassName = isOpen
    ? combineStyles(IDENTITY_CARD_STYLES.identity.open)
    : combineStyles(IDENTITY_CARD_STYLES.identity.closed);
  const descriptionClassName = combineStyles(IDENTITY_CARD_STYLES.description);
  const descriptionContainerClassName = isOpen
    ? `${IDENTITY_CARD_STYLES.descriptionContainer.base} ${IDENTITY_CARD_STYLES.descriptionContainer.open}`
    : `${IDENTITY_CARD_STYLES.descriptionContainer.base} ${IDENTITY_CARD_STYLES.descriptionContainer.closed}`;
  const descriptionContentClassName = `${descriptionClassName} ${combineStyles(IDENTITY_CARD_STYLES.descriptionContent)}`;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      className={cardClassName}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick?.();
        }
      }}>
      <div className={identityClassName}>{identity}</div>
      <div className={descriptionContainerClassName}>
        <div className="overflow-hidden">
          <div className={descriptionContentClassName}>
            <div>{description1}</div>
            <div className={isAdditionalInfo ? 'opacity-60' : ''}>{description2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityCard;
