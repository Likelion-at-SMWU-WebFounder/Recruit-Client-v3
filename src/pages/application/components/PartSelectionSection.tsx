import { useRef, useState, type ChangeEvent } from 'react';
import SectionHeader from './SectionHeader';
import InfoDropdown from './applicant/InfoDropdown';
import type { PartType } from '../types/index';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');

  const partOptions = [
    { label: '기획·디자인', value: 'plan-design' },
    { label: '프론트엔드', value: 'frontend' },
    { label: '백엔드', value: 'backend' },
  ];

  const selectedPartLabel = partOptions.find((opt) => opt.value === selectedPart)?.label || '';

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onProgrammersChange(true);
    }
  };

  return (
    <section className="flex w-full flex-col items-center gap-[2.1875rem] self-stretch px-4 md:px-0">
      <SectionHeader title="지원 정보" />
      <div className="flex w-full flex-wrap content-start justify-center gap-y-[3rem] md:w-[52.75rem] md:gap-x-[3.25rem] lg:w-[89.1875rem] lg:gap-x-[8.5625rem]">
        {/* 지원 파트 선택 영역 */}
        <div className="flex w-full shrink-0 flex-col items-start md:w-[24.75rem] lg:w-[40.3125rem]">
          <InfoDropdown
            label="지원 파트"
            required
            value={selectedPartLabel}
            options={partOptions}
            onChange={(val) => onPartChange(val as PartType)}
          />
        </div>

        {/* 프로그래머스 수강 인증 영역 */}
        <div className="flex w-full shrink-0 flex-col items-start gap-[1rem] md:w-[24.75rem] md:gap-[1.375rem] lg:w-[40.3125rem]">
          {/* 라벨 및 링크 영역 */}
          <div className="flex w-full items-end justify-between self-stretch">
            <span className="text-[1.25rem] font-semibold text-[#1B2634] md:text-[1.5rem] lg:text-[2rem]">
              프로그래머스 수강 인증
            </span>
            <a
              href="https://school.programmers.co.kr/learn/courses/2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8125rem] font-medium text-[rgba(27,38,52,0.65)] underline md:text-[1rem] lg:text-[1.25rem]">
              파이썬 입문 강의 링크
            </a>
          </div>

          {/* 입력칸 + 부연설명 컨테이너*/}
          <div className="flex w-full flex-col items-start gap-[0.75rem]">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".zip" />

            {/* 실제 파일 업로드 버튼*/}
            <button
              type="button"
              onClick={handleUploadClick}
              className="group flex h-[2.5rem] w-full items-center justify-center rounded-[1rem] border-2 border-[#4284FF] bg-[#F7FAFF] pt-[0.6875rem] pr-[1.0625rem] pb-[0.625rem] pl-[0.875rem] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)] transition-all hover:bg-[#4284FF] md:h-[3.625rem] md:pt-[1rem] md:pr-[1.51225rem] md:pb-[1rem] md:pl-[1.5rem] lg:h-[4.1875rem] lg:px-[1.375rem] lg:py-[1.0625rem]">
              <span className="truncate text-[1rem] font-bold text-[#4284FF] transition-colors group-hover:text-white md:text-[1.25rem] lg:text-[1.75rem]">
                {programmersCompleted ? fileName || '파일 업로드 완료' : '파일 업로드'}
              </span>
            </button>

            {/* 부연 설명 타이포그래피 */}
            <p className="text-[0.8125rem] font-medium text-[rgba(27,38,52,0.65)] md:text-[1rem] lg:text-[1.25rem]">
              1~8, 10~11강 수강 완료 스크린샷을 zip 파일로 업로드 해주세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartSelectionSection;
