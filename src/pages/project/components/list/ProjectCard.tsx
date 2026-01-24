import { useState, useEffect, useRef } from 'react';
import Badge from '@pages/project/components/list/Badge';
import Skeleton from '@/shared/components/loading/Skeleton';
import { combineStyles } from '@shared/utils/combineStyles';

interface ProjectCardProps {
  thumbnail: string; // 프로젝트 썸네일 이미지 URL
  title: string; // 프로젝트 제목
  summary: string; // 프로젝트 요약
  no: string; // 프로젝트 기수 (ex. 9기 ~ 13기)
  category: string; // 프로젝트 카테고리 (ex. 아이디어톤, 여기톤, 중앙해커톤, 4호선톤, 파이널프로젝트)
  onClick: () => void; // 프로젝트 상세 페이지로 이동 함수
  isFirstPage?: boolean; // 프로젝트 목록 첫 페이지 이미지 eager loading 여부
}

// 스타일 상수화: desktop이 없는 경우는 tablet과 같은 스타일을 사용
const CARD_STYLES = {
  container: {
    base: 'group flex cursor-pointer transition-all duration-300 ease-in-out',
    mobile:
      'flex-row items-end gap-[0.75rem] rounded-[0.75rem] bg-white px-[0.875rem] py-[1.25rem] [box-shadow:1px_1px_8.4px_0_rgba(27,38,52,0.10)]',
    tablet:
      'md:max-h-[28.9375rem] md:min-h-[27.125rem] md:w-[27.5rem] md:flex-col md:items-start md:gap-[2.625rem] md:rounded-none md:bg-transparent md:p-0 md:shadow-none',
    desktop: 'lg:max-h-[33.3125rem] lg:min-h-[31.0625rem] lg:w-[32.375rem]',
  },
  thumbnailWrapper: {
    base: 'relative flex-shrink-0 overflow-hidden',
    mobile: 'h-[6.25rem] min-h-[6.25rem] w-[6.25rem] min-w-[6.25rem] rounded-[0.34781rem]',
    tablet: 'md:h-[15.5rem] md:min-h-0 md:w-[27.5rem] md:min-w-0 md:rounded-[1.25rem]',
    desktop: 'lg:h-[18.25rem] lg:w-[32.375rem]',
  },
  thumbnailImage: {
    base: 'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
    mobile: 'rounded-[0.34781rem]',
    tablet: 'md:rounded-[1.25rem]',
    loading: 'opacity-0',
    loaded: 'opacity-100',
  },
  thumbnailOverlay: {
    base: 'absolute inset-0 flex items-center justify-center text-white text-[1rem] font-semibold opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100',
    mobile: 'rounded-[0.34781rem] bg-[linear-gradient(0deg,rgba(76,76,76,0.40)_0%,rgba(76,76,76,0.40)_100%)]',
    tablet: 'md:rounded-[1.25rem] md:bg-[linear-gradient(0deg,rgba(76,76,76,0.40)_0%,rgba(76,76,76,0.40)_100%)]',
  },
  content: {
    base: 'space-y-[0.62rem]',
    tablet: 'md:space-y-[1.75rem]',
  },
  textSection: {
    base: 'space-y-[0.25rem]',
    tablet: 'md:space-y-[0.75rem]',
  },
  title: {
    base: 'hd18 text-navyblack group-hover:text-blue transition-all duration-300 ease-out',
    tablet: 'md:hd24',
    desktop: 'lg:hd28',
  },
  summary: {
    base: 'hd14-semibold text-gray line-clamp-1',
    tablet: 'md:hd18-semibold md:line-clamp-none md:break-keep',
    desktop: 'lg:text-[1.5rem]',
  },
  badgeContainer: {
    base: 'flex items-center gap-[0.25rem]',
    tablet: 'md:gap-[0.625rem]',
  },
} as const;

const ProjectCard = ({ thumbnail, title, summary, no, category, onClick, isFirstPage = false }: ProjectCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const containerClassName = combineStyles(CARD_STYLES.container);
  const thumbnailWrapperClassName = combineStyles(CARD_STYLES.thumbnailWrapper);
  const thumbnailImageClassName = [
    combineStyles(CARD_STYLES.thumbnailImage),
    isImageLoaded ? CARD_STYLES.thumbnailImage.loaded : CARD_STYLES.thumbnailImage.loading,
  ].join(' ');
  const thumbnailOverlayClassName = combineStyles(CARD_STYLES.thumbnailOverlay);
  const contentClassName = combineStyles(CARD_STYLES.content);
  const textSectionClassName = combineStyles(CARD_STYLES.textSection);
  const titleClassName = combineStyles(CARD_STYLES.title);
  const summaryClassName = combineStyles(CARD_STYLES.summary);
  const badgeContainerClassName = combineStyles(CARD_STYLES.badgeContainer);

  // 이미지가 이미 로드되어 있는지 확인 (브라우저 캐시)
  useEffect(() => {
    setIsImageLoaded(false); // 이미지 로드 상태 초기화
    if (imgRef.current?.complete) {
      setIsImageLoaded(true); // 이미지 로드 상태 설정
    }
  }, [thumbnail]);

  const handleImageLoad = () => {
    setIsImageLoaded(true); // 이미지 로드 상태 설정
  };

  return (
    <div onClick={onClick} className={containerClassName}>
      <div className={thumbnailWrapperClassName}>
        {!isImageLoaded && (
          <div className="absolute inset-0">
            <Skeleton width="100%" height="100%" className="rounded-[0.34781rem] md:rounded-[1.25rem]" />
          </div>
        )}
        <img
          ref={imgRef}
          src={thumbnail}
          alt={`${title} 프로젝트 썸네일`}
          className={thumbnailImageClassName}
          loading={isFirstPage ? 'eager' : 'lazy'}
          onLoad={handleImageLoad}
          onError={() => setIsImageLoaded(true)} // 에러 시에도 로딩 상태 해제
        />
        <div className={thumbnailOverlayClassName}>
          <div className="text-blue rounded-2xl bg-white px-[1.375rem] py-[0.625rem] leading-[140%] font-semibold md:text-[1.5rem] lg:text-[1.75rem]">
            프로젝트 더보기
          </div>
        </div>
      </div>
      <div className={contentClassName}>
        <div className={textSectionClassName}>
          <div className={titleClassName}>{title}</div>
          <div className={summaryClassName}>{summary}</div>
        </div>
        <div className={badgeContainerClassName}>
          <Badge>{no}</Badge>
          <Badge>{category}</Badge>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
