interface PeopleCardProps {
  icon: string;
  keyword: string;
  description: string;
}

const PeopleCard = ({ icon, keyword, description }: PeopleCardProps) => {
  return (
    <div className="flex w-[41rem] flex-col items-start gap-[3rem] rounded-[1.25rem] px-[4.75rem] py-[5.88rem] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)]">
      <img src={icon} alt={keyword} className="w-[5rem]" />
      <div className="text-navyblack text-[2rem] font-[600] md:text-[1.5rem] lg:text-[2.625rem] lg:font-[600]">
        {keyword}
      </div>
      <div className="text-navyblack/70 text-[1.5rem] font-[600] whitespace-pre-line">{description}</div>
    </div>
  );
};

export default PeopleCard;
