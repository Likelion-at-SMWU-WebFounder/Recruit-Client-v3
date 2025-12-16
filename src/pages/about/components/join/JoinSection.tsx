import SubTitle from '@shared/components/SubTitle';
import DefaultButton from '@shared/components/button/DefaultButton';
import { SUB_TITLE } from '@pages/about/constants/about';
import joinImage from '@pages/about/assets/join/join-image.png';
import { ROUTER_URL } from '@shared/constants/url';
import { useNavigate } from 'react-router-dom';

const JoinSection = () => {
  const navigate = useNavigate();
  const handleJoinClick = () => {
    navigate(ROUTER_URL.APPLY);
  };

  return (
    <div className="w-full max-w-[100vw] space-y-[4.25rem] px-[1rem] pt-[4.875rem] pb-[6.25rem] md:space-y-[5.56rem] md:px-[4rem] md:pt-[5.875rem] md:pb-[7rem] lg:space-y-[5rem] lg:px-[13.9375rem] lg:py-[4.25rem]">
      <SubTitle subTitle={SUB_TITLE.SUB_TITLE_4} subDescription={SUB_TITLE.SUB_DESCRIPTION_4} />

      {/* 이미지 + desktop 호버 오버레이: tablet, mobile에서는 이미지만 노출 */}
      <div className="group relative w-full max-w-[100vw] rounded-[1.25rem]">
        <img src={joinImage} alt="join image" className="h-auto w-full rounded-[1.25rem]" />

        {/* 호버 오버레이 + 가운데 버튼: desktop에서만 노출 */}
        <div className="pointer-events-none absolute inset-0 hidden rounded-[1.25rem] bg-black/0 transition-colors duration-300 group-hover:bg-black/70 lg:block" />

        <div className="absolute inset-0 hidden items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:flex">
          <DefaultButton onClick={handleJoinClick}>지원하러 가기</DefaultButton>
        </div>
      </div>

      {/* tablet, mobile 버튼 */}
      <div className="mt-[3.75rem] flex justify-center lg:hidden">
        <DefaultButton onClick={handleJoinClick}>지원하러 가기</DefaultButton>
      </div>
    </div>
  );
};

export default JoinSection;
