import { useNavigate } from 'react-router-dom';
import { ROUTER_URL } from '@/shared/constants/url';

import SubTitle from '@shared/components/SubTitle';
import DefaultButton from '@shared/components/button/DefaultButton';

import { combineStyles } from '@shared/utils/combineStyles';
import { SUB_TITLE } from '@pages/home/constants/index';
import { PROJECT_BUTTON_TEXT } from '@/pages/home/constants/project';
import { getProjectImages, splitImagesIntoTwoRows } from '@/pages/home/utils/getProjectImages';

// ProjectSection 스타일 상수화
const PROJECT_SECTION_STYLES = {
  section: {
    base: 'w-full max-w-[100vw] flex flex-col justify-center items-center py-[6.25rem] overflow-hidden',
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
  const sectionClassName = combineStyles(PROJECT_SECTION_STYLES.section);
  const scrollContainerClassName = combineStyles(PROJECT_SECTION_STYLES.scrollContainer);
  const scrollRowClassName = combineStyles(PROJECT_SECTION_STYLES.scrollRow);
  const firstRowClassName = combineStyles(PROJECT_SECTION_STYLES.firstRow);
  const secondRowClassName = combineStyles(PROJECT_SECTION_STYLES.secondRow);
  const projectCardClassName = combineStyles(PROJECT_SECTION_STYLES.projectCard);

  const navigate = useNavigate();
  const handlePartClick = () => {
    navigate(ROUTER_URL.ACTIVITY);
  };

  // 프로젝트 이미지들을 가져와서 두 줄로 분할
  const projectImages = getProjectImages();
  const [firstRowImages, secondRowImages] = splitImagesIntoTwoRows(projectImages);

  // 무한 스크롤을 위해 이미지들을 3번 복제 (연속성 확보)
  const duplicatedFirstRow = [...firstRowImages, ...firstRowImages, ...firstRowImages];
  const duplicatedSecondRow = [...secondRowImages, ...secondRowImages, ...secondRowImages];

  return (
    <section className={sectionClassName}>
      <SubTitle subTitle={SUB_TITLE.SUB_TITLE_5} subDescription={SUB_TITLE.SUB_DESCRIPTION_5} />

      <div className={`${scrollContainerClassName} lg:cursor-pointer`}>
        {/* 첫 번째 줄: 오른쪽으로 스크롤 */}
        <div className={`${scrollRowClassName} ${firstRowClassName} project-scroll-right`}>
          {duplicatedFirstRow.map((imagePath, index) => (
            <div
              key={`first-${index}`}
              className={projectCardClassName}
              style={{ backgroundImage: `url(${imagePath})` }}
              onClick={handlePartClick}
            />
          ))}
        </div>

        {/* 두 번째 줄: 왼쪽으로 스크롤 - 모바일에서 안 보임 */}
        <div className={`${scrollRowClassName} ${secondRowClassName} project-scroll-left`}>
          {duplicatedSecondRow.map((imagePath, index) => (
            <div
              key={`second-${index}`}
              className={projectCardClassName}
              style={{ backgroundImage: `url(${imagePath})` }}
              onClick={handlePartClick}
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
