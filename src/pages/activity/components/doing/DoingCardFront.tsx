import Tag from '@/shared/components/Tag';
import { combineStyles } from '@shared/utils/combineStyles';

interface DoingCardFrontProps {
  icon_dark?: string;
  term: number[];
  title: string;
  shortDescription: string;
  onFlip: () => void;
}

// DoingCardFront 스타일 상수화
const DOING_CARD_FRONT_STYLES = {
  cardContainer: {
    base: 'absolute inset-0 flex flex-col shrink-0 rounded-[1.25rem] bg-white [transform:rotateY(0deg)] [-webkit-backface-visibility:hidden] [backface-visibility:hidden]',
    desktop: 'lg:w-[23.875rem] lg:h-[36.375rem] lg:p-[2.7rem] lg:pb-[2.5rem] lg:shadow-default',
    tablet: 'md:w-[13.5rem] md:h-[20rem] md:p-[1.4rem] shadow-sub',
  },
  icon: {
    base: 'z-10 aspect-square',
    desktop: 'lg:w-[2.875rem] lg:h-[2.875rem]',
    mobile: 'w-[1.5rem] h-[1.5rem]',
  },
  bottom: {
    base: 'flex flex-col mt-auto',
    desktop: 'lg:gap-[0.63rem]',
    tablet: 'md:gap-[0.33rem]',
  },
  textContainer: {
    base: 'flex flex-col',
    desktop: 'lg:gap-[0.63rem]',
  },
  termTagContainer: {
    base: 'flex',
    desktop: 'lg:gap-[0.62rem]',
    mobile: 'gap-[0.3rem]',
  },
  title: {
    base: 'font-[800] leading-[140%] text-navyblack',
    desktop: 'lg:text-[2.625rem] lg:mb-[0.2rem]',
    tablet: 'md:text-[1.5rem]',
    mobile: 'text-[1.125rem]',
  },
  description: {
    base: 'font-[600] whitespace-pre-line leading-[130%] text-navyblack',
    desktop: 'lg:text-[1.5rem]',
    mobile: 'text-[0.875rem]',
  },
} as const;

const DoingCardFront = ({ icon_dark, term, title, shortDescription, onFlip }: DoingCardFrontProps) => {
  const isTermEmpty = term.length === 0;

  const cardContainerClassName = combineStyles(DOING_CARD_FRONT_STYLES.cardContainer);
  const iconClassName = combineStyles(DOING_CARD_FRONT_STYLES.icon);
  const bottomClassName = combineStyles(DOING_CARD_FRONT_STYLES.bottom);
  const textContainerClassName = combineStyles(DOING_CARD_FRONT_STYLES.textContainer);
  const termTagContainerClassName = combineStyles(DOING_CARD_FRONT_STYLES.termTagContainer);
  const titleClassName = combineStyles(DOING_CARD_FRONT_STYLES.title);
  const descriptionClassName = combineStyles(DOING_CARD_FRONT_STYLES.description);

  return (
    <div className={cardContainerClassName} onClick={onFlip}>
      <img className={iconClassName} src={icon_dark} alt={title} />

      <div className={bottomClassName}>
        <div className={termTagContainerClassName}>
          {!isTermEmpty &&
            term.map((termItem) => (
              <Tag key={termItem} mode="light">
                {termItem}학기
              </Tag>
            ))}
        </div>
        <div className={textContainerClassName}>
          <div className={titleClassName}>{title}</div>
          <div className={descriptionClassName}>{shortDescription}</div>
        </div>
      </div>
    </div>
  );
};

export default DoingCardFront;
