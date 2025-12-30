import DetailContainer from '@pages/project/components/detail/DetailContainer';
import { PROJECT_DETAIL_TITLES } from '@pages/project/constants/detail';
import { renderEmphasizedText } from '@shared/utils/renderEmphasizedText';

const ProjectMember = ({ members }: { members: string[] }) => {
  return (
    <DetailContainer title={PROJECT_DETAIL_TITLES.teamMembers}>
      <div className="px-[0.625rem] pb-[0.6rem] md:pb-[0.8rem] md:pl-[1rem] lg:pb-[1rem] lg:pl-[1.87rem]">
        {members.map((member) => (
          <div key={member}>{renderEmphasizedText(member)}</div>
        ))}
      </div>
    </DetailContainer>
  );
};

export default ProjectMember;
