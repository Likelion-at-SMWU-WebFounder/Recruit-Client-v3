import { type ReactNode } from 'react';
import { BiPlus } from 'react-icons/bi';
import { AiFillInstagram, AiFillGithub } from 'react-icons/ai';
import { IoMail } from 'react-icons/io5';

interface Props {
  name: string;
  no: string;
  part: string;
  image: string;
  responsibilities?: string;
  onFlipBack: () => void;
}

const WebFoundersCardBack = ({ name, no, part, image, responsibilities, onFlipBack }: Props) => {
  const ICONS = [
    <AiFillInstagram className="size-4 md:size-6" key="insta" />,
    <IoMail className="size-4 md:size-6" key="mail" />,
    <AiFillGithub className="size-4 md:size-6" key="github" />,
  ];

  return (
    <div className="bg-navyblack items-between absolute inset-0 flex h-full [transform:rotateY(180deg)] flex-col justify-between overflow-hidden rounded-[0.75rem] p-[0.89rem] text-white [-webkit-backface-visibility:hidden] [backface-visibility:hidden] md:rounded-[1.4rem] md:p-[1.5rem] lg:rounded-[1.56rem] lg:p-[1.94rem]">
      <header>
        {/* 프로필 이미지 */}
        <img
          src={image}
          className="lazyload-image h-[3.15rem] w-[3.15rem] rounded-full object-cover md:h-[4.7rem] md:w-[4.7rem] lg:h-[6.25rem] lg:w-[6.25rem]"
          alt={`${name} profile`}
        />

        {/* 이름, 기수, 파트 */}
        <div className="mt-[0.51rem] mb-[0.93rem] flex flex-col md:mt-[0.94rem] md:mb-[1.25rem] lg:mt-[1.56rem] lg:mb-[1.41rem]">
          <span className="text-[1.125rem] leading-[140%] font-bold md:text-[1.75rem]">{name}</span>
          <span className="text-[0.75rem] leading-[140%] font-medium md:text-[1.25rem]">
            {no} · {part}
          </span>
        </div>

        {/* 담당 파트 설명 */}
        <div className="text-[0.75rem] leading-[140%] font-medium whitespace-pre-line text-white/70 md:text-[1rem] lg:text-[1.25rem]">
          {responsibilities ?? '담당 파트 설명'}
        </div>
      </header>

      <footer className="flex items-end justify-between">
        {/* 아이콘 버튼 영역 */}
        <div className="flex gap-[0.5rem] md:gap-[0.81rem]">
          {ICONS.map((icon, idx) => (
            <IconButton key={idx} onClick={() => {}}>
              {icon}
            </IconButton>
          ))}
        </div>

        {/* 되돌아가기 버튼 */}
        <button
          onClick={onFlipBack}
          className="hover:text-navyblack bg-navyblack flex aspect-square h-[1.875rem] w-[1.875rem] cursor-pointer items-center justify-center rounded-[0.625rem] border border-white text-white transition duration-300 ease-in-out hover:bg-white md:h-[3.125rem] md:w-[3.125rem] md:rounded-[1.1rem] lg:rounded-[1.25rem]">
          <BiPlus className="size-5 rotate-45 md:size-8" />
        </button>
      </footer>
    </div>
  );
};

export default WebFoundersCardBack;

const IconButton = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => (
  <button
    className="hover:text-navyblack flex h-[1.5rem] w-[1.5rem] cursor-pointer items-center justify-center rounded-lg border border-white transition duration-300 ease-in-out hover:bg-white md:h-[2.5rem] md:w-[2.5rem] md:rounded-2xl"
    onClick={onClick}>
    {children}
  </button>
);
