interface ValueCardProps {
  keyword: string;
  description: string;
  cardImage: string;
  highlightedWord: string;
}

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

  // 카드 패딩 스타일 설정
  const paddingClasses = 'px-[1.75rem] py-[2.38rem] lg:px-[3.12rem] lg:py-[4.37rem]';
  // 카드 이미지 크기 스타일 설정
  const imageSizeClasses = 'w-[18rem] h-[20.25rem] aspect-[8/9] lg:w-[32.3125rem] lg:h-[36.375rem] lg:aspect-[517/582]';
  // 카드 키워드 크기 스타일 설정
  const keywordSizeClasses = 'text-[1.5rem] font-[700] lg:font-[600] md:text-[1.5rem] lg:text-[2.625rem]';
  // 카드 설명 크기 스타일 설정
  const descriptionSizeClasses = 'text-[1rem] font-[700] lg:font-[600] md:text-[1rem] lg:text-[2rem]';
  // 카드 이미지 그림자 스타일 설정
  const imageShadowClasses = '0px 0px 22.7px 0px rgba(27,38,52,0.13)';

  return (
    <div
      className={`${imageSizeClasses} rounded-xl bg-cover bg-center bg-no-repeat ${paddingClasses}`}
      style={{ backgroundImage: `url(${cardImage})`, boxShadow: imageShadowClasses }}>
      <div className={`${keywordSizeClasses} text-navyblack`}>{renderTitle()}</div>
      <div className={`${descriptionSizeClasses} text-navyblack`}>{description}</div>
    </div>
  );
};

export default ValueCard;
