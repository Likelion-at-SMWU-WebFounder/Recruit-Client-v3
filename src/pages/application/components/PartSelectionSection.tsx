import { useRef, useState, type ChangeEvent } from 'react';
import SectionHeader from './SectionHeader';
import InfoDropdown from './applicant/InfoDropdown';
import { PART_OPTIONS, PROGRAMMERS_INFO, PART_ERRORS, PART_SELECTION_INFO } from '../constants/index';
import type { PartType } from '../types/index';

import ClipIcon from '../assets/clip-icon.svg';
import DeleteIcon from '../assets/delete-icon.svg';

// 스타일 토큰 정의
const STYLES = {
  section: 'flex w-full flex-col items-center gap-[1.5rem] md:gap-[2.0625rem] lg:gap-[2.1875rem]',
  gridContainer:
    'flex flex-wrap justify-center w-full px-[1rem] md:px-[0rem] md:w-[52.75rem] lg:w-[90.0625rem] gap-x-[1rem] gap-y-[2.1875rem] md:gap-x-[3.25rem] md:gap-y-[4rem] lg:gap-x-[8.5625rem] lg:gap-y-[5rem]',
  itemWrapper: 'w-full md:w-[24.75rem] lg:w-[40.3125rem]',

  // 헤더 및 라벨 영역
  labelWrapper: 'flex w-full items-end justify-between min-h-[1.35rem] md:min-h-[2.1rem] lg:min-h-[2.6rem]',
  titleText:
    'text-[1.125rem] font-semibold text-[var(--color-navyblack-main)] md:text-[1.625rem] lg:text-[2rem] leading-[120%]',
  linkText:
    'cursor-pointer text-[0.8125rem] font-medium break-keep text-[rgba(27,38,52,0.65)] underline md:text-[1rem] lg:text-[1.25rem] leading-[120%]',

  // 파일 업로드 영역
  uploadContainer:
    'group relative flex flex-col gap-[0.875rem] w-[19.375rem] md:w-[24.75rem] md:gap-[1.125rem] lg:w-[40.3125rem] lg:gap-[0.9375rem]',
  uploadArea: 'flex w-full flex-col gap-[0.5rem] md:gap-[0.75rem]',
  description:
    'text-[0.8125rem] font-medium tracking-[-0.0325rem] break-keep text-[rgba(27,38,52,0.65)] md:text-[1rem] md:tracking-[-0.02rem] lg:text-[1.25rem] lg:tracking-normal leading-[120%]',

  // 파일 업로드 완료 상태
  fileBadge:
    'flex h-[2.5rem] w-full items-center gap-[0.25rem] md:gap-[0.75rem] md:rounded-[1rem] rounded-[0.625rem] border-2 border-[#F0F5FA] bg-[#F0F5FA] px-[0.72rem] py-[0.38rem] md:px-[0.69rem] md:py-[0.69rem] lg:px-[0.625rem] lg:y-[0.5625rem] shadow-[1px_1px_6.4px_0_rgba(27,38,52,0.10)] md:h-[3.625rem] lg:h-[4.1875rem]',
  clipIcon: 'h-[1.375rem] w-[1.375rem] md:h-[1.875rem] md:w-[1.875rem] lg:h-[2.3125rem] lg:w-[2.3125rem]',
  fileName:
    'truncate text-[0.8125rem] font-medium text-[var(--color-navyblack-main)] md:text-[1rem] lg:text-[1.375rem] leading-[120%] md:leading-[140%]',
  fileSize:
    'text-[0.625rem] font-medium text-[rgba(27,38,52,0.65)] md:text-[0.75rem] lg:text-[1rem] leading-[120%] md:leading-[140%]',
  deleteBtn: 'flex shrink-0 cursor-pointer items-center justify-center',
  deleteIcon:
    'aspect-square h-[0.6875rem] w-[0.6875rem] md:h-[0.875rem] md:w-[0.875rem] lg:h-[1.0625rem] lg:w-[1.0625rem]',

  // 파일 업로드 대기 상태
  uploadBtn:
    'group flex h-[2.5rem] w-full cursor-pointer items-center justify-center md:rounded-[1rem] rounded-[0.625rem] border-2 border-[var(--color-blue-main)] bg-[var(--color-white-main)] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)] transition-all hover:bg-[var(--color-blue-main)] md:h-[3.625rem] lg:h-[4.1875rem] px-[1.375rem] py-[1rem]',
  uploadBtnText:
    'truncate text-[1.125rem] font-bold text-[var(--color-blue-main)] group-hover:text-white md:text-[1.5rem] lg:text-[1.75rem] leading-[120%]',
};

// 2. 파일 사이즈 개선 유틸리티
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0B';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return i >= 2
    ? `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))}${sizes[i]}`
    : `${Math.round(bytes / Math.pow(k, i))}${sizes[i]}`;
};

interface PartSelectionSectionProps {
  selectedPart: PartType | null;
  onPartChange: (part: PartType) => void;
  programmersCompleted: boolean;
  onProgrammersChange: (completed: boolean) => void;
  onFileChange: (file?: File) => void;
  isSubmitted: boolean;
}

const PartSelectionSection = ({
  selectedPart,
  onPartChange,
  programmersCompleted,
  onProgrammersChange,
  onFileChange,
  isSubmitted,
}: PartSelectionSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string }>({ name: '', size: '' });

  const partErrorMessage = isSubmitted && !selectedPart ? PART_ERRORS.select : '';
  const selectedPartLabel = PART_OPTIONS.find((opt) => opt.value === selectedPart)?.label || '';

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileInfo({
        name: file.name,
        size: formatFileSize(file.size),
      });
      onProgrammersChange(true);
      onFileChange(file);
    }
  };

  const handleDeleteFile = () => {
    setFileInfo({ name: '', size: '' });
    onProgrammersChange(false);
    onFileChange(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section className={STYLES.section}>
      <SectionHeader title="지원 정보" />

      <div className={STYLES.gridContainer}>
        {/* 1. 지원 파트 선택 영역 */}
        <div className={STYLES.itemWrapper}>
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
        <div className={`${STYLES.itemWrapper} ${STYLES.uploadContainer}`}>
          <div className={STYLES.labelWrapper}>
            <span className={STYLES.titleText}>{PROGRAMMERS_INFO.title}</span>
            <a href={PROGRAMMERS_INFO.linkUrl} target="_blank" rel="noopener noreferrer" className={STYLES.linkText}>
              {PROGRAMMERS_INFO.linkText}
            </a>
          </div>

          <div className={STYLES.uploadArea}>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".zip" />

            {programmersCompleted ? (
              <div className={STYLES.fileBadge}>
                <img src={ClipIcon} alt="clip" className={STYLES.clipIcon} />
                <div className="flex flex-1 flex-col overflow-hidden leading-[140%]">
                  <span className={STYLES.fileName}>{fileInfo.name}</span>
                  <span className={STYLES.fileSize}>{fileInfo.size}</span>
                </div>
                <button type="button" onClick={handleDeleteFile} className={STYLES.deleteBtn}>
                  <img src={DeleteIcon} alt="delete" className={STYLES.deleteIcon} />
                </button>
              </div>
            ) : (
              <button type="button" onClick={handleUploadClick} className={STYLES.uploadBtn}>
                <span className={STYLES.uploadBtnText}>{PROGRAMMERS_INFO.uploadDefault}</span>
              </button>
            )}

            <p className={STYLES.description}>{PROGRAMMERS_INFO.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartSelectionSection;
