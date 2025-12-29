import { useEffect, useState } from 'react';
import Title from '@shared/components/Title';
import FilterBar from '@pages/project/components/list/filter/FilterBar';
import ProjectGrid from '@pages/project/components/list/ProjectGrid';
import { combineStyles } from '@shared/utils/combineStyles';
import {
  PROJECT_TITLE,
  PROJECT_SUBTITLE,
  PROJECT_FILTER_OPTIONS,
  PROJECT_BACKGROUND_IMAGES_PATH,
} from '@pages/project/constants';

const PROJECT_STYLES = {
  container: {
    base: 'flex flex-col items-center gap-[2.75rem] px-[1rem] pt-[10rem] pb-[7.5rem]',
    tablet: 'md:gap-[1.7rem] md:pt-[12.63rem] md:pb-[5rem]',
    desktop: 'lg:gap-[11.44rem] lg:pt-[16.25rem] lg:pb-[7.5rem]',
  },
  titleWrapper: {
    base: 'flex w-full flex-col items-start',
    tablet: 'md:max-w-[100rem]',
  },
  contentWrapper: {
    base: 'w-full',
    tablet: 'md:max-w-[100rem]',
  },
} as const;

const getWidth = () => (typeof window !== 'undefined' ? window.innerWidth : 1440);
const getProjectImage = (width: number) => {
  if (width <= 768) return PROJECT_BACKGROUND_IMAGES_PATH.mobile;
  if (width <= 1024) return PROJECT_BACKGROUND_IMAGES_PATH.tablet;
  return PROJECT_BACKGROUND_IMAGES_PATH.desktop;
};

const Project = () => {
  const [backgroundImage, setBackgroundImage] = useState(() => `url(${getProjectImage(getWidth())})`);

  useEffect(() => {
    const handleResize = () => setBackgroundImage(`url(${getProjectImage(getWidth())})`);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [filter, setFilter] = useState(PROJECT_FILTER_OPTIONS[0].name);
  const containerClassName = combineStyles(PROJECT_STYLES.container);
  const titleWrapperClassName = combineStyles(PROJECT_STYLES.titleWrapper);
  const contentWrapperClassName = combineStyles(PROJECT_STYLES.contentWrapper);

  return (
    <div
      className={containerClassName}
      style={{ backgroundImage, backgroundSize: 'cover', backgroundPosition: 'top', backgroundRepeat: 'no-repeat' }}>
      <div className={titleWrapperClassName}>
        <Title title={PROJECT_TITLE} description={PROJECT_SUBTITLE} isIcon={true} />
      </div>
      <div className={contentWrapperClassName}>
        <FilterBar value={filter} onChange={setFilter} />
        <ProjectGrid filter={filter} />
      </div>
    </div>
  );
};

export default Project;
