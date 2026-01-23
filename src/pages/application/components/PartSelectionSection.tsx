import { useRef, useState, type ChangeEvent } from 'react';
import SectionHeader from './SectionHeader';
import InfoDropdown from './applicant/InfoDropdown';
import { PART_OPTIONS, PROGRAMMERS_INFO, PART_ERRORS, PART_SELECTION_INFO } from '../constants/index';
import type { PartType } from '../types/index';

import ClipIcon from '../assets/clip-icon.svg';
import DeleteIcon from '../assets/delete-icon.svg';

interface PartSelectionSectionProps {
  selectedPart: PartType | null;
  onPartChange: (part: PartType) => void;
  programmersCompleted: boolean;
  onProgrammersChange: (completed: boolean) => void;
  isSubmitted: boolean;
}

const PartSelectionSection = ({
  selectedPart,
  onPartChange,
  programmersCompleted,
  onProgrammersChange,
  isSubmitted,
}: PartSelectionSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string }>({ name: '', size: '' });

  // 유효성 검증 로직
  const partErrorMessage = isSubmitted && !selectedPart ? PART_ERRORS.select : '';

  const selectedPartLabel = PART_OPTIONS.find((opt) => opt.value === selectedPart)?.label || '';

  // 파일 업로드
  const handleUploadClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(0);
      setFileInfo({ name: file.name, size: `${sizeMB}MB` });
      onProgrammersChange(true);
    }
  };

  const handleDeleteFile = () => {
    setFileInfo({ name: '', size: '' });
    onProgrammersChange(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section className="flex w-full flex-col items-center gap-[2.1875rem] px-4 md:px-0">
      <SectionHeader title="지원 정보" />
      <div className="flex w-full flex-wrap justify-center gap-y-[3rem] md:w-[52.75rem] md:gap-x-[3.25rem] lg:w-[89.1875rem] lg:gap-x-[8.5625rem]">
        {/* 1. 지원 파트 선택 영역 */}
        <div className="w-full md:w-[24.75rem] lg:w-[40.3125rem]">
          <InfoDropdown
            label={PART_SELECTION_INFO.label}
            required
            value={selectedPartLabel}
            options={[...PART_OPTIONS]}
            onChange={(val) => onPartChange(val as PartType)}
            errorMessage={partErrorMessage}
          />
        </div>

        {/* 2. 프로그래머스 수강 인증 영역 */}
        <div className="flex w-full flex-col gap-[1rem] md:w-[24.75rem] md:gap-[1.375rem] lg:w-[40.3125rem]">
          <div className="flex w-full items-end justify-between">
            <span className="text-[1.25rem] font-semibold text-[var(--color-navyblack)] md:text-[1.5rem] lg:text-[2rem]">
              {PROGRAMMERS_INFO.title}
            </span>
            <a
              href={PROGRAMMERS_INFO.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-[0.8125rem] font-medium text-[rgba(27,38,52,0.65)] underline md:text-[1rem] lg:text-[1.25rem]">
              {PROGRAMMERS_INFO.linkText}
            </a>
          </div>

          <div className="flex w-full flex-col gap-[0.75rem]">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".zip" />

            {programmersCompleted ? (
              <div className="flex w-full items-center gap-[0.75rem] rounded-[0.9375rem] border-2 border-[#F0F5FA] bg-[#F0F5FA] p-[0.625rem_0.5625rem_0.4375rem_0.5625rem] shadow-[1px_1px_6.4px_0_rgba(27,38,52,0.10)] lg:h-[4.1875rem]">
                <img src={ClipIcon} alt="clip" className="h-[2.3125rem] w-[2.3125rem]" />

                <div className="flex flex-1 flex-col overflow-hidden leading-[140%]">
                  <span className="truncate text-[1.125rem] font-medium text-[var(--color-navyblack)] lg:text-[1.375rem]">
                    {fileInfo.name}
                  </span>
                  <span className="text-[0.875rem] font-medium text-[rgba(27,38,52,0.65)] lg:text-[1rem]">
                    {fileInfo.size}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleDeleteFile}
                  className="flex cursor-pointer items-center justify-center">
                  <img src={DeleteIcon} alt="delete" className="aspect-square h-[1.0625rem] w-[1.0625rem]" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleUploadClick}
                className="group flex h-[2.5rem] w-full cursor-pointer items-center justify-center rounded-[1rem] border-2 border-[var(--color-blue)] bg-[var(--color-white)] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)] transition-all hover:bg-[var(--color-blue)] md:h-[3.625rem] lg:h-[4.1875rem]">
                <span className="truncate text-[1rem] font-bold text-[var(--color-blue)] group-hover:text-white md:text-[1.25rem] lg:text-[1.75rem]">
                  {PROGRAMMERS_INFO.uploadDefault}
                </span>
              </button>
            )}

            <p className="text-[0.8125rem] font-medium text-[rgba(27,38,52,0.65)] md:text-[1rem] lg:text-[1.25rem]">
              {PROGRAMMERS_INFO.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartSelectionSection;
