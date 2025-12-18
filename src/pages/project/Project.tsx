import { useState } from 'react';
import Title from '@shared/components/Title';
import FilterBar from '@pages/project/components/list/filter/FilterBar';
import ProjectGrid from '@pages/project/components/list/ProjectGrid';
import { PROJECT_TITLE, PROJECT_SUBTITLE, PROJECT_FILTER_OPTIONS } from '@pages/project/constants';

const PROJECT_STYLES = {
  container: {
    base: 'flex flex-col items-center gap-[2.75rem] px-[1rem] pt-[10rem]',
    tablet: 'md:gap-[1.7rem] md:pt-[12.62rem]',
    desktop: 'lg:gap-[11.44rem] lg:pt-[16.25rem]',
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

const Project = () => {
  const [filter, setFilter] = useState(PROJECT_FILTER_OPTIONS[0].name);
  const containerClassName = [
    PROJECT_STYLES.container.base,
    PROJECT_STYLES.container.tablet,
    PROJECT_STYLES.container.desktop,
  ].join(' ');
  const titleWrapperClassName = [PROJECT_STYLES.titleWrapper.base, PROJECT_STYLES.titleWrapper.tablet].join(' ');
  const contentWrapperClassName = [PROJECT_STYLES.contentWrapper.base, PROJECT_STYLES.contentWrapper.tablet].join(' ');

  return (
    <div className={containerClassName}>
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
