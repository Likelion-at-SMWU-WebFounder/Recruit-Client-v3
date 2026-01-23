interface CheckMarkProps {
  className?: string;
  style?: React.CSSProperties;
}

const CheckMark = ({ className = 'h-auto w-[60%]', style }: CheckMarkProps) => (
  <svg
    width="24"
    height="11"
    viewBox="0 0 24 11"
    fill="none"
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 1.5L11.5 9.5L22 1.5" stroke="#1B2634" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default CheckMark;
