import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTER_URL } from '@shared/constants/url';

import { combineStyles } from '@shared/utils/combineStyles';
import { allProjectsData } from '@pages/project/constants/project/allProjectData';

const SCROLL_TO_TOP_OPTIONS = { top: 0, behavior: 'smooth' as const } as const;
const BUTTON_TEXT = '다음 프로젝트 보기';

const NEXT_PROJECT_BUTTON_STYLES = {
  button: {
    base: 'shadow-sub group hover:bg-blue w-full cursor-pointer overflow-hidden bg-white p-[1rem] transition-shadow duration-300 ease-out border border-gray-opacity20',
    tablet: 'md:w-[17.5625rem] md:rounded-[0.75rem]',
    desktop: 'lg:w-[21.8125rem] lg:rounded-[1.25rem]',
  },
  content: 'flex flex-row items-center gap-[1.25rem] justify-start',
  thumbnailWrapper: {
    base: 'relative flex-shrink-0 overflow-hidden rounded-[0.5rem] bg-white-opacity12',
  },
  thumbnailSize: {
    base: 'h-[6.25rem] w-[6.25rem]',
    tablet: 'md:h-[2.8125rem] md:w-[5rem]',
    desktop: 'lg:h-[4.6875rem] lg:w-[8.3125rem]',
  },
  thumbnailImage: 'h-full w-full object-cover',
  textWrapper: 'flex items-center justify-center',
  text: {
    base: 'text-navyblack whitespace-nowrap transition-colors duration-300 ease-out group-hover:text-white',
    tablet: 'md:hd18-semibold',
    desktop: 'lg:hd20-semibold',
  },
} as const;

interface NextProjectButtonProps {
  currentProjectId: string;
}

const NextProjectButton = ({ currentProjectId }: NextProjectButtonProps) => {
  const navigate = useNavigate();

  // 다음 프로젝트 찾기
  const nextProject = useMemo(() => {
    const currentIndex = allProjectsData.findIndex((project) => project.id === currentProjectId);
    const isValidIndex = currentIndex >= 0 && currentIndex < allProjectsData.length - 1;
    return isValidIndex ? allProjectsData[currentIndex + 1] : null;
  }, [currentProjectId]);

  const nextProjectThumbnail = useMemo(() => {
    if (!nextProject) return '';
    const projectWithImages = nextProject as typeof nextProject & { images?: string[] };
    return projectWithImages.images?.[0] || '';
  }, [nextProject]);

  // 클릭 핸들러
  const handleClick = useCallback(() => {
    if (!nextProject) return;
    navigate(`${ROUTER_URL.PROJECT_DETAIL.replace(':projectId', nextProject.id)}`);
    window.scrollTo(SCROLL_TO_TOP_OPTIONS);
  }, [navigate, nextProject]);

  // 스타일 클래스명 조합
  const buttonClassName = combineStyles(NEXT_PROJECT_BUTTON_STYLES.button);
  const contentClassName = NEXT_PROJECT_BUTTON_STYLES.content;
  const thumbnailWrapperClassName = combineStyles(NEXT_PROJECT_BUTTON_STYLES.thumbnailWrapper);
  const thumbnailSizeClassName = combineStyles(NEXT_PROJECT_BUTTON_STYLES.thumbnailSize);
  const thumbnailImageClassName = NEXT_PROJECT_BUTTON_STYLES.thumbnailImage;
  const textWrapperClassName = NEXT_PROJECT_BUTTON_STYLES.textWrapper;
  const textClassName = combineStyles(NEXT_PROJECT_BUTTON_STYLES.text);

  // 다음 프로젝트가 없으면 렌더링하지 않음
  if (!nextProject) {
    return null;
  }

  return (
    <button type="button" onClick={handleClick} className={buttonClassName}>
      <div className={contentClassName}>
        {/* 왼쪽: 프로젝트 썸네일 */}
        <div className={thumbnailWrapperClassName}>
          <div className={thumbnailSizeClassName}>
            <img
              src={nextProjectThumbnail}
              alt={`${nextProject.title} 프로젝트 썸네일`}
              className={thumbnailImageClassName}
              loading="lazy"
            />
          </div>
        </div>

        {/* 오른쪽: 버튼 텍스트 */}
        <div className={textWrapperClassName}>
          <span className={textClassName}>{BUTTON_TEXT}</span>
        </div>
      </div>
    </button>
  );
};

export default NextProjectButton;
