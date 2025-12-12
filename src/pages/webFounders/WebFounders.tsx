import WebFoundersSection from '@pages/webFounders/components/WebFoundersSection';
import {
  WEBFOUNDERS_TITLE,
  WEBFOUNDERS_SUBTITLE,
  WEBFOUNDERS_PLAN_DESIGN,
  WEBFOUNDERS_FRONTEND,
  WEBFOUNDERS_BACKEND,
} from '@pages/webFounders/constants/webfounders';
import Title from '@shared/components/Title';

const WebFounders = () => {
  return (
    <div className="space-y-[4.69rem] px-[1rem] py-[8.44rem] md:space-y-[6.44rem] lg:space-y-[11.63rem] lg:px-[10rem] lg:py-[8.13rem]">
      <div className="">
        <Title title={WEBFOUNDERS_TITLE} description={WEBFOUNDERS_SUBTITLE} />
      </div>
      <div className="space-y-[6.25rem] md:space-y-[15.62rem]">
        <WebFoundersSection title="기획·디자인" founders={WEBFOUNDERS_PLAN_DESIGN} />
        <WebFoundersSection title="프론트엔드" founders={WEBFOUNDERS_FRONTEND} />
        <WebFoundersSection title="백엔드" founders={WEBFOUNDERS_BACKEND} />
      </div>
    </div>
  );
};

export default WebFounders;
