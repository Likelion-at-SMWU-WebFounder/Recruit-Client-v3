interface SubTitleProps {
  mode?: 'light' | 'dark';
  subTitle: string;
  subDescription: string;
  align?: 'center' | 'left';
}

const SubTitle = ({ mode = 'light', subTitle, subDescription, align = 'center', ...props }: SubTitleProps) => {
  // 기본 스타일 설정
  const baseClass = 'flex flex-col font-[600] gap-[0.3125rem] md:gap-[1rem]';

  // 정렬 스타일 설정: 가운데 정렬(center), 왼쪽 정렬(left)
  const alignClass = {
    center: 'items-center',
    left: 'items-start justify-start flex-shrink-0',
  };

  // 서브 타이틀 스타일 설정: 라이트 모드(light), 다크 모드(dark)
  const subTitleClass = {
    light: 'text-navyblack/50 hd14-semibold md:hd16-semibold lg:hd20-semibold',
    dark: 'text-white/50 hd14-semibold md:hd16-semibold lg:hd20-semibold',
  };

  // 서브 디스크립션 스타일 설정: 라이트 모드(light), 다크 모드(dark)
  const subDescriptionClass = {
    light: 'hd24-semibold md:hd32-semibold lg:hd42-semibold text-navyblack',
    dark: 'hd24-semibold md:hd32-semibold lg:hd42-semibold text-white',
  };

  return (
    <div className={`${baseClass} ${alignClass[align]}`} {...props}>
      <div className={`${subTitleClass[mode]} uppercase`}>{subTitle}</div>
      <div className={`${subDescriptionClass[mode]} whitespace-pre-line`}>{subDescription}</div>
    </div>
  );
};

export default SubTitle;
