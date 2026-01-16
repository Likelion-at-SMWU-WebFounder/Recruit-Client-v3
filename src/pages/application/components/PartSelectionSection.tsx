import type { PartType } from '../types/index';
import { PART_OPTIONS } from '../constants/index';

interface PartSelectionSectionProps {
  selectedPart: PartType | null;
  onPartChange: (part: PartType) => void;
  programmersCompleted: boolean;
  onProgrammersChange: (completed: boolean) => void;
}

const PartSelectionSection = ({
  selectedPart,
  onPartChange,
  programmersCompleted,
  onProgrammersChange,
}: PartSelectionSectionProps) => {
  return (
    <section className="flex flex-col gap-6">
      <h3 className="text-[1.125rem] font-semibold text-[#1B2634] md:text-[1.25rem]">지원 정보</h3>

      {/* 지원 파트 */}
      <div className="flex flex-col gap-3">
        <label className="text-[0.875rem] font-medium text-[#1B2634] md:text-[1rem]">
          지원 파트<span className="text-[#4284FF]"> *</span>
        </label>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          {PART_OPTIONS.map((part) => (
            <label key={part.id} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="part"
                value={part.id}
                checked={selectedPart === part.id}
                onChange={() => onPartChange(part.id as PartType)}
                className="h-4 w-4 accent-[#4284FF]"
              />
              <span className="text-[0.875rem] text-[#1B2634] md:text-[1rem]">{part.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 프로그래머스 수강 인증 */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-[0.875rem] font-medium text-[#1B2634] md:text-[1rem]">프로그래머스 수강 인증</label>
          <a
            href="https://school.programmers.co.kr/learn/courses/2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.75rem] font-medium text-[#4284FF] underline md:text-[0.875rem]">
            파이썬 입문 강의
          </a>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="programmers"
            checked={programmersCompleted}
            onChange={(e) => onProgrammersChange(e.target.checked)}
            className="h-4 w-4 accent-[#4284FF]"
          />
          <label htmlFor="programmers" className="text-[0.875rem] text-[#1B2634] md:text-[1rem]">
            파트 1~8, 10~11 수강완료
          </label>
        </div>
      </div>
    </section>
  );
};

export default PartSelectionSection;
