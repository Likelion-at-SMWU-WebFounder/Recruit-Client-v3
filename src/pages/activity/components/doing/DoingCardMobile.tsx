import Tag from '@/shared/components/Tag';
import { combineStyles } from '@shared/utils/combineStyles';

interface DoingCardMobileProps {
  icon_white?: string;
  term: number[];
  title: string;
  fullDescription: string;
  image: string;
}

// DoingCardMobile 스타일 상수화
const DOING_CARD_MOBILE_STYLES = {
  cardContainer: {
    base: 'relative flex flex-col bg-cover bg-center bg-no-repeat overflow-hidden shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)]',
    mobile: 'w-[18.625rem] h-[12.5rem] rounded-[0.61844rem]',
  },
  overlay: {
    base: 'absolute inset-0 bg-blue/80 rounded-[0.61844rem]',
  },
  contentWrapper: {
    base: 'relative z-10 flex flex-col h-full p-[1rem]',
  },
  icon: {
    base: 'absolute right-[1.16rem] top-[1.13rem] aspect-square',
    mobile: 'w-[1.5rem] h-[1.5rem]',
  },
  bottom: {
    base: 'flex flex-col mt-auto ',
    mobile: 'gap-[0.4375rem]',
  },
  textContainer: {
    base: 'flex flex-col',
    mobile: 'gap-[0.5rem]',
  },
  termTagContainer: {
    base: 'flex',
    mobile: 'gap-[0.31rem]',
  },
  title: {
    base: 'hd18 leading-[140%] text-white',
  },
  description: {
    base: 'font-[500] whitespace-pre-line whitespace-nowrap leading-[180%] text-white',
    mobile: 'text-[0.875rem]',
  },
} as const;

const DoingCardMobile = ({ icon_white, term, title, fullDescription, image }: DoingCardMobileProps) => {
  const isTermEmpty = term.length === 0;

  const cardContainerClassName = combineStyles(DOING_CARD_MOBILE_STYLES.cardContainer);
  const overlayClassName = combineStyles(DOING_CARD_MOBILE_STYLES.overlay);
  const contentWrapperClassName = combineStyles(DOING_CARD_MOBILE_STYLES.contentWrapper);
  const iconClassName = combineStyles(DOING_CARD_MOBILE_STYLES.icon);
  const bottomClassName = combineStyles(DOING_CARD_MOBILE_STYLES.bottom);
  const textContainerClassName = combineStyles(DOING_CARD_MOBILE_STYLES.textContainer);
  const termTagContainerClassName = combineStyles(DOING_CARD_MOBILE_STYLES.termTagContainer);
  const titleClassName = combineStyles(DOING_CARD_MOBILE_STYLES.title);
  const descriptionClassName = combineStyles(DOING_CARD_MOBILE_STYLES.description);

  return (
    <div className={cardContainerClassName} style={{ backgroundImage: `url(${image})` }}>
      <div className={overlayClassName} />

      <div className={contentWrapperClassName}>
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

export default DoingCardMobile;
