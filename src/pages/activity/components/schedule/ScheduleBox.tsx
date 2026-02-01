import { combineStyles } from '@shared/utils/combineStyles';

interface ScheduleBoxProps {
  mode: 'left' | 'right';
  title: string;
  date: string;
  images: string[];
  active: boolean;
}

const SCHEDULE_BOX_STYLE = {
  box: {
    base: 'w-full flex overflow-hidden',
    left: 'justify-start',
    right: 'justify-end',
  },
  content: {
    base: 'flex flex-col w-[calc(50%-3rem)] overflow-hidden',
    left: 'items-end text-right',
    right: 'items-start text-left',
  },
  date: {
    base: 'font-[500] leading-[140%]',
    desktop: 'lg:text-[1.5rem]',
    tablet: 'md:text-[0.875rem]',
    mobile: 'text-[0.75rem]',
    active: 'text-navyblack',
    inactive: 'text-navyblack/30',
  },
  title: {
    base: 'font-[600] leading-[140%]',
    desktop: 'lg:mt-[0.25rem]',
    tablet: 'md:mt-[0.2rem] md:text-[1.375rem]',
    mobile: 'mt-[0.15rem] text-[1rem]',
    active: 'text-navyblack lg:text-[2.625rem] ',
    inactive: 'text-navyblack/30 lg:text-[2.25rem] ',
  },
  imageContainer: {
    base: 'inline-flex items-center overflow-hidden',
    left: 'justify-end',
    right: 'justify-start',
    desktop: 'lg:flex-row lg:gap-[1.25rem]',
    tablet: 'md:flex-row md:gap-[0.67rem]',
    mobile: 'flex-col gap-[0.26rem]',
    active: 'visible',
    inactive: 'hidden',
  },
  image: {
    base: 'rounded-[1.05531rem]',
    desktop: 'lg:w-[18.30919rem] lg:h-[11.92475rem]',
    tablet: 'md:w-[9.76488rem] md:h-[6.35988rem]',
    mobile: 'w-[7.5rem] h-[4.875rem]',
  },
};

const ScheduleBox = ({ mode = 'left', title, date, images, active = false }: ScheduleBoxProps) => {
  const boxClassName = `
  ${combineStyles(SCHEDULE_BOX_STYLE.box)}
  ${mode === 'left' ? SCHEDULE_BOX_STYLE.box.left : SCHEDULE_BOX_STYLE.box.right}
`;

  const contentClassName = `
  ${combineStyles(SCHEDULE_BOX_STYLE.content)}
  ${mode === 'left' ? SCHEDULE_BOX_STYLE.content.left : SCHEDULE_BOX_STYLE.content.right}
`;
  const dateClassName = `${combineStyles(SCHEDULE_BOX_STYLE.date)}  ${active ? SCHEDULE_BOX_STYLE.date.active : SCHEDULE_BOX_STYLE.date.inactive}`;
  const titleClassName = `${combineStyles(SCHEDULE_BOX_STYLE.title)}  ${active ? SCHEDULE_BOX_STYLE.title.active : SCHEDULE_BOX_STYLE.title.inactive}`;
  const imageContainerClassName = `${combineStyles(SCHEDULE_BOX_STYLE.imageContainer)} ${mode === 'left' ? SCHEDULE_BOX_STYLE.imageContainer.left : SCHEDULE_BOX_STYLE.imageContainer.right}`;
  const imageClassName = combineStyles(SCHEDULE_BOX_STYLE.image);

  return (
    <div className={boxClassName}>
      <div className={contentClassName}>
        <span className={dateClassName}>{date}</span>
        <span className={titleClassName}>{title}</span>

        {active && (
          <div className={imageContainerClassName}>
            {images.map((imageURL, index) => (
              <img key={index} className={imageClassName} src={imageURL} alt={title} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleBox;
