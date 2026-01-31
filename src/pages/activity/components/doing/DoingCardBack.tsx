import Tag from '@/shared/components/Tag';
import { combineStyles } from '@shared/utils/combineStyles';

interface DoingCardBackProps {
  icon_white?: string;
  term: number[];
  title: string;
  fullDescription: string;
  image: string;
  onFlipBack: () => void;
}

// DoingCardBack 스타일 상수화
const DOING_CARD_BACK_STYLES = {
  cardContainer: {
    base: 'absolute inset-0 flex flex-col shrink-0 rounded-[1.25rem] bg-cover bg-center bg-no-repeat overflow-hidden shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] [transform:rotateY(180deg)] [-webkit-backface-visibility:hidden] [backface-visibility:hidden]',
    desktop: 'lg:w-[23.875rem] lg:h-[36.375rem]',
    tablet: 'md:w-[12.73331rem] md:h-[19.4rem]',
  },
  overlay: {
    base: 'absolute inset-0 bg-blue/80 rounded-[1.25rem]',
  },
  contentWrapper: {
    base: 'relative z-10 flex flex-col h-full',
    desktop: 'lg:p-[2.7rem]  lg:pb-[2.5rem]',
    tablet: 'md:p-[1.4rem]',
  },
  icon: {
    base: 'aspect-square',
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
    base: 'font-[800] leading-[140%] text-white',
    desktop: 'lg:text-[2.625rem] lg:mb-[0.2rem]',
    tablet: 'md:text-[1.5rem]',
    mobile: 'text-[1.125rem]',
  },
  description: {
    base: 'font-[500] whitespace-pre-line whitespace-nowrap leading-[180%] text-white',
    desktop: 'lg:text-[1.5rem]',
    tablet: 'text-[0.875rem]',
  },
} as const;

const DoingCardBack = ({ icon_white, term, title, fullDescription, image, onFlipBack }: DoingCardBackProps) => {
  const isTermEmpty = term.length === 0;

  const cardContainerClassName = combineStyles(DOING_CARD_BACK_STYLES.cardContainer);
  const overlayClassName = combineStyles(DOING_CARD_BACK_STYLES.overlay);
  const contentWrapperName = combineStyles(DOING_CARD_BACK_STYLES.contentWrapper);
  const iconClassName = combineStyles(DOING_CARD_BACK_STYLES.icon);
  const bottomClassName = combineStyles(DOING_CARD_BACK_STYLES.bottom);
  const textContainerClassName = combineStyles(DOING_CARD_BACK_STYLES.textContainer);
  const termTagContainerClassName = combineStyles(DOING_CARD_BACK_STYLES.termTagContainer);
  const titleClassName = combineStyles(DOING_CARD_BACK_STYLES.title);
  const descriptionClassName = combineStyles(DOING_CARD_BACK_STYLES.description);

  return (
    <div
      className={cardContainerClassName}
      onClick={onFlipBack}
      style={{ backgroundImage: `url(${image})`, backgroundSize: '100% 100%' }}>
      <div className={overlayClassName} />

      <div className={contentWrapperName}>
        <img className={iconClassName} src={icon_white} alt={title} />

        <div className={bottomClassName}>
          <div className={termTagContainerClassName}>
            {!isTermEmpty &&
              term.map((termItem) => (
                <Tag key={termItem} mode="dark">
                  {termItem}학기
                </Tag>
              ))}
          </div>
          <div className={textContainerClassName}>
            <div className={titleClassName}>{title}</div>
            <div className={descriptionClassName}>{fullDescription}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoingCardBack;
