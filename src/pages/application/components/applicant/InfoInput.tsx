interface InfoInputProps {
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  subText?: string;
  onChange: (value: string) => void;
}

const InfoInput = ({ label, required, placeholder, value, subText, onChange }: InfoInputProps) => (
  <div className="flex w-full shrink-0 flex-col items-start gap-[1.375rem] md:w-[24.75rem] lg:w-[40.3125rem]">
    {/* 라벨 영역 */}
    <div className="flex items-end gap-[0.5rem] self-stretch md:gap-[0.8125rem]">
      <span className="text-[1.25rem] font-semibold text-[#1B2634] md:text-[1.5rem] lg:text-[2rem]">{label}</span>
      {required && <span className="text-[1rem] font-bold text-[#4284FF] md:text-[1.25rem] lg:text-[1.5rem]">*</span>}
    </div>
    <div className="flex w-full flex-col items-start gap-[0.75rem]">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="/* 기기별 높이 및 패딩 */ flex h-[2.5rem] w-full items-center justify-center rounded-[1rem] border-2 border-[rgba(27,38,52,0.65)] bg-[#F7FAFF] pt-[0.6875rem] pr-[1.0625rem] pb-[0.625rem] pl-[0.875rem] text-[1rem] font-medium text-[#1B2634] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)] outline-none placeholder:text-[rgba(27,38,52,0.45)] md:h-[3.625rem] md:pt-[1rem] md:pr-[1.51225rem] md:pb-[1rem] md:pl-[1.5rem] md:text-[1.25rem] lg:h-[4.1875rem] lg:px-[1.375rem] lg:py-[1.0625rem] lg:text-[1.75rem]"
      />
      {subText && (
        <p className="text-[0.8125rem] font-medium break-keep text-[rgba(27,38,52,0.65)] md:text-[1rem] lg:text-[1.25rem]">
          {subText}
        </p>
      )}
    </div>
  </div>
);

export default InfoInput;
