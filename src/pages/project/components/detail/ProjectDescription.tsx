import DetailContainer from '@pages/project/components/detail/DetailContainer';
import { PROJECT_DETAIL_TITLES } from '@pages/project/constants/detail';
import { combineStyles } from '@shared/utils/combineStyles';

interface ProjectDescriptionProps {
  description: string;
}

const DESCRIPTION_STYLES = {
  container: {
    base: 'text-navyblack px-[0.625rem] pb-[0.6rem]',
    tablet: 'md:px-[0.75rem] md:pb-[0.8rem]',
    desktop: 'lg:px-[1rem] lg:pb-[1rem]',
  },
  description: {
    base: 'text-[1rem] leading-[200%] font-[500] whitespace-pre-line',
    tablet: 'md:text-[1.125rem] md:leading-[170%]',
    desktop: 'lg:text-[1.25rem] lg:leading-[190%]',
  },
} as const;

const ProjectDescription = ({ description }: ProjectDescriptionProps) => {
  const containerClassName = combineStyles(DESCRIPTION_STYLES.container);
  const descriptionClassName = combineStyles(DESCRIPTION_STYLES.description);

  return (
    <DetailContainer title={PROJECT_DETAIL_TITLES.service} mode="light" mobileOnlyToggle>
      <div className={`${containerClassName} ${descriptionClassName}`}>{description}</div>
    </DetailContainer>
  );
};

export default ProjectDescription;
