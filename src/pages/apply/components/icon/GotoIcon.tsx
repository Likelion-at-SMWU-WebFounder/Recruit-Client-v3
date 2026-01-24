interface GotoIconProps {
  className?: string;
}

const GotoIcon = ({ className }: GotoIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      fill="none"
      className={`h-[0.875rem] w-[0.75rem] shrink-0 ${className}`}>
      <path
        d="M10.8994 1.00004L0.999955 10.8995L10.8994 1.00004ZM2.41417 1.00004L10.8994 1.00004L2.41417 1.00004ZM10.8994 9.48532L10.8994 1.00004L10.8994 9.48532Z"
        fill="#4284FF"
      />
      <path
        d="M10.8994 1.00004L0.999955 10.8995M10.8994 1.00004L2.41417 1.00004M10.8994 1.00004L10.8994 9.48532"
        stroke="#4284FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GotoIcon;
