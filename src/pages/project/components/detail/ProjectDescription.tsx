import DetailContainer from '@pages/project/components/detail/DetailContainer';
import { PROJECT_DETAIL_TITLES } from '@pages/project/constants/detail';

interface ProjectDescriptionProps {
  description: string;
}

const ProjectDescription = ({ description }: ProjectDescriptionProps) => {
  return (
    <DetailContainer title={PROJECT_DETAIL_TITLES.service} mode="light" mobileOnlyToggle>
      <div className="text-navyblack px-[0.625rem] pb-[0.6rem] text-[1rem] leading-[200%] font-[500] whitespace-pre-line md:px-[0.75rem] md:pb-[0.8rem] lg:px-[1rem] lg:pb-[1rem] lg:text-[1.25rem] lg:leading-[190%]">
        {description}
      </div>
    </DetailContainer>
  );
};

export default ProjectDescription;
