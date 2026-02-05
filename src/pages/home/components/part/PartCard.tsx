import { combineStyles } from '@shared/utils/combineStyles';

interface PartCardProps {
  part: string;
  explain: string;
  cardImage: string;
}

// PartCard 스타일 상수화
const PART_CARD_STYLES = {
  container: {
    base: 'flex flex-col rounded-xl bg-cover bg-center bg-no-repeat',
    desktop: 'lg:w-[32.3125rem] lg:h-[36.375rem] lg:aspect-[517/582]',
    mobile: 'w-[18rem] h-[23rem] aspect-[8/9]',
  },
  padding: {
    desktop: 'lg:px-[3.12rem] lg:py-[4.37rem]',
    tablet: 'md:px-[1.75rem] md:py-[2.38rem]',
    mobile: 'px-[1.5rem] py-[1.75rem]',
  },
  part: {
    base: 'text-navyblack',
    desktop: 'lg:hd28-semibold lg:mb-[2.12rem]',
    mobile: 'hd24 mb-[1.5rem]',
  },
  explain: {
    base: 'text-navyblack/70 whitespace-pre-line',
    desktop: 'lg:bd28 lg:leading-[140%]',
    mobile: 'bd15 leading-[180%]',
  },
  shadow: 'shadow-sub lg:hover:shadow-default',
} as const;

const PartCard = ({ part, explain, cardImage }: PartCardProps) => {
  const containerClassName = `${combineStyles(PART_CARD_STYLES.container)} ${combineStyles(PART_CARD_STYLES.padding)} ${PART_CARD_STYLES.shadow}`;
  const partClassName = combineStyles(PART_CARD_STYLES.part);
  const explainClassName = combineStyles(PART_CARD_STYLES.explain);

  return (
    <div className={containerClassName} style={{ backgroundImage: `url(${cardImage})` }}>
      <div className={partClassName}>{part}</div>
      <div className={explainClassName}>{explain}</div>
    </div>
  );
};

export default PartCard;
