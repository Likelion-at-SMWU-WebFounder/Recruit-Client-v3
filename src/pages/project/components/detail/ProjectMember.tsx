const ProjectMember = ({ members }: { members: string[] }) => {
  return (
    <div className="md:pl-[1rem] lg:pl-[1.87rem]">
      {members.map((member) => (
        <div key={member}>{member}</div>
      ))}
    </div>
  );
};

export default ProjectMember;
