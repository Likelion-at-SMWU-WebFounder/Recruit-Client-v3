import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '@shared/components/Layout';
import ProjectCarousel from '@pages/project/components/detail/ProjectCarousel';
import ProjectOverview from '@pages/project/components/detail/ProjectOverview';
import ProjectMember from '@pages/project/components/detail/ProjectMember';
import ProjectDescription from '@/pages/project/components/detail/ProjectDescription';
import NextProjectButton from '@pages/project/components/detail/NextProjectButton';
import { allProjectsData } from '@pages/project/constants/project/allProjectData';
import useImageManager from '@shared/hooks/useImageManager';
import { combineStyles } from '@shared/utils/combineStyles';

interface ProjectWithImages {
  images?: string[];
}

// ProjectDetail 스타일 상수화
const PROJECT_DETAIL_STYLES = {
  container: {
    base: 'flex w-full justify-center',
    mobile: 'px-[1rem] pt-[9.75rem] pb-[7.5rem]',
    tablet: 'md:px-[4rem] md:pt-[13rem] md:pb-[5.62rem]',
    desktop: 'lg:px-[10rem] lg:pt-[14.5rem] lg:pb-[1.5rem]',
  },
  content: {
    base: 'w-full',
  },
  header: {
    base: 'mb-[2.5rem] flex flex-col gap-[0.25rem]',
    tablet: 'md:mb-[3.5rem]',
    desktop: 'lg:mb-[4.5rem] lg:gap-[0.5rem]',
  },
  title: {
    base: 'text-blue hd24',
    tablet: 'md:text-[2rem]',
    desktop: 'lg:hd42',
  },
  summary: {
    base: 'text-gray text-[1rem] font-semibold',
    tablet: 'md:hd20-semibold',
    desktop: 'lg:hd28-semibold',
  },
  carouselMobile: {
    base: 'mb-[3.5rem]',
    tablet: 'md:mb-[4rem]',
    desktop: 'lg:hidden',
  },
  tabletGrid: {
    base: 'hidden md:grid md:grid-cols-2 md:gap-[1rem] lg:hidden',
  },
  tabletLeftColumn: {
    base: 'flex flex-col gap-[1rem]',
  },
  tabletRightColumn: {
    base: 'flex flex-col',
  },
  desktopGrid: {
    base: 'hidden lg:grid lg:grid-cols-3 lg:gap-[3.75rem]',
  },
  desktopLeftColumn: {
    base: 'flex flex-col gap-[2.12rem] lg:col-span-1',
  },
  desktopRightColumn: {
    base: 'flex flex-col gap-[2.75rem] lg:col-span-2',
  },
  mobileLayout: {
    base: 'space-y-[1rem] md:hidden',
  },
  nextProjectButton: {
    base: 'hidden justify-end md:mt-[5.62rem] md:flex',
    desktop: 'lg:mt-[4.62rem]',
  },
} as const;

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = allProjectsData.find((project) => project.id === projectId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  // 프로젝트 이미지 URL 배열 생성 (preload용)
  const preloadImageUrls = useMemo(() => {
    if (!project) return [];
    const projectWithImages = project as ProjectWithImages;
    return projectWithImages.images || [];
  }, [project]);

  // 프로젝트 이미지 preload
  useImageManager({
    imageUrls: preloadImageUrls,
    enabled: preloadImageUrls.length > 0,
  });

  if (!project) {
    return null;
  }

  const members = project.teamMember?.split('\n') || [];

  // 캐러셀 렌더링
  const renderCarousel = () => {
    const projectWithImages = project as ProjectWithImages;
    const carouselImages = projectWithImages.images || [];
    if (carouselImages.length === 0) return null;

    return <ProjectCarousel key={projectId} images={carouselImages} />;
  };

  const containerClassName = combineStyles(PROJECT_DETAIL_STYLES.container);
  const contentClassName = PROJECT_DETAIL_STYLES.content.base;
  const headerClassName = combineStyles(PROJECT_DETAIL_STYLES.header);
  const titleClassName = combineStyles(PROJECT_DETAIL_STYLES.title);
  const summaryClassName = combineStyles(PROJECT_DETAIL_STYLES.summary);
  const carouselMobileClassName = combineStyles(PROJECT_DETAIL_STYLES.carouselMobile);
  const tabletGridClassName = PROJECT_DETAIL_STYLES.tabletGrid.base;
  const tabletLeftColumnClassName = PROJECT_DETAIL_STYLES.tabletLeftColumn.base;
  const tabletRightColumnClassName = PROJECT_DETAIL_STYLES.tabletRightColumn.base;
  const desktopGridClassName = PROJECT_DETAIL_STYLES.desktopGrid.base;
  const desktopLeftColumnClassName = PROJECT_DETAIL_STYLES.desktopLeftColumn.base;
  const desktopRightColumnClassName = PROJECT_DETAIL_STYLES.desktopRightColumn.base;
  const mobileLayoutClassName = PROJECT_DETAIL_STYLES.mobileLayout.base;
  const nextProjectButtonClassName = combineStyles(PROJECT_DETAIL_STYLES.nextProjectButton);

  return (
    <Layout menuMode="light" footerMode="light">
      <div className={containerClassName}>
        <div className={contentClassName}>
          {/* 헤더 */}
          <header className={headerClassName}>
            <h1 className={titleClassName}>{project.title}</h1>
            <p className={summaryClassName}>{project.summary}</p>
          </header>

          {/* 태블릿, 모바일: 캐러셀을 맨 위에 배치 */}
          {(() => {
            const projectWithImages = project as ProjectWithImages;
            const hasImages = (projectWithImages.images?.length ?? 0) > 0;
            return hasImages && <div className={carouselMobileClassName}>{renderCarousel()}</div>;
          })()}

          {/* 태블릿: 캐러셀 아래 2열(1:1) */}
          <div className={tabletGridClassName}>
            <div className={tabletLeftColumnClassName}>
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
              <ProjectMember members={members} />
            </div>
            <div className={tabletRightColumnClassName}>
              <ProjectDescription description={project.description || '-'} />
            </div>
          </div>

          {/* 데스크탑: 2열(1:2 비율) */}
          <div className={desktopGridClassName}>
            <div className={desktopLeftColumnClassName}>
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
              <ProjectMember members={members} />
            </div>
            <div className={desktopRightColumnClassName}>
              {renderCarousel()}
              <ProjectDescription description={project.description || '-'} />
            </div>
          </div>

          {/* 모바일: 세로 배치 */}
          <div className={mobileLayoutClassName}>
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
            <ProjectMember members={members} />
            <ProjectDescription description={project.description || '-'} />
          </div>

          {/* 다음 프로젝트 보기 버튼 */}
          {projectId && (
            <div className={nextProjectButtonClassName}>
              <NextProjectButton currentProjectId={projectId} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
