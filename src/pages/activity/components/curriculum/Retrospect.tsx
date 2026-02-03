import type { PartType } from '@pages/activity/constants/curriculum';
import SubTitle from '@/shared/components/SubTitle';
import { SUB_TITLE } from '@pages/activity/constants/index';
import { CURRICULUM_RETROSPECT } from '@pages/activity/constants/curriculum';
import { combineStyles } from '@shared/utils/combineStyles';
import RetrospectCard from '@/pages/activity/components/curriculum/RetrospectCard';

interface RetrospectProps {
  selectedPart: PartType;
}

const RETROSPECT_STYLES = {
  retrospect: {
    base: 'flex flex-row bg-navyblack w-full justify-end',
    desktop: 'lg:mt-[9.5rem] lg:gap-[3.31rem]',
    tablet: 'md:mt-[2.54rem] md:gap-[5rem]',
    mobile: 'mt-[1.88rem] gap-[2.31rem]',
  },
  retrospectCardContainer: {
    desktop: 'lg:max-w-[76rem] lg:h-fit lg:overflow-x-hidden',
    tablet: 'md:max-w-[38.625rem] md:h-fit',
    mobile: 'max-w-[13.8125rem] h-fit ',
  },
  retrosepectCardRow: {
    base: 'scrollbar-hidden flex flex-row items-start justify-start overflow-x-scroll',
    desktop: 'lg:gap-[1.5rem] lg:pr-[1.5rem]',
    tablet: 'md:gap-[1rem] md:pr-[1rem]',
    mobile: 'gap-[0.5rem] pr-[0.5rem]',
  },
} as const;

const Retrospect = ({ selectedPart }: RetrospectProps) => {
  const retrospectClassName = combineStyles(RETROSPECT_STYLES.retrospect);
  const retrospectCardContainerClassName = combineStyles(RETROSPECT_STYLES.retrospectCardContainer);
  const retrospectCardRowClassName = combineStyles(RETROSPECT_STYLES.retrosepectCardRow);

  // selectedPart에 따른 subDescription 결정
  const getSubDescription = () => {
    switch (selectedPart) {
      case 'backend':
        return SUB_TITLE.SUB_DESCRIPTION_4_BACK;
      case 'frontend':
        return SUB_TITLE.SUB_DESCRIPTION_4_FRONT;
      case 'pm_pd':
        return SUB_TITLE.SUB_DESCRIPTION_4_PM_PD;
      case 'common':
      default:
        return SUB_TITLE.SUB_DESCRIPTION_4_COMMON; // 공통 + 기본값
    }
  };

  return (
    <>
      <div className={retrospectClassName}>
        {/* SubTitle 모바일 / 테블릿,데스크탑 분기 */}
        <div className="hidden md:block">
          <SubTitle mode="dark" align="left" subTitle={SUB_TITLE.SUB_TITLE_4} subDescription={getSubDescription()} />
        </div>
        <div className="md:hidden">
          <SubTitle
            mode="dark"
            align="left"
            subTitle={SUB_TITLE.SUB_TITLE_4}
            subDescription={SUB_TITLE.SUB_DESCRIPTION_4_MOBILE}
          />
        </div>

        <div className={retrospectCardContainerClassName}>
          <div className={retrospectCardRowClassName}>
            {CURRICULUM_RETROSPECT[selectedPart].map((retrospect, index) => (
              <div key={index}>
                <RetrospectCard
                  name={retrospect.name}
                  batch={retrospect.batch}
                  part={retrospect.part}
                  retrospect={
                    selectedPart === 'common' && 'common_retrospect' in retrospect
                      ? retrospect.common_retrospect
                      : retrospect.retrospect
                  }
                  image={retrospect.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Retrospect;
