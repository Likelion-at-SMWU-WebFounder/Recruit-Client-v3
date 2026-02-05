import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROUTER_URL } from '@/shared/constants/url';

import SubTitle from '@shared/components/SubTitle';
import DefaultButton from '@shared/components/button/DefaultButton';

import { combineStyles } from '@shared/utils/combineStyles';
import { SUB_TITLE } from '@pages/home/constants/index';
import { PROJECT_BUTTON_TEXT } from '@/pages/home/constants/project';
import { allProjectsData } from '@pages/project/constants/project/allProjectData';

// ProjectSection 스타일 상수화
const PROJECT_SECTION_STYLES = {
  section: {
    base: 'w-full max-w-[100vw] flex flex-col justify-between items-center pt-[10rem] overflow-hidden',
    desktop: 'lg:gap-[3.25rem]',
    tablet: 'md:gap-[7rem]',
    mobile: 'gap-[2.5rem]',
  },
  scrollContainer: {
    base: 'w-full relative flex flex-col justify-center items-center overflow-hidden',
    desktop: 'lg:gap-[1.5rem]',
    tablet: 'md:gap-[1rem]',
  },
  scrollRow: {
    base: 'flex w-max h-auto',
    desktop: 'lg:gap-[1.5rem]',
    tablet: 'md:gap-[1rem]',
    mobile: 'gap-[0.75rem]',
  },
  firstRow: {
    base: 'flex',
  },
  secondRow: {
    base: 'hidden md:flex',
  },
  projectCard: {
    base: 'rounded-[1.25rem] bg-cover bg-center bg-no-repeat flex-shrink-0',
    desktop: 'lg:w-[32.5rem] lg:h-[18.25rem]',
    tablet: 'md:w-[23.375rem] md:h-[13.125rem] md:aspect-[187/105]',
    mobile: 'w-[16.6875rem] h-[9.375rem] aspect-[89/50]',
  },
} as const;

const ProjectSection = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const sectionClassName = combineStyles(PROJECT_SECTION_STYLES.section);
  const scrollContainerClassName = combineStyles(PROJECT_SECTION_STYLES.scrollContainer);
  const scrollRowClassName = combineStyles(PROJECT_SECTION_STYLES.scrollRow);
  const firstRowClassName = combineStyles(PROJECT_SECTION_STYLES.firstRow);
  const secondRowClassName = combineStyles(PROJECT_SECTION_STYLES.secondRow);
  const projectCardClassName = combineStyles(PROJECT_SECTION_STYLES.projectCard);

  // IntersectionObserver로 섹션이 뷰포트에 들어오면 애니메이션 시작
  useEffect(() => {
    const projectSection = document.getElementById('project-section');
    if (!projectSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimating) {
            setIsAnimating(true);
          }
        });
      },
      {
        threshold: 0.3, // 30% 이상 보이면 애니메이션 시작
      }
    );

    observer.observe(projectSection);

    return () => {
      observer.disconnect();
    };
  }, [isAnimating]);

  const navigate = useNavigate();
  const handlePartClick = () => {
    navigate(ROUTER_URL.PROJECT);
  };

  // 대표 이미지 경로를 기반으로 프로젝트 ID를 찾는 함수
  const getProjectIdByImage = (imagePath: string): string | null => {
    for (const project of allProjectsData) {
      if (project.images && project.images[0] === imagePath) {
        return project.id;
      }
    }
    return null;
  };

  // 프로젝트 상세 페이지로 이동하는 함수
  const handleProjectClick = (imagePath: string) => {
    const projectId = getProjectIdByImage(imagePath);
    if (projectId) {
      navigate(ROUTER_URL.PROJECT_DETAIL.replace(':projectId', projectId));
    } else {
      // 프로젝트를 찾을 수 없으면 프로젝트 목록 페이지로 이동
      navigate(ROUTER_URL.PROJECT);
    }
  };

  // 상수에서 프로젝트 이미지들을 가져와서 두 줄로 분할
  const getProjectImages = (): string[] => {
    const images: string[] = [];
    // allProjectsData에서 모든 프로젝트의 대표 이미지(첫 번째 이미지)를 가져옴
    allProjectsData.forEach((project) => {
      if (project.images && project.images.length > 0) {
        images.push(project.images[0]);
      }
    });

    if (images.length === 0) {
      return [];
    }

    // 이미지가 부족하면 반복해서 추가 (최소 20개 확보)
    while (images.length < 20) {
      images.push(...images.slice(0, Math.min(images.length, 20 - images.length)));
    }

    return images;
  };

  // 배열을 두 부분으로 나누는 함수
  const splitImagesIntoTwoRows = (images: string[]): [string[], string[]] => {
    const mid = Math.ceil(images.length / 2);
    const firstRow = images.slice(0, mid);
    const secondRow = images.slice(mid);
    return [firstRow, secondRow];
  };

  const projectImages = getProjectImages();
  const [firstRowImages, secondRowImages] = splitImagesIntoTwoRows(projectImages);

  // 무한 스크롤을 위해 이미지들을 5번 복제 (연속성 확보 및 빈 공간 방지)
  const duplicatedFirstRow = Array(5).fill(firstRowImages).flat();
  const duplicatedSecondRow = Array(5).fill(secondRowImages).flat();

  return (
    <section className={sectionClassName}>
      <SubTitle subTitle={SUB_TITLE.SUB_TITLE_5} subDescription={SUB_TITLE.SUB_DESCRIPTION_5} />

      <div className={`${scrollContainerClassName} lg:cursor-pointer`}>
        {/* 첫 번째 줄: 오른쪽으로 스크롤 */}
        <div className={`${scrollRowClassName} ${firstRowClassName} ${isAnimating ? 'project-scroll-right' : ''}`}>
          {duplicatedFirstRow.map((imagePath, index) => (
            <div
              key={`first-${index}-${imagePath}`}
              className={projectCardClassName}
              style={{ backgroundImage: `url(${imagePath})` }}
              onClick={() => handleProjectClick(imagePath)}
            />
          ))}
        </div>

        {/* 두 번째 줄: 왼쪽으로 스크롤 - 모바일에서 안 보임 */}
        <div className={`${scrollRowClassName} ${secondRowClassName} ${isAnimating ? 'project-scroll-left' : ''}`}>
          {duplicatedSecondRow.map((imagePath, index) => (
            <div
              key={`second-${index}-${imagePath}`}
              className={projectCardClassName}
              style={{ backgroundImage: `url(${imagePath})` }}
              onClick={() => handleProjectClick(imagePath)}
            />
          ))}
        </div>
      </div>

      <div className="mt-[2.5rem] lg:hidden">
        <DefaultButton onClick={handlePartClick} backgroundType="white">
          {PROJECT_BUTTON_TEXT}
        </DefaultButton>
      </div>
    </section>
  );
};

export default ProjectSection;
