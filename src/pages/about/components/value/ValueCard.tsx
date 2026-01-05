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
    base: 'text-[1.5rem] font-[700] text-navyblack',
    tablet: 'md:text-[1.5rem]',
    desktop: 'lg:font-[600] lg:text-[2.625rem]',
  },
  description: {
    base: 'text-[1rem] font-[700] text-navyblack',
    tablet: 'md:text-[1rem]',
    desktop: 'lg:font-[600] lg:text-[2rem]',
  },
  shadow: '0px 0px 22.7px 0px rgba(27,38,52,0.13)',
} as const;

const ValueCard = ({ keyword, description, cardImage }: ValueCardProps) => {
  const containerClassName = `${combineStyles(VALUE_CARD_STYLES.container)} ${combineStyles(VALUE_CARD_STYLES.padding)}`;
  const keywordClassName = combineStyles(VALUE_CARD_STYLES.keyword);
  const descriptionClassName = combineStyles(VALUE_CARD_STYLES.description);

  return (
    <div
      className={containerClassName}
      style={{ backgroundImage: `url(${cardImage})`, boxShadow: VALUE_CARD_STYLES.shadow }}>
      <div className={keywordClassName}>{renderEmphasizedText(keyword, { emphasisClassName: 'text-blue' })}</div>
      <div className={descriptionClassName}>{description}</div>
    </div>
  );
};

export default ValueCard;
