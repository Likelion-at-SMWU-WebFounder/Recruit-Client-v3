import { combineStyles } from '@shared/utils/combineStyles';
import { renderEmphasizedText } from '@/shared/utils/renderEmphasizedText';

interface ValueCardProps {
  keyword: string;
  description: string;
  cardImage: string;
}

// ValueCard 스타일 상수화
const VALUE_CARD_STYLES = {
  container: {
    base: 'rounded-xl bg-cover bg-center bg-no-repeat',
    mobile: 'w-[18rem] h-[20.25rem] aspect-[8/9]',
    desktop: 'lg:w-[32.3125rem] lg:h-[36.375rem] lg:aspect-[517/582]',
  },
  padding: {
    base: 'px-[1.75rem] py-[2.38rem]',
    desktop: 'lg:px-[3.12rem] lg:py-[4.37rem]',
  },
  keyword: {
    base: 'hd24 text-navyblack',
    tablet: 'md:hd24',
    desktop: 'lg:hd42-semibold',
  },
  description: {
    base: 'hd16 text-navyblack',
    tablet: 'md:hd16',
    desktop: 'lg:hd28-semibold',
  },
  shadow: 'shadow-sub lg:shadow-default',
} as const;

const ValueCard = ({ keyword, description, cardImage }: ValueCardProps) => {
  const containerClassName = `${combineStyles(VALUE_CARD_STYLES.container)} ${combineStyles(VALUE_CARD_STYLES.padding)} ${VALUE_CARD_STYLES.shadow}`;
  const keywordClassName = combineStyles(VALUE_CARD_STYLES.keyword);
  const descriptionClassName = combineStyles(VALUE_CARD_STYLES.description);

  return (
    <div className={containerClassName} style={{ backgroundImage: `url(${cardImage})` }}>
      <div className={keywordClassName}>{renderEmphasizedText(keyword, { emphasisClassName: 'text-blue' })}</div>
      <div className={descriptionClassName}>{description}</div>
    </div>
  );
};

export default ValueCard;
