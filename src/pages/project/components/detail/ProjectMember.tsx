import DetailContainer from '@pages/project/components/detail/DetailContainer';
import { PROJECT_DETAIL_TITLES } from '@pages/project/constants/detail';
import { renderEmphasizedText } from '@shared/utils/renderEmphasizedText';
import { combineStyles } from '@shared/utils/combineStyles';

const MEMBER_STYLES = {
  container: {
    base: 'px-[0.625rem] pb-[0.6rem]',
    tablet: ' md:pb-[0.8rem] md:pl-[1rem]',
    desktop: 'lg:pb-[1rem] lg:pl-[1.87rem]',
  },
  member: {
    base: 'text-navyblack break-words text-[1rem] font-[500] leading-[170%]',
    tablet: 'md:bd18 ',
    desktop: 'lg:text-[1.25rem] lg:font-[400] lg:leading-[190%]',
  },
} as const;

const ProjectMember = ({ members }: { members: string[] }) => {
  const containerClassName = combineStyles(MEMBER_STYLES.container);
  const memberClassName = combineStyles(MEMBER_STYLES.member);

  return (
    <DetailContainer title={PROJECT_DETAIL_TITLES.teamMembers}>
      <div className={containerClassName}>
        {members.map((member) => (
          <div key={member} className={memberClassName}>
            {renderEmphasizedText(member)}
          </div>
        ))}
      </div>
    </DetailContainer>
  );
};

export default ProjectMember;
