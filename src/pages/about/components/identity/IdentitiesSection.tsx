import SubTitle from '@shared/components/SubTitle';
import { SUB_TITLE } from '@pages/about/constants/about';
import { IDENTITIES_DATA } from '@pages/about/constants/identities';
import IdentityCard from '@pages/about/components/identity/IdentityCard';
import { useState } from 'react';

const IdentitiesSection = () => {
  const [openId, setOpenId] = useState<number | null>(IDENTITIES_DATA[0]?.id ?? null);
  return (
    <>
      {/* 태블릿/데스크톱: 카드 */}
      <section className="hidden w-full max-w-[100vw] md:flex md:justify-between md:px-[6.25rem] md:py-[11.88rem] lg:px-[18.44rem] lg:py-[4rem]">
        <SubTitle subTitle={SUB_TITLE.SUB_TITLE_2} subDescription={SUB_TITLE.SUB_DESCRIPTION_2} align="left" />
        <div className="md:flex md:flex-col md:gap-[1.25rem] lg:gap-[1.5rem]">
          {IDENTITIES_DATA.map((identity) => (
            <IdentityCard
              key={identity.id}
              identity={identity.identity}
              description1={identity.description1}
              description2={identity.description2}
              isOpen={openId === identity.id}
              onClick={() => setOpenId(identity.id)}
            />
          ))}
        </div>
      </section>

      {/* 모바일: 카드 */}
      <section className="flex w-full max-w-[100vw] flex-col items-center justify-center gap-[3.38rem] py-[3.12rem] md:hidden">
        <SubTitle subTitle={SUB_TITLE.SUB_TITLE_2} subDescription={SUB_TITLE.SUB_DESCRIPTION_2} />
        <div className="flex flex-col gap-[1rem]">
          {IDENTITIES_DATA.map((identity) => (
            <IdentityCard
              key={identity.id}
              identity={identity.identity}
              description1={identity.description1}
              description2={identity.description2}
              isOpen={openId === identity.id}
              onClick={() => setOpenId(identity.id)}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default IdentitiesSection;
