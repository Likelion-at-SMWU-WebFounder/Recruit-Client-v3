import { combineStyles } from '@shared/utils/combineStyles';
import { CURRICULUM_DATA } from '@pages/activity/constants/curriculum';
import type { PartType, TermType } from '@pages/activity/constants/curriculum';
import { WiSnowflakeCold } from 'react-icons/wi';
import '@pages/activity/styles/snowflacke.css';

interface CurriculumProps {
  selectedPart: PartType;
  selectedTerm: TermType;
  onChangeTerm: (term: TermType) => void;
}

export interface CurriculumItem {
  week?: number;
  tool: string;
  content: string;
}

// 스타일 상수화
const CURRICULUM_STYLES = {
  curriculumBox: {
    base: 'bg-white border-b-[0.5px] border-gray-500 ',
    desktop: 'lg:w-[66.25rem] lg:rounded-[1.25rem]',
    tablet: 'md:w-[41.68456rem] md:rounded-[0.78569rem]',
    mobile: 'w-[22.5625rem] rounded-[0.41275rem]',
  },
  termContainer: {
    base: 'flex items-end justify-start border-b border-gray-300',
    desktop: 'lg:gap-[3.375rem] lg:pt-[1rem] lg:pl-[3.38rem] lg:pb-[0rem',
    tablet: 'md:gap-[2.28rem] md:pt-[0.5rem] md:pl-[2.12rem] md:pb-[0.6rem]',
    mobile: 'gap-[1.09rem] pt-[0.6rem] pl-[1.53rem] pb-[0.69rem]',
  },
  termItem: {
    base: 'inline-flex flex-col items-center justify-end',
    desktop: 'lg:pb-[1rem]',
  },
  term: {
    base: 'cursor-pointer transition-colors',
    desktop: 'lg:bd24',
    tablet: 'md:bd17',
    mobile: 'bd14',
    active: 'border-navyblack text-navyblack',
    inactive: 'hover:text-navyblack/50 text-gray',
  },
  table: {
    base: 'flex flex-col justify-center items-center',
    desktop: '',
  },
  row: {
    base: 'grid grid-cols-[100px_1fr_2fr] justify-center items-center border-b border-gray-100 last:border-0 whitespace-pre-line',
    desktop: 'lg:w-[56.875rem] lg:gap-[2.5rem] lg:py-[2.19rem]',
    tablet: 'md:w-[36.35281rem] md:gap-[1.94rem] md:py-[1.94rem]',
    mobile: 'w-[20rem] gap-[0] py-[1.12rem]',
  },
  week: {
    base: 'text-blue ',
    desktop: 'lg:bd28',
    tablet: 'md:bd17',
    mobile: 'bd13',
  },
  tool: {
    base: 'text-navyblack ',
    desktop: 'lg:bd28',
    tablet: 'md:bd17',
    mobile: 'bd13 ml-[-1rem]',
  },
  content: {
    base: 'text-navyblack',
    desktop: 'lg:bd28',
    tablet: 'md:bd17',
    mobile: 'bd13',
  },
} as const;

const Curriculum = ({ selectedPart, selectedTerm, onChangeTerm }: CurriculumProps) => {
  const curriculumBoxClassName = combineStyles(CURRICULUM_STYLES.curriculumBox);
  const termContainerClassName = combineStyles(CURRICULUM_STYLES.termContainer);
  const termItemClassName = combineStyles(CURRICULUM_STYLES.termItem);
  const activeTermClassName = `${combineStyles(CURRICULUM_STYLES.term)} ${CURRICULUM_STYLES.term.active}`;
  const inactiveTermClassName = `${combineStyles(CURRICULUM_STYLES.term)} ${CURRICULUM_STYLES.term.inactive}`;
  const tableClassName = combineStyles(CURRICULUM_STYLES.table);
  const rowClassName = combineStyles(CURRICULUM_STYLES.row);
  const weekClassName = combineStyles(CURRICULUM_STYLES.week);
  const toolClassName = combineStyles(CURRICULUM_STYLES.tool);
  const contentClassName = combineStyles(CURRICULUM_STYLES.content);

  // 현재 선택된 데이터 가져오기
  const currentData: CurriculumItem[] =
    (CURRICULUM_DATA[selectedPart] as Record<TermType, CurriculumItem[]> | undefined)?.[selectedTerm] ?? [];

  // 해당 파트에 학기 데이터가 있는지 확인
  const hasTermData = (part: PartType, term: TermType) => {
    const partData = CURRICULUM_DATA[part] as Record<TermType, CurriculumItem[]> | undefined;
    return Boolean(partData?.[term]);
  };

  // 현재 파트에 있는 학기들만 필터링
  const availableTerms = (['1학기', '2학기'] as TermType[]).filter((term) => hasTermData(selectedPart, term));

  return (
    <>
      {/* 커리큘럼 박스 */}
      <div className={curriculumBoxClassName}>
        {/* 학기 탭 - 데이터가 있는 학기만 표시 */}
        <div className={termContainerClassName}>
          {availableTerms.map((term) => {
            const isActive = selectedTerm === term;
            return (
              <div className={termItemClassName} key={term}>
                {isActive ? <WiSnowflakeCold className="snowflake snowflake-move" /> : <></>}
                <button
                  onClick={() => onChangeTerm(term)}
                  className={isActive ? activeTermClassName : inactiveTermClassName}>
                  {term}
                </button>
              </div>
            );
          })}
        </div>

        {/* 커리큘럼 테이블 */}
        <div className={tableClassName}>
          {currentData.map((item: CurriculumItem, index: number) => {
            const week = item.week || index + 1;

            return (
              <div key={week} className={rowClassName}>
                <div className={`${weekClassName} lowercase`}>week {String(week).padStart(2, '0')}</div>
                <div className={toolClassName}>{item.tool}</div>
                <div className={contentClassName}>{item.content}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Curriculum;
