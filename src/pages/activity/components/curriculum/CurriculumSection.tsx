import { useState } from 'react';
import SubTitle from '@shared/components/SubTitle';
import { SUB_TITLE } from '@pages/activity/constants/index';
import { combineStyles } from '@shared/utils/combineStyles';
import Curriculum from '@/pages/activity/components/curriculum/Curriculum';
import PartButton from '@/pages/activity/components/curriculum/PartButton';
import Retrospect from '@/pages/activity/components/curriculum/Retrospect';
import type { TermType } from '@pages/activity/constants/curriculum';
import { CURRICULUM_DATA } from '@pages/activity/constants/curriculum';
import type { PartType } from '@pages/activity/constants/curriculum';
import type { CurriculumItem } from '@/pages/activity/components/curriculum/Curriculum';

// CurriculumSection 스타일 상수화
const CURRICULUM_SECTION_STYLES = {
  section: {
    base: 'bg-navyblack scrollbar-hidden relative flex flex-col justify-center items-center overscroll-contain',
    desktop: 'lg:py-[8rem] lg:gap-[7.63rem]',
    tablet: 'md:py-[6rem] md:gap-[2rem]',
    mobile: 'py-[4rem] gap-[1.5rem]',
  },
  content: {
    base: 'relative w-full h-scroll flex flex-col justify-center items-center overflow-x-hidden',
  },
  curriculumContainer: {
    base: 'w-full flex flex-col items-center justify-center',
    desktop: 'lg:gap-[3.56rem]',
    tablet: 'md:gap-[2.2rem]',
    mobile: 'gap-[1.5rem]',
  },
} as const;

const CurriculumSection = () => {
  const [selectedPart, setSelectedPart] = useState<PartType>('common');
  const [selectedTerm, setSelectedTerm] = useState<TermType>('1학기');

  const sectionClassName = combineStyles(CURRICULUM_SECTION_STYLES.section);
  const contentClassName = combineStyles(CURRICULUM_SECTION_STYLES.content);
  const curriculumContainerClassName = combineStyles(CURRICULUM_SECTION_STYLES.curriculumContainer);

  const handleChangePart = (part: PartType) => {
    setSelectedPart(part);

    const partData = CURRICULUM_DATA[part] as Record<TermType, CurriculumItem[]> | undefined;

    const firstAvailableTerm = (['1학기', '2학기'] as TermType[]).find((term) => partData?.[term]);

    if (firstAvailableTerm) {
      setSelectedTerm(firstAvailableTerm);
    }
  };

  return (
    <section className={sectionClassName}>
      {/* SubTitle 모바일 / 테블릿,데스크탑 분기 */}
      <div className="hidden md:block">
        <SubTitle mode="dark" subTitle={SUB_TITLE.SUB_TITLE_3} subDescription={SUB_TITLE.SUB_DESCRIPTION_3} />
      </div>
      <div className="md:hidden">
        <SubTitle mode="dark" subTitle={SUB_TITLE.SUB_TITLE_3} subDescription={SUB_TITLE.SUB_DESCRIPTION_3_MOBILE} />
      </div>

      <div className={contentClassName}>
        {/* 공통 기준 컨테이너 */}
        <div className="flex w-full max-w-[22.5625rem] flex-col items-start md:max-w-[41.68456rem] lg:max-w-[66rem]">
          {/* 위: 커리큘럼 (가운데 보이게 하고 싶으면 내부에서 center) */}
          <div className={curriculumContainerClassName}>
            <PartButton selectedPart={selectedPart} onChange={handleChangePart} />
            <Curriculum selectedPart={selectedPart} selectedTerm={selectedTerm} onChangeTerm={setSelectedTerm} />
          </div>

          {/* 아래: 회고 */}
          <div className="w-screen items-start">
            <Retrospect selectedPart={selectedPart} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
