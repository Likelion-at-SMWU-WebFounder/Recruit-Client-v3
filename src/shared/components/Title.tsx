import { WiSnowflakeCold } from 'react-icons/wi';

interface TitleProps {
  isIcon?: boolean;
  title: string;
  description: string;
}

const TITLE_STYLES = {
  container: 'space-y-[0.56rem]',
  header: {
    base: 'flex items-center gap-[0.56rem]',
  },
  iconWrapper: {
    base: 'inline-flex h-10 w-6 shrink-0 items-center justify-center overflow-hidden leading-none',
    tablet: 'md:h-14 md:w-8',
    desktop: 'lg:h-16 lg:w-10',
  },
  icon: 'text-blue h-full w-full scale-150 transform',
  title: {
    base: 'text-navyblack font-[GMarketSans] text-[1.5rem] leading-[170%] font-bold',
    tablet: 'md:text-[2rem]',
    desktop: 'lg:text-[2.625rem]',
  },
  description: {
    base: 'text-gray hd18-semibold',
    tablet: 'md:hd24-semibold',
    desktop: 'lg:hd28-semibold',
    withIcon: 'pl-[0.38rem]',
  },
} as const;

const Title = ({ isIcon, title, description }: TitleProps) => {
  const headerClassName = [TITLE_STYLES.header.base].join(' ');
  const iconWrapperClassName = [
    TITLE_STYLES.iconWrapper.base,
    TITLE_STYLES.iconWrapper.tablet,
    TITLE_STYLES.iconWrapper.desktop,
  ].join(' ');
  const titleClassName = [TITLE_STYLES.title.base, TITLE_STYLES.title.tablet, TITLE_STYLES.title.desktop].join(' ');
  const descriptionClassName = [
    TITLE_STYLES.description.base,
    TITLE_STYLES.description.tablet,
    TITLE_STYLES.description.desktop,
    isIcon ? TITLE_STYLES.description.withIcon : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={TITLE_STYLES.container}>
      <div className={headerClassName}>
        {isIcon && (
          <span className={iconWrapperClassName}>
            <WiSnowflakeCold className={TITLE_STYLES.icon} />
          </span>
        )}
        <div className={titleClassName}>{title}</div>
      </div>
      <div className={descriptionClassName}>{description}</div>
    </div>
  );
};

export default Title;
