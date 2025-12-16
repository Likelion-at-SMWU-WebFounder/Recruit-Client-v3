import { TITLE } from '@pages/about/constants/about';

const OrbitTextBox = () => {
  return (
    <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 space-y-[1rem]">
      <div className="text-navyblack text-center text-[1.75rem] leading-[150%] font-[700] tracking-[-0.088rem] md:text-[4rem]">
        {TITLE.TITLE_2}
      </div>
      <p className="text-navyblack/70 text-center text-[1.125rem] leading-[170%] font-[500] whitespace-pre-line md:text-[2rem]">
        {TITLE.DESCRIPTION_2}
      </p>
    </div>
  );
};

export default OrbitTextBox;
