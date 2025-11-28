interface ValueCardProps {
  keyword: string;
  description: string;
  cardImage: string;
  highlightedWord: string;
}

// value card 스타일 상수화
const PADDING_CLASSES = 'px-[1.75rem] py-[2.38rem] lg:px-[3.12rem] lg:py-[4.37rem]';
const IMAGE_SIZE_CLASSES = 'w-[18rem] h-[20.25rem] aspect-[8/9] lg:w-[32.3125rem] lg:h-[36.375rem] lg:aspect-[517/582]';
const KEYWORD_TEXT_CLASSES = 'text-[1.5rem] font-[700] lg:font-[600] md:text-[1.5rem] lg:text-[2.625rem]';
const DESCRIPTION_TEXT_CLASSES = 'text-[1rem] font-[700] lg:font-[600] md:text-[1rem] lg:text-[2rem]';
const IMAGE_SHADOW_CLASSES = '0px 0px 22.7px 0px rgba(27,38,52,0.13)';

const ValueCard = ({ keyword, description, cardImage, highlightedWord }: ValueCardProps) => {
  // 하이라이트 되어 있는 단어를 추출하여 하이라이트 처리
  const renderTitle = () => {
    if (!highlightedWord) {
      return <span>{keyword}</span>;
    }
    const parts = keyword.split(new RegExp(`(${highlightedWord})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => (
          <span key={index}>
            {part.toLowerCase() === highlightedWord.toLowerCase() ? (
              <span className="text-blue">{part}</span>
            ) : (
              <span>{part}</span>
            )}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div
      className={`${IMAGE_SIZE_CLASSES} rounded-xl bg-cover bg-center bg-no-repeat ${PADDING_CLASSES}`}
      style={{ backgroundImage: `url(${cardImage})`, boxShadow: IMAGE_SHADOW_CLASSES }}>
      <div className={`${KEYWORD_TEXT_CLASSES} text-navyblack`}>{renderTitle()}</div>
      <div className={`${DESCRIPTION_TEXT_CLASSES} text-navyblack`}>{description}</div>
    </div>
  );
};

export default ValueCard;
