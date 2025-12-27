import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DetailContainer from '@pages/project/components/detail/DetailContainer';
import ProjectCarousel from '@pages/project/components/detail/ProjectCarousel';
import ProjectOverview from '@pages/project/components/detail/ProjectOverview';
import ProjectMember from '@pages/project/components/detail/ProjectMember';
import ProjectDescription from '@/pages/project/components/detail/ProjectDescription';
import NextProjectButton from '@pages/project/components/detail/NextProjectButton';
import { allProjectsData } from '@pages/project/constants/project/allProjectData';
import { PROJECT_DETAIL_TITLES } from '@pages/project/constants/detail';

interface ProjectWithImages {
  images?: string[];
}

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = allProjectsData.find((project) => project.id === projectId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!project) {
    return null;
  }

  const projectImages = (project as ProjectWithImages)?.images;
  const members = project.teamMember?.split('\n') || [];

  // 개요 섹션 렌더링
  const renderOverviewSection = () => (
    <DetailContainer title={PROJECT_DETAIL_TITLES.overview} mobileOnlyToggle>
      <ProjectOverview
        category={project.category}
        no={project.no}
        techStack={project.techStack}
        award={project.award}
        googleDriveUrl={project.googleDriveUrl}
        gitFeUrl={project.gitFeUrl}
        gitBeUrl={project.gitBeUrl}
        gitOrgUrl={project.gitOrgUrl}
      />
    </DetailContainer>
  );

  // 팀원 섹션 렌더링
  const renderTeamMembersSection = () => (
    <DetailContainer title={PROJECT_DETAIL_TITLES.teamMembers}>
      <ProjectMember members={members} />
    </DetailContainer>
  );

  // 서비스 설명 섹션 렌더링
  const renderServiceSection = () => (
    <DetailContainer title={PROJECT_DETAIL_TITLES.service} mode="light" mobileOnlyToggle>
      <ProjectDescription description={project.description || '-'} />
    </DetailContainer>
  );

  // 캐러셀 렌더링
  const renderCarousel = () => {
    if (!project.thumbnail) return null;

    return <ProjectCarousel thumbnail={project.thumbnail} images={projectImages} />;
  };

  return (
    <div className="flex w-full justify-center px-[1rem] pt-[9.75rem] pb-[7.5rem] md:px-[4rem] md:pt-[13rem] md:pb-[5.62rem] lg:px-[10rem] lg:pt-[14.5rem] lg:pb-[1.5rem]">
      <div className="w-full">
        {/* 헤더 */}
        <header className="mb-[2.5rem] flex flex-col gap-[0.25rem] md:mb-[3.5rem] lg:mb-[4.5rem] lg:gap-[0.5rem]">
          <h1 className="text-blue text-[1.5rem] font-bold md:text-[2rem] lg:text-[2.625rem]">{project.title}</h1>
          <p className="text-gray text-[1rem] font-semibold md:text-[1.25rem] lg:text-[1.75rem]">{project.summary}</p>
        </header>

        {/* 태블릿, 모바일: 캐러셀을 맨 위에 배치 */}
        {project.thumbnail && <div className="mb-[3.5rem] md:mb-[4rem] lg:hidden">{renderCarousel()}</div>}

        {/* 태블릿: 캐러셀 아래 2열(1:1) */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-[1rem] lg:hidden">
          <div className="flex flex-col gap-[1rem]">
            {renderOverviewSection()}
            {renderTeamMembersSection()}
          </div>
          <div className="flex flex-col">{renderServiceSection()}</div>
        </div>

        {/* 데스크탑: 2열(1:2 비율) */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-[3.75rem]">
          <div className="flex flex-col gap-[2.12rem] lg:col-span-1">
            {renderOverviewSection()}
            {renderTeamMembersSection()}
          </div>
          <div className="flex flex-col gap-[2.75rem] lg:col-span-2">
            {renderCarousel()}
            {renderServiceSection()}
          </div>
        </div>

        {/* 모바일: 세로 배치 */}
        <div className="space-y-[1rem] md:hidden">
          {renderOverviewSection()}
          {renderTeamMembersSection()}
          {renderServiceSection()}
        </div>

        {/* 다음 프로젝트 보기 버튼 */}
        {projectId && (
          <div className="hidden justify-end md:mt-[5.62rem] md:flex lg:mt-[4.62rem]">
            <NextProjectButton currentProjectId={projectId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
