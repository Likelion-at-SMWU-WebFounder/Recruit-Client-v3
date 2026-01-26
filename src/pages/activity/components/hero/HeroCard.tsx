import { combineStyles } from '@shared/utils/combineStyles';
import Tag from '@shared/components/Tag';

// HeroCard 스타일 상수화
const HERO_CARD_STYLES = {
  card: {
    base: 'inline-flex items-center justify-center bg-white-background shadow-sub lg:shadow-default',
    desktop: 'lg:gap-[1.25rem] lg:rounded-[1.875rem] lg:p-[1.25rem] lg:pr-[1.875rem]',
    tablet: 'md:gap-[0.67rem] md:rounded-[1rem] md:p-[0.7rem] md:pr-[1rem]',
    mobile: 'gap-[0.31rem] rounded-[0.7rem] p-[0.47413rem] pr-[0.71119rem]',
  },
  image: {
    base: 'object-cover',
    desktop: 'lg:w-[6.25rem] lg:h-[6.25rem] lg:rounded-[1.875rem]',
    tablet: 'md:w-[3.7rem] md:h-[3.7rem] md:rounded-[1rem]',
    mobile: 'w-[2.6rem] h-[2.6rem] rounded-[0.7rem]',
  },
  content: {
    base: 'inline-flex flex-col justify-center items-start ',
    desktop: 'lg:gap-[0.1.25rem]',
    tablet: 'md:gap-[0.67rem]',
    mobile: 'gap-[0.31rem]',
  },
  nameAndTag: {
    base: 'inline-flex flex-row justify-center items-center ',
    desktop: 'lg:gap-[0.62rem]',
    tablet: 'mg:gap-[0.33rem]',
    mobile: 'gap-[0.24rem]',
  },
  name: {
    base: 'font-medium leading-[140%]',
    desktop: 'lg:text-[1.75rem]',
    tablet: 'md:text-[1rem]',
    mobile: 'text-[0.75rem]',
  },
  tagContainer: {
    base: 'inline-flex flex-row justify-center items-center ',
    desktop: 'lg:gap-[0.31rem]',
    tablet: 'mg:gap-[0.17rem]',
    mobile: 'gap-[0.12rem]',
  },
  retro: {
    base: 'font-medium leading-[140%] text-navyblack',
    desktop: 'lg:text-[1.5rem]',
    tablet: 'md:text-[0.875rem]',
    mobile: 'text-[0.625rem]',
  },
} as const;

/* HeroCard 컴포넌트 */
interface HeroCardProps {
  image: string;
  name: string;
  batch: number;
  part: '프론트엔드' | '백엔드' | '기획/디자인';
  retro: string;
}

const HeroCard = ({ image, name, batch, part, retro }: HeroCardProps) => {
  const cardClassName = combineStyles(HERO_CARD_STYLES.card);
  const imageClassName = combineStyles(HERO_CARD_STYLES.image);
  const contentClassName = combineStyles(HERO_CARD_STYLES.content);
  const nameAndTagClassName = combineStyles(HERO_CARD_STYLES.nameAndTag);
  const nameClassName = combineStyles(HERO_CARD_STYLES.name);
  const tagContainerClassName = combineStyles(HERO_CARD_STYLES.tagContainer);
  const retroClassName = combineStyles(HERO_CARD_STYLES.retro);

  return (
    <div className={cardClassName}>
      <img src={image} alt={name} className={imageClassName} />

      <div className={contentClassName}>
        <div className={nameAndTagClassName}>
          <span className={nameClassName}>{name}</span>
          <div className={tagContainerClassName}>
            <Tag>{batch}기</Tag>
            <Tag>{part}</Tag>
          </div>
        </div>
        <span className={retroClassName}>{retro}</span>
      </div>
    </div>
  );
};

export default HeroCard;
