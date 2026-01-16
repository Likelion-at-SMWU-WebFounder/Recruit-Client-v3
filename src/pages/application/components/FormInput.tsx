interface FormInputProps {
  label: string;
  required?: boolean;
  type?: 'text' | 'email' | 'tel' | 'password';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const FormInput = ({
  label,
  required = false,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  className = '',
}: FormInputProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-[0.875rem] font-medium text-[#1B2634] md:text-[1rem]">
        {label}
        {required && <span className="text-[#4284FF]"> *</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="rounded-[0.5rem] border border-[#E0E0E0] bg-[#F7FAFF] px-4 py-3 text-[0.875rem] text-[#1B2634] placeholder:text-[#899099] focus:border-[#4284FF] focus:outline-none disabled:bg-[#F0F0F0] md:text-[1rem]"
      />
    </div>
  );
};

export default FormInput;
