import { IoMdArrowForward } from 'react-icons/io';

interface NextArrowBtnProps {
  onArrowBtnClick: () => void;
}

const ArrowButton = ({ onArrowBtnClick }: NextArrowBtnProps) => {
  return (
    <button
      type="button"
      aria-label="next people card"
      className="border-gray text-gray cursor-pointer rounded-full border bg-white p-[1.5rem] text-[2.625rem] font-semibold shadow-lg transition"
      onClick={onArrowBtnClick}>
      <IoMdArrowForward />
    </button>
  );
};

export default ArrowButton;
