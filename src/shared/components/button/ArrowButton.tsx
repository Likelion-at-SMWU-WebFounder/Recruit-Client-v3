import { IoMdArrowForward } from 'react-icons/io';

interface NextArrowBtnProps {
  iconColor: 'gray' | 'navyblack';
  onArrowBtnClick: () => void;
}

const ICON_COLOR_CLASS = {
  gray: 'border border-gray text-gray',
  navyblack: 'text-navyblack',
};

const ArrowButton = ({ iconColor, onArrowBtnClick }: NextArrowBtnProps) => {
  return (
    <button
      type="button"
      aria-label="next card"
      className={`cursor-pointer rounded-full bg-white p-[1.5rem] text-[2.625rem] font-semibold shadow-lg transition ${ICON_COLOR_CLASS[iconColor]}`}
      onClick={onArrowBtnClick}>
      <IoMdArrowForward />
    </button>
  );
};

export default ArrowButton;
