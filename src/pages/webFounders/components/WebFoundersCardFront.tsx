import WebFoundersCardOverlay from '@pages/webFounders/components/WebFoundersCardOverlay';

import { BiPlus } from 'react-icons/bi';

interface WebFoundersCardProps {
  name: string;
  no: string;
  part: string;
  image: string;
  onFlip: () => void;
}

const WebFoundersCardFront = ({ name, no, part, image, onFlip }: WebFoundersCardProps) => {
  return (
    <div
      className="absolute inset-0 flex h-full [transform:rotateY(0deg)] flex-col justify-end rounded-[0.75rem] bg-cover bg-center text-white [-webkit-backface-visibility:hidden] [backface-visibility:hidden] md:rounded-[1.38613rem] lg:rounded-[1.5625rem]"
      style={{ backgroundImage: `url(${image})` }}>
      <div className="relative flex h-[6.125rem] items-end justify-between px-[0.88rem] py-[0.46rem] md:h-[10.2rem] md:px-[1.62rem] md:py-[1.05rem] lg:h-[11.5rem] lg:px-[2rem] lg:py-[1.62rem]">
        {/* 오버레이 */}
        <WebFoundersCardOverlay />

        {/* 이름, 기수, 파트 + flip card 버튼 */}
        <div className="relative flex w-full items-center justify-between">
          <div className="space-y-[0.28rem]">
            <div className="text-[1.125rem] leading-[140%] font-bold md:text-[1.75rem]">{name}</div>
            <div className="text-[0.75rem] leading-[140%] font-medium md:text-[1.25rem]">
              {no} · {part}
            </div>
          </div>

          <button
            onClick={onFlip}
            className="hover:bg-navyblack text-navyblack flex cursor-pointer items-center justify-center rounded-[0.625rem] bg-white p-[0.375rem] transition duration-300 ease-in-out hover:text-white md:rounded-[1.1rem] md:p-[0.5rem] lg:rounded-[1.25rem] lg:p-[0.625rem]">
            <BiPlus className="size-6 md:size-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebFoundersCardFront;
