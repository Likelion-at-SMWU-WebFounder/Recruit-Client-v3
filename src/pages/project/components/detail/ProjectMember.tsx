import { renderEmphasizedText } from '@shared/utils/renderEmphasizedText';

const ProjectMember = ({ members }: { members: string[] }) => {
  return (
    <div className="md:pl-[1rem] lg:pl-[1.87rem]">
      {members.map((member) => (
        <div key={member}>{renderEmphasizedText(member)}</div>
      ))}
    </div>
  );
};

export default ProjectMember;
