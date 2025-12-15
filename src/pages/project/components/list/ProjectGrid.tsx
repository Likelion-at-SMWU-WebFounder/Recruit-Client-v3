import { useNavigate } from 'react-router-dom';

import ProjectCard from '@pages/project/components/list/ProjectCard';
import { allProjectsData } from '@pages/project/constants/allProjectData';

interface ProjectGridProps {
  filter: string;
}

const GRID_STYLES = {
  container: {
    base: 'grid w-full grid-cols-1 gap-[1rem]',
    tablet: 'md:max-w-[100rem] md:grid-cols-2 md:gap-x-[1rem] md:gap-y-[7.5rem]',
    desktop: 'lg:grid-cols-3 lg:gap-x-[1.5rem]',
  },
} as const;

const ProjectGrid = ({ filter }: ProjectGridProps) => {
  const navigate = useNavigate();
  const handleClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const filteredProjects = allProjectsData.filter((project) => filter === '전체' || project.no.includes(filter));

  const containerClassName = [
    GRID_STYLES.container.base,
    GRID_STYLES.container.tablet,
    GRID_STYLES.container.desktop,
  ].join(' ');

  return (
    <div className={containerClassName}>
      {filteredProjects.map((project) => (
        <ProjectCard
          key={project.id}
          thumbnail={project.thumbnail}
          title={project.title}
          summary={project.summary}
          no={project.no}
          category={project.category}
          onClick={() => {
            handleClick(project.id);
          }}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
