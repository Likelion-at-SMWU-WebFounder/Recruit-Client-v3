import { renderEmphasizedText } from '@shared/utils/renderEmphasizedText';

const ProjectMember = ({ members }: { members: string[] }) => {
  return (
    <div className="px-[0.625rem] pb-[0.6rem] md:pb-[0.8rem] md:pl-[1rem] lg:pb-[1rem] lg:pl-[1.87rem]">
      {members.map((member) => (
        <div key={member}>{renderEmphasizedText(member)}</div>
      ))}
    </div>
  );
};

export default ProjectMember;
