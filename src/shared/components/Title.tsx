import { WiSnowflakeCold } from 'react-icons/wi';

interface TitleProps {
  isIcon?: boolean;
  title: string;
  description: string;
}

const Title = ({ isIcon, title, description }: TitleProps) => {
  return (
    <div className="space-y-[0.56rem]">
      <div className="flex items-center gap-[0.56rem]">
        {isIcon && <WiSnowflakeCold className="text-blue" />}
        <div className="text-navyblack font-[GMarketSans] text-[1.5rem] leading-[170%] font-bold md:text-[2rem] lg:text-[2.625rem]">
          {title}
        </div>
      </div>
      <div className="text-gray text-[1rem] font-semibold md:text-[1.5rem] lg:text-[1.75rem]">{description}</div>
    </div>
  );
};

export default Title;
