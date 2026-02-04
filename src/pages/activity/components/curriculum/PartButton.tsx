import { combineStyles } from '@shared/utils/combineStyles';
import type { PartType } from '@pages/activity/constants/curriculum';
import { parts } from '@pages/activity/constants/curriculum';

interface PartButtonProps {
  selectedPart: PartType;
  onChange: (part: PartType) => void;
}

// 스타일 상수화
const CURRICULUM_STYLES = {
  buttonContainer: {
    base: 'flex items-center justify-between',
    desktop: 'lg:w-[66.25rem]',
    tablet: 'md:w-[41.68456rem]',
    mobile: 'w-[22.5625rem]',
  },
  button: {
    base: 'cursor-pointer flex items-center justify-center transition-colors',
    desktop: 'lg:hd32-semibold lg:rounded-[1.25rem] lg:w-[15.4375rem] lg:h-[6.25rem]',
    tablet: 'md:hd20-semibold md:rounded-[0.78569rem] md:w-[9.69406rem] md:h-[3.93825rem]',
    mobile: 'hd14-semibold rounded-[0.3125rem] w-[5.3125rem] h-[2.1875rem] shrink-0',
    active: 'bg-blue text-white',
    inactive: 'bg-white text-navyblack',
  },
} as const;

const PartButton = ({ selectedPart, onChange }: PartButtonProps) => {
  const buttonContainerClassName = combineStyles(CURRICULUM_STYLES.buttonContainer);
  const activeButtonClassName = `${combineStyles(CURRICULUM_STYLES.button)} ${CURRICULUM_STYLES.button.active}`;
  const inactiveButtonClassName = `${combineStyles(CURRICULUM_STYLES.button)} ${CURRICULUM_STYLES.button.inactive}`;

  return (
    <div className={buttonContainerClassName}>
      {parts.map((part) => {
        const isActive = selectedPart === part.id;

        return (
          <button
            key={part.id}
            type="button"
            onClick={() => onChange(part.id)}
            className={isActive ? activeButtonClassName : inactiveButtonClassName}>
            {part.name}
          </button>
        );
      })}
    </div>
  );
};

export default PartButton;
