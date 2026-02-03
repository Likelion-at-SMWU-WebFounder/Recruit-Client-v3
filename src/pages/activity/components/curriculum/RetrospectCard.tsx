import { combineStyles } from '@shared/utils/combineStyles';

interface RetrospectCardProps {
  name: string;
  batch: number;
  part: string;
  retrospect: string;
  image: string;
}

const RECTROSPECT_CARD_STYLES = {
  card: {
    base: 'flex flex-col items-center bg-white',
    desktop: 'lg:w-[23.875rem] lg:min-h-[36.25rem] lg:rounded-[1.25rem]',
    tablet: 'md:w-[13.25rem] md:min-h-[20rem] md:rounded-[0.69369rem]',
    mobile: 'w-[9.71469rem] min-h-[17rem] rounded-[0.50863rem]',
  },
  cardImage: {
    base: 'relative bg-cover bg-center flex flex-col justify-end items-start w-full bg-cover bg-center',
    desktop: 'lg:h-[15rem] lg:rounded-[1.25rem]',
    tablet: 'md:h-[8.75rem] md:rounded-[0.69369rem]',
    mobile: 'h-[6.4375rem] rounded-[0.50863rem]',
  },
  cardImageBlur: {
    base: 'absolute left-0 w-full backdrop-blur-[32px] h-[100%]',
    desktop: 'lg:top-[calc(15rem - 11.5rem)]',
    tablet: 'md:top-[calc(13.25rem - 6.8rem)]',
    mobile: 'top-[calc(6.4375rem - 4.7rem)]',
  },
  textContainer: {
    base: 'z-100 flex flex-col justify-start items-start w-full',
    desktop: 'lg:gap-[0.75rem] lg:pb-[1.2rem] lg:pl-[1.87rem]',
    tablet: 'md:gap-[0.38rem] md:pb-[0.14rem] md:pl-[1.04rem]',
    mobile: 'gap-[0.31rem] md:pb-[0.4rem] pl-[0.76rem]',
  },
  tag: {
    base: 'flex justify-center items-center bg-white/20 backdrop-blur text-white border-1 border-white',
    desktop: 'lg:bd16 lg:py-[0.3125rem] lg:rounded-[1.875rem] lg:px-[0.9375rem]',
    tablet: 'md:py-[0.17344rem] md:px-[0.52031rem] md:text-[0.625rem] md:leading-normal md:rounded-[1.04056rem]',
    mobile: 'py-[0.12713rem] px-[0.38144rem] bd12 rounded-[0.76294rem]',
  },
  name: {
    base: 'text-white',
    desktop: 'lg:bd28',
    tablet: 'md:bd18',
    mobile: 'bd16',
  },
  retrospectBox: {
    base: 'font-[500] text-navyblack',
    desktop: 'lg:p-[1.88rem] lg:text-[1.5rem] lg:leading-[175%]',
    tablet: 'md:p-[1.04rem] md:text-[0.875rem] md:leading-[170%]',
    mobile: 'p-[0.76rem] text-[0.875rem] leading-[140%]',
  },
};

const RetrospectCard = ({ name, batch, part, retrospect, image }: RetrospectCardProps) => {
  const cardClassName = combineStyles(RECTROSPECT_CARD_STYLES.card);
  const cardImageClassName = combineStyles(RECTROSPECT_CARD_STYLES.cardImage);
  const cardImageBlurClassName = combineStyles(RECTROSPECT_CARD_STYLES.cardImageBlur);
  const textContainerClassName = combineStyles(RECTROSPECT_CARD_STYLES.textContainer);
  const tagClassName = combineStyles(RECTROSPECT_CARD_STYLES.tag);
  const nameClassName = combineStyles(RECTROSPECT_CARD_STYLES.name);
  const retrospectBoxClassName = combineStyles(RECTROSPECT_CARD_STYLES.retrospectBox);

  return (
    <div className={cardClassName}>
      <div className={cardImageClassName} style={{ backgroundImage: `url(${image})` }}>
        {/* 그라데이션 마스크를 사용한 점진적 블러 효과 */}
        <div
          className={cardImageBlurClassName}
          style={{
            maskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0) 100%)',
          }}
        />

        <div className={textContainerClassName}>
          <div className="flex flex-row gap-[0.3rem]">
            <span className={tagClassName}>{batch}기</span>
            <span className={tagClassName}>{part}</span>
          </div>
          <span className={nameClassName}>{name}</span>
        </div>
      </div>
      <div className={retrospectBoxClassName}>{retrospect}</div>
    </div>
  );
};

export default RetrospectCard;
